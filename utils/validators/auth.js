const { body } = require('express-validator');

const { User } = require('../../models');

exports.registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Некорректный email')
        .normalizeEmail()
        .custom(async (value, { req }) => {
            try {
                const candidate = await User.findOne({ email: value });
                if (candidate) {
                    return Promise.reject('Такой email уже занят');
                }
            } catch (e) {
                console.log(e);
            }
        }),
    body('name')
        .isLength({ min: 2, max: 15 })
        .withMessage('Имя должно содержать от 2 до 15 символов'),
    body('surname')
        .isLength({ min: 2, max: 15 })
        .withMessage('Фамилия должна содержать от 2 до 20 символов'),
    body('password')
        .isLength({ min: 7, max: 20 })
        .withMessage('Пароль должен содержать от 7 до 20 символов'),
    body('passwordConfirm').custom(async (value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Пароли не совпадают');
        }
    }),
];

exports.loginValidator = [
    body('email').isEmail().withMessage('Некорректный email').normalizeEmail(),
    body('password')
        .isLength({ min: 7, max: 20 })
        .withMessage('Пароль должен содержать от 7 до 20 символов'),
];

exports.resetPasswordValidator = [
    body('email')
        .isEmail()
        .withMessage('incorrect email')
        .normalizeEmail()
        .custom(async (value) => {
            try {
                const candidate = await User.findOne({ email: value });
                if (candidate) {
                    return Promise.reject('user with such mail was not found');
                }
                req.user = candidate;
            } catch (e) {
                console.log(e);
            }
        }),
];

exports.setPasswordValidator = [
    body('password')
        .isLength({ min: 7, max: 20 })
        .withMessage('Пароль должен содержать от 7 до 20 символов'),
    body('passwordConfirm').custom(async (value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Пароли не совпадают');
        }
    }),
];

exports.sendConfirmationEmailValidator = [
    body('email').isEmail().withMessage('Некорректный email').normalizeEmail(),
];
