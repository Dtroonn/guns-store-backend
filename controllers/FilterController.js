const { Type, Kind, Product } = require('../models');

class FilterController {
    async get(req, res) {
        const { category } = req;
        const findObj = {};
        if (category) {
            findObj.category = category;
        }

        if (req.query.search) {
            findObj.name = { $regex: new RegExp(`${req.query.search}`), $options: 'i' };
        }

        try {
            const [
                cheapestProduct,
                mostExpensiveProduct,
                discountedProductsCount,
                types,
                kinds,
            ] = await Promise.all([
                Product.findOne(findObj).sort({ 'price.current': 1 }).select('price').lean(),
                Product.findOne(findObj).sort({ 'price.current': -1 }).select('price').lean(),
                Product.countDocuments({ ...findObj, 'price.old': { $ne: null } }),
                findObj.category
                    ? Type.find({ category: findObj.category }).select('-category').lean()
                    : [],
                findObj.category
                    ? Kind.find({ category: findObj.category }).select('-category').lean()
                    : [],
            ]);

            const minPriceProduct = cheapestProduct ? cheapestProduct.price.current : 0;
            const maxPriceProduct = mostExpensiveProduct ? mostExpensiveProduct.price.current : 1;

            res.status(200).json({
                status: 'succes',
                filters: {
                    price: {
                        min: minPriceProduct,
                        max: maxPriceProduct,
                    },
                    sale: {
                        productsCount: discountedProductsCount,
                    },
                    types,
                    kinds,
                },
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }
}

module.exports = FilterController;
