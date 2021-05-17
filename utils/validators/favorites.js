const { param } = require('express-validator');

const { Product } = require('../../models');

exports.addRemoveFavoritesValidagor = [
    param('id')
        .notEmpty()
        .withMessage('id is required')
        .custom(async (value, { req }) => {
            try {
                const candidate = await Product.findById(value).lean();
                if (!candidate) {
                    return Promise.reject('product not found');
                }
                req.product = candidate;
            } catch (e) {
                console.log(e);
            }
        }),
];
