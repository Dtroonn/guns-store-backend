const { Cart } = require('../models');

const calculateFullPrice = (items) => {
    return items.reduce(
        (previousPrice, item) => previousPrice + item.count * item.product.price.current,
        0,
    );
};

module.exports = async function (req, res, next) {
    try {
        if (!req.session.cartId && !req.session.userId) {
            req.cart = {
                items: [],
                totalCount: 0,
                totalPrice: 0,
            };
            return next();
        }
        if (req.session.userId) {
            const candidate = await Cart.findOne({ userId: req.session.userId })
                .select('-items._id -userId')
                .populate('items.product')
                .lean();

            if (!candidate) {
                req.cart = {
                    items: [],
                    totalCount: 0,
                    totalPrice: 0,
                };
            } else {
                req.cart = {
                    ...candidate,
                    totalPrice: calculateFullPrice(candidate.items),
                };
            }
            return next();
        }

        const cart = await Cart.findById(req.session.cartId)
            .select('-items._id')
            .populate('items.product')
            .lean();
        req.cart = {
            ...cart,
            totalPrice: calculateFullPrice(cart.items),
        };
        next();
    } catch (e) {
        res.status(500).json({
            succes: false,
            message: e.message,
        });
    }
};
