const { body, query } = require('express-validator');

const { Category, Type, Kind } = require('../../models');

const checkCategoryBySlug = async (value, { req }) => {
    try {
        candidate = await Category.findOne({ slug: value }).select('_id').lean();
        if (!candidate) {
            return Promise.reject('category not found');
        }
        req.category = candidate;
    } catch (e) {
        console.log(e);
    }
};

exports.createProductValidator = [
    body('name')
        .isString()
        .withMessage('name must be string')
        .isLength({ min: 2, max: 100 })
        .withMessage('name must be between 2 and 40 characters'),

    body('currentPrice')
        .notEmpty()
        .withMessage('current price is required')
        .isNumeric()
        .withMessage('current price must be number'),

    body('oldPrice').optional().isNumeric().withMessage('old price must be number'),

    body('count')
        .notEmpty()
        .withMessage('count is required')
        .isNumeric()
        .withMessage('count must be number')
        .isFloat({ min: 0 })
        .withMessage('min value count is 0'),

    body('category')
        .notEmpty()
        .withMessage('category is required')
        .isString()
        .withMessage('category must be string')
        .toLowerCase()
        .custom(checkCategoryBySlug),

    body('type')
        .optional()
        .isString()
        .withMessage('type must be string')
        .toLowerCase()
        .custom(async (value, { req }) => {
            try {
                candidate = await Type.findOne({ slug: value }).select('_id').lean();
                if (!candidate) {
                    return Promise.reject('type not found');
                }
                req.type = candidate;
            } catch (e) {
                console.log(e);
            }
        }),

    body('kind')
        .optional()
        .isString()
        .withMessage('kind must be string')
        .toLowerCase()
        .custom(async (value, { req }) => {
            try {
                candidate = await Kind.findOne({ slug: value }).select('_id').lean();
                if (!candidate) {
                    return Promise.reject('kind not found');
                }
                req.kind = candidate;
            } catch (e) {
                console.log(e);
            }
        }),

    body('rating')
        .optional()
        .isNumeric()
        .withMessage('rating must be number')
        .isFloat({ min: 1, max: 5 })
        .withMessage('rating must be range 0 and 5'),
];

exports.getProductsValidator = [
    query('page')
        .default(1)
        .toInt()
        .isNumeric()
        .withMessage('page must be number')
        .isFloat({ min: 1 })
        .withMessage('min value page is 1'),

    query('count')
        .default(10)
        .toInt()
        .isNumeric()
        .withMessage('count must be number')
        .isFloat({ min: 5, max: 20 })
        .withMessage('count must be range 5 and 20'),
    query('sort')
        .optional()
        .isString()
        .withMessage('sort must be string')
        .toLowerCase()
        .custom(async (value, { req }) => {
            const [sortType, param] = value.split('_');
            const sortDirection = Number(param);

            if (Math.abs(sortDirection) !== 1) {
                return Promise.reject('sort is incorrect');
            }

            if (sortType === 'price' || sortType === 'rating') {
                req.sort = {
                    type: sortType === 'price' ? 'price.current' : sortType,
                    direction: sortDirection,
                };
            } else {
                return Promise.reject('sort is incorrect');
            }
        }),

    query('sale').default(false).toBoolean(),

    query('category')
        .optional()
        .isString()
        .withMessage('category must be string')
        .toLowerCase()
        .custom(checkCategoryBySlug),

    query('price')
        .optional()
        .custom(async (value, { req }) => {
            const prices = value.split(',');
            const minPrice = Number(prices[0]);
            const maxPrice = Number(prices[1]);
            if (isNaN(minPrice) || isNaN(maxPrice)) {
                return Promise.reject('price is incorrect');
            }
            req.price = {
                min: minPrice,
                max: maxPrice,
            };
        }),

    query('type')
        .optional()
        .isString()
        .withMessage('type must be string')
        .toLowerCase()
        .custom(async (value, { req }) => {
            try {
                const slugsArray = value.split(',');
                const candidates = await Type.find({ slug: slugsArray }).select('_id').lean();
                if (slugsArray.length !== candidates.length) {
                    return Promise.reject('type not found');
                }
                req.types = candidates;
            } catch (e) {
                console.log(e);
            }
        }),

    query('kind')
        .optional()
        .isString()
        .withMessage('kind must be string')
        .toLowerCase()
        .custom(async (value, { req }) => {
            try {
                const slugsArray = value.split(',');

                const candidates = await Kind.find({ slug: slugsArray }).select('_id').lean();

                if (slugsArray.length !== candidates.length) {
                    return Promise.reject('kind not found');
                }
                req.kinds = candidates;
            } catch (e) {
                console.log(e);
            }
        }),
];
