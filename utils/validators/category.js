const { body } = require('express-validator');

exports.createCategoryValidator = [
    body('name')
        .isString()
        .withMessage('name must be string')
        .isLength({ min: 2, max: 45 })
        .withMessage('name must be between 2 and 45 characters'),
];
