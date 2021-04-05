const { body } = require('express-validator');

const { FiltersType } = require('../../models');

exports.createFiltersTypeValidator = [
    body('name')
        .isString()
        .withMessage('name must be string')
        .isLength({ min: 2, max: 50 })
        .withMessage('name must be between 2 and 50 characters')
        .toLowerCase()
        .custom(async (value) => {
            try {
                if (!value.match(/[A-Za-z]/g)) {
                    return Promise.reject(
                        'Please enter only English words. For example: names, brands',
                    );
                }
                const filtersType = await FiltersType.findOne({ name: value }).lean();
                if (filtersType) {
                    return Promise.reject('filters type with this name has already been created');
                }
            } catch (e) {
                console.log(e);
            }
        }),
];
