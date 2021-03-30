const { validationResult } = require('express-validator');

const { Product, Category, RootDocumentForProducts } = require('../models');
const cloudinary = require('../utils/cloudinary');

const markFavoritesProducts = (items, favoritesItems) => {
    return items.map((item) => ({
        ...item,
        isFavorite: favoritesItems.includes(item._id),
    }));
};

const getSkip = (page, count) => {
    return count * (page - 1);
};

class GunController {
    async create(req, res) {
        const { name, price, count } = req.body;
        console.log(price);
        try {
            // const uploadedResult = await cloudinary.uploader.upload(req.body.base64EncodedImage, {
            //     folder: 'guns',
            // });

            const product = new Product({
                name,
                price,
                imgUrl: 'lalka',
                category: req.category._id,
                count,
            });
            await product.save();

            const rootDocumentForProducts = await RootDocumentForProducts.findOne();

            await Promise.all([
                rootDocumentForProducts.addToItems(product),
                Category.findByIdAndUpdate(
                    { _id: req.category._id },
                    {
                        $inc: { productsCount: 1 },
                    },
                ),
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

    async get(req, res) {
        const { page, count } = req.query;
        try {
            if (req.category && !req.sort) {
                // const rootDocumentForGuns = await RootDocumentForGuns.aggregate([
                //     {$lookup: {
                //         from: 'guns', localField: 'items', foreignField: '_id', as: 'items'
                //     } },
                //     { $unwind: '$items'},
                //     { $match: {'items.categories': {$in: categoriesIds}} },
                //     {$lookup: {
                //         from: 'categories', localField: 'items.categories', foreignField: '_id', as: 'categories'
                //     } },
                //     {$addFields: {
                //         'items.categories': '$categories'
                //     } },
                //     {$group : {
                //         _id: "$_id",
                //         items: {$push: '$items'}
                //     } },
                //     {$project: {
                //         totalCount: { $size: '$items' },
                //         items: { $slice: ['$items', getSkip(page, count), count]},
                //     }},
                // ]);
                // const guns = mapToGuns(rootDocumentForGuns[0].items);

                const promiseProducts = await Product.find({ category: req.category._id })
                    .populate({ path: 'category', select: '-_id' })
                    .skip(getSkip(page, count))
                    .limit(count)
                    .lean();

                const [items, totalCount] = await Promise.all([
                    promiseProducts,
                    Product.countDocuments({ category: req.category._id }),
                ]);
                const products = markFavoritesProducts(items, req.favorites.items);

                return res.status(200).json({
                    status: 'succes',
                    items: products,
                    totalCount,
                });
            }

            if (req.sort && !req.category) {
                const promiseProducts = await Product.find()
                    .sort({ [req.sort.type]: req.sort.direction })
                    .populate('category, -_id')
                    .skip(getSkip(page, count))
                    .limit(count)
                    .lean();
                const [items, totalCount] = await Promise.all([
                    promiseProducts,
                    Product.countDocuments(),
                ]);
                const products = markFavoritesProducts(items, req.favorites.items);
                return res.status(200).json({
                    status: 'succes',
                    items: products,
                    totalCount,
                });
            }

            if (req.sort && req.category) {
                const promiseProducts = Product.find({ category: req.category._id })
                    .sort({ [req.sort.type]: req.sort.direction })
                    .populate('category', '-_id')
                    .skip(getSkip(page, count))
                    .limit(count)
                    .lean();

                const [items, totalCount] = await Promise.all([
                    promiseProducts,
                    Product.countDocuments({ category: req.category._id }),
                ]);
                const products = markFavoritesProducts(items, req.favorites.items);
                return res.status(200).json({
                    status: 'succes',
                    items: products,
                    totalCount,
                });
            }
            const rootDocumentForProducts = await RootDocumentForProducts.findOne()
                .populate({ path: 'items', populate: { path: 'category', select: '-_id' } })
                .slice('items', [getSkip(page, count), count])
                .lean();

            const products = markFavoritesProducts(
                rootDocumentForProducts.items,
                req.favorites.items,
            );
            res.status(200).json({
                status: 'succes',
                items: products,
                totalCount: rootDocumentForProducts.totalCount,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }
}

module.exports = GunController;
