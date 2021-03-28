const { validationResult } = require('express-validator');

const { Order, Cart, Gun, ReceiOption, PayOption } = require('../models');
const { sendOrderMessage } = require('../telegram');

class OrderController {
    async get(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    succes: false,
                    message: 'Authorization required',
                });
            }
            const orders = await Order.find({ 'contactDetails.email': req.user.email })
                .select('-contactDetails')
                .populate('delivery.receiOption delivery.payOption', '-_id')
                .sort({ date: -1 })
                .lean();
            res.status(200).json({
                orders,
            });
        } catch (e) {
            res.status(500).json({
                succes: true,
            });
        }
    }

    async create(req, res) {
        const { email, name, phone, receiOptionId, payOptionId } = req.body;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    succes: false,
                    errors: errors.array(),
                });
            }

            const receiOptionPromise = ReceiOption.findById(receiOptionId).lean();
            const payOptionPromise = PayOption.findById(payOptionId).lean();
            const [receiOption, payOption] = await Promise.all([
                receiOptionPromise,
                payOptionPromise,
            ]);
            if (!receiOption || !payOption) {
                return res.status(404).json({
                    succes: false,
                    message: 'receiOption or payOption not found',
                });
            }

            if (!req.cart.totalCount) {
                return res.status(200).json({
                    succes: false,
                    message: 'cart is empty',
                });
            }

            if (req.cart.items.some((item) => item.product.count < item.count)) {
                return res.status(200).json({
                    succes: false,
                    message: 'some items are out of stock',
                });
            }

            const order = new Order({
                items: req.cart.items,
                totalPrice: req.cart.totalPrice + receiOption.price,
                contactDetails: {
                    name,
                    email,
                    phone,
                },
                delivery: {
                    receiOption: receiOptionId,
                    payOption: payOptionId,
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
                    Gun.findByIdAndUpdate(item.product._id, { $inc: { count: -item.count } }),
                ),
                Cart.findByIdAndRemove(req.cart._id),
            ]);

            await sendOrderMessage({ ...order.toObject(), receiOption, payOption });

            if (req.session.cartId) {
                req.session.cartId = null;
                req.session.save((err) => {
                    if (err) {
                        throw err;
                    }
                });
            }

            res.status(200).json({
                succes: true,
            });
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }
}

module.exports = OrderController;
