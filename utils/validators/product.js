const { body, query } = require('express-validator');

const { Category } = require('../../models');

const checkCategoryBySlug = async (value, { req }) => {
    try {
        candidate = await Category.findOne({ slug: value }).lean();
        if (!candidate) {
            return Promise.reject('incorrect category');
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
        .isLength({ min: 2, max: 20 })
        .withMessage('Имя должно содержать от 2 до 20 символов')
        .toLowerCase(),

    body('price.current')
        .notEmpty()
        .withMessage('Цена не должна быть пустой')
        .isNumeric()
        .withMessage('Цена должна содержать только цифры'),

    body('price.old')
        .optional()
        .isNumeric()
        .withMessage('Старая цена должна содержать только цифры'),
    body('base64EncodedImage').optional().isString().withMessage('Неверный base64EncodedImage'),

    body('count')
        .notEmpty()
        .withMessage('Количество товара не должно быть пустым')
        .isNumeric()
        .withMessage('Поле должно содержать только цифры')
        .isFloat({ min: 0 })
        .withMessage('min value count is 0'),

    body('category')
        .notEmpty()
        .withMessage('category is required')
        .isString()
        .withMessage('category must be string')
        .toLowerCase()
        .custom(checkCategoryBySlug),
];

exports.getProductsValidator = [
    query('page')
        .default(1)
        .isNumeric()
        .withMessage('page must be number')
        .isFloat({ min: 1 })
        .withMessage('min value page is 1'),

    query('count')
        .default(10)
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

    query('category').optional().toLowerCase().custom(checkCategoryBySlug),

    query('type')
        .optional()
        .toLowerCase()
        .custom(async (value, { req }) => {}),
];
