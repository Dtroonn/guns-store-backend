const { body, param } = require('express-validator');

const { Product } = require('../../models');

exports.addToCartValidator = [
    body('count')
        .default(1)
        .toInt()
        .isNumeric()
        .withMessage('count must be number')
        .isFloat({ min: 1 })
        .withMessage('min value count is 1'),

    param('id').notEmpty().withMessage('id is required'),
];

exports.removeFromCartValidator = [
    param('id')
        .notEmpty()
        .withMessage('id is required')
        .custom(async (value) => {
            try {
                const candidate = await Product.findById(value).lean();
                if (!candidate) {
                    return Promise.reject('product not found');
                }
            } catch (e) {
                console.log(e);
            }
        }),
];
