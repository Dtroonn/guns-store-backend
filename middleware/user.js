const { User } = require('../models');

module.exports = async function (req, res, next) {
    try {
        if (!req.session.userId) {
            return next();
        }
        const user = await User.findById(req.session.userId)
            .select('-emailConfirmationToken -password -passwordResetToken')
            .lean();
        req.user = user;
        next();
    } catch (e) {
        res.status(500).json({
            succes: false,
            message: e.message,
        });
    }
};
