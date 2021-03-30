const { validationResult } = require('express-validator');

module.exports = function (validations, resCode = 422) {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(resCode).json({
            status: 'error',
            errors: errors.array(),
        });
    };
};
