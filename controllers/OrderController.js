const { validationResult } = require('express-validator');

const { Order, Product, ReceiOption, PayOption } = require('../models');
const { sendOrderMessage } = require('../telegram');

class OrderController {
    async get(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Authorization required',
                });
            }
            const orders = await Order.find({ 'contactDetails.email': req.user.email })
                .select('-contactDetails')
                .populate('delivery.receiOption delivery.payOption', '-_id')
                .sort({ date: -1 })
                .lean();
            res.status(200).json({
                status: 'succes',
                orders,
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async create(req, res) {
        const { email, name, tel } = req.body;
        try {
            if (!req.cart.totalCount) {
                return res.status(400).json({
                    status: 'error',
                    errorCode: 1,
                    message: 'cart is empty',
                });
            }

            let deficiencyProducts = [];
            req.cart.items.forEach((item) => {
                if (item.product.count < item.count) {
                    deficiencyProducts.push(item.product);
                }
            });
            if (deficiencyProducts.length > 0) {
                return res.status(400).json({
                    status: 'error',
                    items: deficiencyProducts,
                    errorCode: 2,
                    message: 'some items are out of stock or not enough',
                });
            }

            const order = new Order({
                items: req.cart.items,
                totalPrice: req.cart.totalPrice + req.receiOption.price,
                contactDetails: {
                    name,
                    email,
                    tel,
                },
                delivery: {
                    receiOption: req.receiOption._id,
                    payOption: req.payOption._id,
                    adress: {
                        city: req.body.city,
                        street: req.body.street,
                        entrance: req.body.entrance,
                        apartment: req.body.apartment,
                    },
                    comment: req.body.comment,
                },
            });
            await order.save();

            await Promise.all([
                ...req.cart.items.map((item) =>
                    Product.findByIdAndUpdate(item.product._id, { $inc: { count: -item.count } }),
                ),
                req.cart.clear(),
                sendOrderMessage({
                    ...order.toObject(),
                    receiOption: req.receiOption,
                    payOption: req.payOption,
                }),
            ]);

            res.status(201).json({
                status: 'succes',
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }
}

module.exports = OrderController;
