const { body } = require('express-validator');

const { ReceiOption, PayOption } = require('../../models');

exports.createOrderValidator = [
    body('name')
        .isString()
        .withMessage('name must be string')
        .isLength({ min: 2, max: 20 })
        .withMessage('name must be between 2 and 20 characters'),

    body('email').isEmail().withMessage('incorrect email').normalizeEmail(),

    body('tel')
        .notEmpty()
        .withMessage('phone is required')
        .isNumeric('phone must contain only numbers')
        .isLength({ min: 7, max: 15 })
        .withMessage('phone must be between 7 and 15 characters'),

    body('city')
        .isString()
        .withMessage('city must be string')
        .isLength({ min: 2, max: 30 })
        .withMessage('city must be between 2 and 30 characters'),

    body('entrance').optional().isNumeric().withMessage('entrance must be number'),
    body('apartment').optional().isNumeric().withMessage('apartment must be number'),

    body('comment')
        .optional()
        .isString()
        .withMessage('comment must be string')
        .isLength({ max: 250 })
        .withMessage('comment must not exceed 250 characters'),
    body('receiOptionId')
        .notEmpty()
        .withMessage('receiOptionId is required')
        .custom(async (value, { req }) => {
            try {
                const receiOption = await ReceiOption.findById(value).lean();
                if (!receiOption) {
                    return Promise.reject('recei option not found');
                }
                req.receiOption = receiOption;
            } catch (e) {
                console.log(e);
            }
        }),

    body('payOptionId')
        .notEmpty()
        .withMessage('payOptionId is required')
        .custom(async (value, { req }) => {
            try {
                const payOption = await PayOption.findById(value).lean();
                if (!payOption) {
                    return Promise.reject('pay option not found');
                }
                req.payOption = payOption;
            } catch (e) {
                console.log(e);
            }
        }),
];
