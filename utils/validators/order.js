const { body } = require('express-validator');

exports.createOrderValidator = [
    body('name')
        .notEmpty()
        .withMessage('name is required')
        .isString()
        .withMessage('name must be string')
        .isLength({ min: 2, max: 20 })
        .withMessage('name must be between 2 and 20 characters'),

    body('email').isEmail().withMessage('incorrect email').normalizeEmail(),

    body('phone')
        .notEmpty()
        .withMessage('phone is required')
        .isNumeric('phone must contain only numbers')
        .isLength({ min: 7, max: 15 })
        .withMessage('phone must be between 7 and 15 characters'),

    body('receiOptionId').notEmpty().withMessage('receiOptionId is required'),

    body('payOptionId').notEmpty().withMessage('payOptionId is required'),

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
        .isLength({ max: 500 })
        .withMessage('comment must not exceed 500 characters'),
];
