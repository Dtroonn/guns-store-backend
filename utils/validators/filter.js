const { body, param } = require('express-validator');

const { Category } = require('../../models');

const checkCategoryBySlug = async (value, { req }) => {
    try {
        const candidate = await Category.findOne({ slug: value }).select('_id').lean();
        if (!candidate) {
            return Promise.reject('category not found');
        }
        req.category = candidate;
    } catch (e) {
        console.log(e);
    }
};

exports.createFilterValidator = [
    body('name')
        .isString()
        .withMessage('name must be string')
        .isLength({ min: 2, max: 40 })
        .withMessage('name must be between 2 and 40 characters'),

    body('category')
        .notEmpty()
        .withMessage('categories is required')
        .isString()
        .withMessage('categories must be string')
        .toLowerCase()
        .custom(checkCategoryBySlug),
];

exports.getFilterValidator = [
    param('category')
        .optional()
        .isString()
        .withMessage('category must be string')
        .toLowerCase()
        .custom(checkCategoryBySlug),
];
