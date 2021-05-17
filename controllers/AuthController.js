const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const { User, Favorites, Cart } = require('../models');
const { transporter, registration, resetPassword, setPassword } = require('../emails');

const generateToken = (size) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(size, (err, buffer) => {
            if (err) {
                reject(err);
            }
            resolve(buffer.toString('hex'));
        });
    });
};

class AuthController {
    async checkAuth(req, res) {
        try {
            if (req.user) {
                return res.status(200).json({
                    status: 'succes',
                    data: req.user,
                });
            }
            res.status(200).json({
                status: 'succes',
                data: null,
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async register(req, res) {
        const { name, surname, email, password } = req.body;
        try {
            const emailConfirmationToken = await generateToken(32);

            const user = new User({
                name,
                surname,
                email,
                emailConfirmationToken,
                password,
            });
            await user.save();

            if (req.session.favoritesId) {
                await Favorites.findByIdAndUpdate(req.session.favoritesId, { userId: user._id });
            }
            if (req.session.cartId) {
                await Cart.findByIdAndUpdate(req.session.cartId, { userId: user._id });
            }

            req.session.userId = user._id;
            req.session.save((err) => {
                if (err) {
                    throw err;
                }
                res.status(200).json({
                    status: 'succes',
                });
            });

            transporter.sendMail(registration(email, emailConfirmationToken));
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const candidate = await User.findOne({ email: email }).lean();
            if (candidate) {
                const areSame = await bcrypt.compare(password, candidate.password);
                if (areSame) {
                    req.session.userId = candidate._id;
                    return req.session.save((err) => {
                        if (err) {
                            throw err;
                        }
                        res.status(200).json({
                            status: 'succes',
                        });
                    });
                }
                res.status(401).json({
                    status: 'error',
                    message: 'incorrect email or password',
                });
            } else {
                res.status(401).json({
                    status: 'error',
                    message: 'incorrect email or password',
                });
            }
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: err.message,
                });
            }
            res.status(200).json({
                status: 'succes',
            });
        });
    }

    async sendConfirmationEmail(req, res) {
        try {
            const candidate = await User.findOne({ email: req.body.email });
            if (!candidate) {
                return res.status(422).json({
                    status: 'error',
                    errorCode: 1,
                    message: 'user with such mail was not found',
                });
            }
            if (candidate.isEmailConfirmed) {
                return res.status(422).json({
                    status: 'error',
                    errorCode: 2,
                    message: 'email has already been confirmed',
                });
            }

            const emailConfirmationToken = await generateToken(32);
            candidate.emailConfirmationToken = emailConfirmationToken;

            await candidate.save();
            res.status(200).json({
                status: 'succes',
            });

            transporter.sendMail(registration(candidate.email, emailConfirmationToken));
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async confirmEmail(req, res) {
        try {
            const candidate = await User.findOne({ emailConfirmationToken: req.params.token });
            if (!candidate) {
                return res.status(400).json({
                    status: 'error',
                    message: 'token not found',
                });
            }

            candidate.emailConfirmationToken = null;
            candidate.isEmailConfirmed = true;
            await candidate.save();

            res.status(200).json({
                status: 'succes',
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async resetPassword(req, res) {
        const { user } = req;
        try {
            if (
                user.usepasswordResetToken.expireAt &&
                !(user.passwordResetToken.expireAt - Date.now() < 0)
            ) {
                return res.status(400).json({
                    status: 'error',
                    message: 'you cannot request a new token in such a period of time',
                });
            }
            const passwordResetToken = await generateToken(32);
            user.passwordResetToken.body = passwordResetToken;
            user.passwordResetToken.expireAt = new Date(Date.now() + 60000 * 15);
            await candidate.save();
            res.status(200).json({
                status: 'succes',
            });

            transporter.sendMail(
                resetPassword(candidate.email, candidate.name, passwordResetToken),
            );
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async checkPasswordResetToken(req, res) {
        try {
            const candidate = await User.findOne({ 'passwordResetToken.body': req.params.token });
            if (candidate) {
                if (candidate.passwordResetToken.expireAt > Date.now()) {
                    return res.status(200).json({
                        status: 'succes',
                    });
                }
                res.status(400).json({
                    status: 'error',
                    message: 'token has expired',
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'token not found',
                });
            }
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async setPassword(req, res) {
        const { password } = req.body;
        try {
            const candidate = await User.findOne({ 'passwordResetToken.body': req.params.token });
            const store = req.sessionStore;
            const sessions = store.db.collection('sessions');
            if (candidate) {
                if (candidate.passwordResetToken.expireAt > Date.now()) {
                    const passwordHash = await bcrypt.hash(password, 10);
                    candidate.password = passwordHash;
                    candidate.passwordResetToken = {};
                    await candidate.save();
                    const userSessions = await sessions
                        .find({ 'session.user.email': candidate.email })
                        .toArray();
                    userSessions.forEach((session) => {
                        store.destroy(session._id, (err) => {
                            if (err) {
                                throw err;
                            }
                        });
                    });
                    res.status(200).json({
                        status: 'succes',
                    });

                    return transporter.sendMail(setPassword(candidate.email, candidate.name));
                }
                res.status(400).json({
                    status: 'error',
                    errorCode: 1,
                    message: 'token has expired',
                });
            } else {
                res.status(400).json({
                    status: 'error',
                    errorCode: 2,
                    message: 'token not found',
                });
            }
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }
}

module.exports = AuthController;
