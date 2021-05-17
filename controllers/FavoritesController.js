const { Favorites, Product } = require('../models');

const addItemToFavorites = async (favorites, itemId, product, res) => {
    try {
        if (favorites.items.length === 10) {
            return res.status(400).json({
                status: 'error',
                errorCode: 1,
                message: 'maximum 10 products',
            });
        }

        if (favorites.items.includes(itemId)) {
            return res.status(400).json({
                status: 'error',
                errorCode: 2,
                message: 'product has already been added',
            });
        }

        await favorites.addItem(itemId);
        return res.status(200).json({
            status: 'succes',
            data: product,
        });
    } catch (e) {
        throw e;
    }
};

const removeItemFromFavorites = async (favorites, itemId, res) => {
    try {
        if (!favorites.items.includes(itemId)) {
            return res.status(200).json({
                status: 'succes',
            });
        }

        await favorites.removeItem(itemId);
        return res.status(200).json({
            status: 'succes',
        });
    } catch (e) {
        throw e;
    }
};

class FavoritesController {
    async get(req, res) {
        const { favorites } = req;
        try {
            res.status(200).json({
                status: 'succes',
                items: favorites.items,
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
        const { product } = req;
        try {
            if (!req.session.userId) {
                if (!req.session.favoritesId) {
                    const favorites = new Favorites({
                        items: [id],
                    });
                    await favorites.save();
                    req.session.favoritesId = favorites._id;
                    req.session.save((err) => {
                        if (err) {
                            throw err;
                        }
                        res.status(200).json({
                            status: 'succes',
                            data: product,
                        });
                    });
                } else {
                    const favorites = await Favorites.findById(req.session.favoritesId);
                    await addItemToFavorites(favorites, id, product, res);
                }
            } else {
                const candidate = await Favorites.findOne({ userId: req.session.userId });
                if (!candidate) {
                    const favorites = new Favorites({
                        userId: req.session.userId,
                        items: [id],
                    });
                    await favorites.save();
                    return res.status(200).json({
                        status: 'succes',
                        data: product,
                    });
                }
                await addItemToFavorites(candidate, id, product, res);
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
            const candidate = await Product.findById(id);
            if (!candidate) {
                return res.status(404).json({
                    succes: false,
                    message: 'PRODUCT NOT FOUND',
                });
            }

            if (!req.session.userId) {
                if (!req.session.favoritesId) {
                    res.status(200).json({
                        succes: true,
                    });
                } else {
                    const favorites = await Favorites.findById(req.session.favoritesId);
                    await removeItemFromFavorites(favorites, id, res);
                }
            } else {
                const candidate = await Favorites.findOne({ userId: req.session.userId });
                if (!candidate) {
                    return res.status(200).json({
                        succes: true,
                    });
                }
                await removeItemFromFavorites(candidate, id, res);
            }
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }

    async clear(req, res) {
        try {
            if (!req.session.userId) {
                if (!req.session.favoritesId) {
                    res.status(200).json({
                        succes: true,
                    });
                } else {
                    const favorites = await Favorites.findById(req.session.favoritesId);
                    await favorites.clearItems();
                    res.status(200).json({
                        succes: true,
                    });
                }
            } else {
                const candidate = await Favorites.findOne({ userId: req.session.userId });
                if (!candidate) {
                    return res.status(200).json({
                        succes: true,
                    });
                }
                await candidate.clearItems();
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

module.exports = FavoritesController;
