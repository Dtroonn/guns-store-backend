const { param } = require('express-validator');

const { Product } = require('../../models');

exports.addRemoveFavoritesValidagor = [
    param('id')
        .notEmpty()
        .withMessage('id is required')
        .custom(async (value) => {
            try {
                const candidate = await Product.findById(value).lean();
                console.log(candidate);
                if (!candidate) {
                    return Promise.reject('product not found');
                }
            } catch (e) {
                console.log(e);
            }
        }),
];
