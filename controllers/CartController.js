const { Cart, Gun } = require('../models');

class CartController {
    async get(req, res) {
        try {
            res.status(200).json({
                ...req.cart,
            });
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }

    async add(req, res) {
        const { id } = req.params;
        const count = Math.abs(+req.query.count) || 1;
        try {
            const candidate = await Gun.findById(id);
            if (!candidate) {
                return res.status(404).json({
                    succes: false,
                    message: 'PRODUCT NOT FOUND',
                });
            }

            if (candidate.count < count) {
                return res.status(200).json({
                    succes: false,
                    message: 'exceeded the number',
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
                            succes: true,
                        });
                    });
                } else {
                    const cart = await Cart.findById(req.session.cartId);
                    await cart.addItem(id, count);
                    res.status(200).json({
                        succes: true,
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
                        succes: true,
                    });
                }
                await candidate.addItem(id, count);
                res.status(200).json({
                    succes: true,
                });
            }
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }

    async remove(req, res) {
        const { id } = req.params;
        try {
            const candidate = await Gun.findById(id);
            if (!candidate) {
                return res.status(404).json({
                    succes: false,
                    message: 'PRODUCT NOT FOUND',
                });
            }

            if (!req.session.userId) {
                if (!req.session.cartId) {
                    res.status(200).json({
                        succes: true,
                    });
                } else {
                    const candidate = await Cart.findOne({
                        _id: req.session.cartId,
                        'items.product': id,
                    });
                    console.log(candidate);
                    await candidate.removeItem(id);
                    res.status(200).json({
                        succes: true,
                    });
                }
            } else {
                const candidate = await Cart.findOne({
                    userId: req.session.userId,
                    'items.product': id,
                });
                if (!candidate) {
                    return res.status(200).json({
                        succes: true,
                    });
                }
                await candidate.removeItem(id);
                res.status(200).json({
                    succes: true,
                });
            }
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }
}

module.exports = CartController;
