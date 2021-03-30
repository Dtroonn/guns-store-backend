const { query, param } = require('express-validator');

const { Product } = require('../../models');

exports.addToCartValidator = [
    query('count')
        .default(1)
        .toInt()
        .isNumeric()
        .withMessage('count must be number')
        .isFloat({ min: 1 })
        .withMessage('min value count is 1'),

    param('id')
        .notEmpty()
        .withMessage('id is required')
        .custom(async (value, { req }) => {
            try {
                const candidate = await Product.findById(value).lean();
                if (!candidate) {
                    return Promise.reject('product not found');
                }
                if (candidate.count < req.query.count) {
                    return Promise.reject('some items are out of stock or not enough');
                }
            } catch (e) {
                console.log(e);
            }
        }),
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
