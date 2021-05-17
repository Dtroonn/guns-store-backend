const { Favorites } = require('../models');

module.exports = async function (req, res, next) {
    try {
        if (!req.session.userId && !req.session.favoritesId) {
            req.favorites = { items: [] };
            return next();
        }
        if (req.session.userId) {
            const candidate = await Favorites.findOne({ userId: req.session.userId })
                .populate('items')
                .select('items');
            if (!candidate) {
                req.favorites = { items: [] };
            } else {
                req.favorites = candidate;
            }
            return next();
        }

        const favorites = await Favorites.findById(req.session.favoritesId).populate('items');
        req.favorites = favorites;
        next();
    } catch (e) {
        res.status(500).json({
            succes: false,
            message: e.message,
        });
    }
};
