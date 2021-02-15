const { User } = require('../models');

module.exports = async function(req, res, next) {
    if (!req.session.userId) {
        return next();
    }

    req.user = await User.findById(req.session.userId)
                .select('-emailConfirmationToken -password -passwordResetToken');
    next();
}