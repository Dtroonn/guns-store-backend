const { Type, Kind, Product } = require('../models');

class FilterController {
    async get(req, res) {
        const findObj = {
            category: req.category,
        };
        try {
            const [discountedProductsCount, types, kinds] = await Promise.all([
                Product.countDocuments({ ...findObj, 'price.old': { $ne: null } }),
                Type.find(findObj).select('-category').lean(),
                Kind.find(findObj).select('-category').lean(),
            ]);

            res.status(200).json({
                status: 'succes',
                filtres: {
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
