const { body } = require('express-validator');

exports.createPayOptionValidator = [
    body('title')
        .isString()
        .withMessage('title must be string')
        .isLength({ min: 4, max: 30 })
        .withMessage('title must be between 4 and 30 characters'),
    body('description')
        .optional()
        .isString()
        .withMessage('description must be string')
        .isLength({ min: 10, max: 70 })
        .withMessage('description must be between 10 and 70 characters'),
];
