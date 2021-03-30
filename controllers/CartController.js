const { validationResult } = require('express-validator');

const { Cart, Product } = require('../models');

class CartController {
    async get(req, res) {
        try {
            res.status(200).json({
                status: 'succes',
                items: req.cart.items,
                totalCount: req.cart.totalCount,
                totalPrice: req.cart.totalPrice,
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async add(req, res) {
        const { id } = req.params;
        const { count } = req.query;
        console.log(count);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'error',
                    errors: errors.array(),
                });
            }

            if (!req.session.userId) {
                if (!req.session.cartId) {
                    const cart = new Cart({
                        items: [
                            {
                                product: id,
                                count,
                            },
                        ],
                        totalCount: count,
                    });
                    await cart.save();
                    req.session.cartId = cart._id;
                    req.session.save((err) => {
                        if (err) {
                            throw err;
                        }
                        res.status(200).json({
                            status: 'succes',
                        });
                    });
                } else {
                    const cart = await Cart.findById(req.session.cartId);
                    await cart.addItem(id, count);
                    res.status(200).json({
                        status: 'succes',
                    });
                }
            } else {
                const candidate = await Cart.findOne({ userId: req.session.userId });
                if (!candidate) {
                    const cart = new Cart({
                        userId: req.session.userId,
                        items: [
                            {
                                product: id,
                                count,
                            },
                        ],
                        totalCount: count,
                    });
                    await cart.save();
                    return res.status(200).json({
                        status: 'succes',
                    });
                }
                await candidate.addItem(id, count);
                res.status(200).json({
                    status: 'succes',
                });
            }
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async remove(req, res) {
        const { id } = req.params;
        try {
            if (!req.session.userId) {
                if (!req.session.cartId) {
                    res.status(200).json({
                        status: 'succes',
                    });
                } else {
                    const candidate = await Cart.findOne({
                        _id: req.session.cartId,
                        'items.product': id,
                    });
                    await candidate.removeItem(id);
                    res.status(200).json({
                        status: 'succes',
                    });
                }
            } else {
                const candidate = await Cart.findOne({
                    userId: req.session.userId,
                    'items.product': id,
                });
                if (!candidate) {
                    return res.status(200).json({
                        status: 'succes',
                    });
                }
                await candidate.removeItem(id);
                res.status(200).json({
                    status: 'succes',
                });
            }
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async clear(req, res) {
        try {
            if (!req.session.userId) {
                if (!req.session.cartId) {
                    res.status(200).json({
                        status: 'succes',
                    });
                } else {
                    const cart = await Cart.findById(req.session.cartId);
                    await cart.clear();
                    res.status(200).json({
                        status: 'succes',
                    });
                }
            } else {
                const candidate = await Cart.findOne({ userId: req.session.userId });
                if (!candidate) {
                    return res.status(200).json({
                        status: 'succes',
                    });
                }
                await candidate.clear();
                res.status(200).json({
                    status: 'succes',
                });
            }
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }
}

module.exports = CartController;
