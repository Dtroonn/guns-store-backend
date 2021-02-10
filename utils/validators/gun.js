const {body} = require('express-validator');

exports.createGunValidator = [
    body('name').isString().isLength({min: 2, max: 20})
        .withMessage('Имя должно содержать от 2 до 20 символов'),
    body('price.current').isNumeric().withMessage('Цена должна содержать только цифры')
        .notEmpty().withMessage('Цена не должна быть пустой'),
    body('base64EncodedImage').isString().withMessage('Неверный base64EncodedImage'),
    body('count').notEmpty().withMessage('Количество товара не должно быть пустым')
        .isNumeric().withMessage('Поле должно содержать только цифры'),
    body('categories').notEmpty().isArray(), 
]

