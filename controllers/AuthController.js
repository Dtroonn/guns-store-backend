const { validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const { User } = require('../models');
const {transporter, registration, resetPassword, setPassword} = require('../emails')

class AuthController {
    async checkAuth(req, res) {
        if(req.user) {
            return res.status(200).json({
                succes: true,
                data: req.user
            })
        }
        res.status(200).json({
            succes: false,
        })
    }

    async register(req, res) {
        const {name, surname, email, password, passwordConfirm} = req.body;
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    succes: false,
                    message: errors.array()[0].msg, 
                });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const emailConfirmationToken = await new Promise ((resolve, reject) => {
                crypto.randomBytes(32, (err, buffer) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(buffer.toString('hex'));
                })
            })

            const user = new User({
                name,
                surname,
                email,
                emailConfirmationToken,
                password: passwordHash,
                cart: { items: [] },
                favorites: [],
            })

            await user.save();

            res.status(201).json({
                succes: true,
            })

            transporter.sendMail(registration(email, emailConfirmationToken));

        } catch (e) {
            console.log(e);
            res.status(500).json({
                succes: false,
                message: e.message,
            })
        }
    }

    async login(req, res) {
        const {email, password} = req.body;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    succes: false,
                    message: errors.array()[0].msg, 
                });
            }

            const candidate = await User.findOne({email: email});
            if (candidate) {
                const areSame = await bcrypt.compare(password, candidate.password);
                if ( areSame ) {
                    req.session.userId = candidate._id; 
                    return req.session.save(err => {
                        if (err) {
                            throw err;
                        }
                        res.status(200).json({
                            succes: true,
                        }) 
                    });
                }
                res.status(200).json({
                    succes: false,
                    message: 'Неверный логин или пароль'
                })
            }
            else {
                res.status(200).json({
                    succes: false,
                    message: 'Неверный логин или пароль'
                })
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                succes: false,
                message: e.message,
            })
        }
    }

    async logout(req, res)  {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    succes: false,
                    message: err.message
                })
            }
            res.status(200).json({
                succes: true, 
            })
        });
    }

    async sendConfirmationEmail(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    succes: false,
                    message: errors.array()[0].msg
                })
            }

            const candidate = await User.findOne({email: req.body.email});
            if (!candidate) {
                return res.status(404).json({
                    succes: false,
                    message: 'Пользователь с такой почтой не найден'
                })
            }
            if (candidate.isEmailConfirmed) {
                return res.status(200).json({
                    succes: false,
                    message: 'Почта уже подтверждена'
                })
            }
            const emailConfirmationToken = await new Promise ((resolve, reject) => {
                crypto.randomBytes(32, (err, buffer) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(buffer.toString('hex'));
                })
            })
            candidate.emailConfirmationToken = emailConfirmationToken;
            await candidate.save();
            res.status(200).json({
                succes: true,
            })

            transporter.sendMail(registration(candidate.email, emailConfirmationToken));
        }
         catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            })
        }
    }

    async confirmEmail(req, res) {
        try {
            const candidate = await User.findOne({emailConfirmationToken: req.params.token});
            if (!candidate) {
                return res.status(404).json({
                    succes: false,
                    message: 'TOKEN NOT FOUND'
                });
            }

            candidate.emailConfirmationToken = null;
            candidate.isEmailConfirmed = true;
            await candidate.save();

            res.status(200).json({
                succes: true
            });

        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
               return res.status(422).json({
                    succes: false,
                    message: errors.array()[0].msg,
                })
            }

            const candidate = await User.findOne({email: req.body.email});
            if(!candidate) {
                return res.status(404).json({
                    succes: false,
                    message: 'Пользователь не найден'
                });
            }
            if (candidate.passwordResetToken.expireAt &&
                 !(candidate.passwordResetToken.expireAt - Date.now() < 0)) {
                return res.status(200).json({
                    succes: false,
                    message: 'Невозможно запросить новый токен за такой промежуток времени'
                });
            }
            const passwordResetToken = await new Promise ((resolve, reject) => {
                crypto.randomBytes(32, (err, buffer) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(buffer.toString('hex'));
                })
            });
            candidate.passwordResetToken.body = passwordResetToken;
            candidate.passwordResetToken.expireAt = new Date( Date.now() + 60000 * 15);
            await candidate.save();
            res.status(200).json({
                succes: true,
            })

            transporter.sendMail(resetPassword(candidate.email, candidate.name, passwordResetToken));

        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }

    async checkPasswordResetToken(req, res) {
        try {
            const candidate = await User.findOne({'passwordResetToken.body': req.params.token});
            if (candidate) {
                if (candidate.passwordResetToken.expireAt > Date.now()) {
                    return res.status(200).json({
                        succes: true
                    })
                }
                res.status(200).json({
                    succes: false,
                    message: 'Время действия токена истекло'
                })
            }
            else {
                res.status(404).json({
                    succes: false,
                    message: 'Токен не найден'
                })
            }
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }

    async setPassword(req, res) {
        const {password, passwordConfirm} = req.body;
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({
                    succes: false,
                    message: errors.array()[0].msg 
                })
            }
            const candidate = await User.findOne({'passwordResetToken.body': req.params.token});
            const store = req.sessionStore;
            const sessions = store.db.collection('sessions');
            if(candidate) {
                if(candidate.passwordResetToken.expireAt > Date.now()) {
                    const passwordHash = await bcrypt.hash(password, 10);
                    candidate.password = passwordHash;
                    candidate.passwordResetToken = {};
                    await candidate.save();
                    const userSessions = await sessions.find({'session.user.email': candidate.email})
                                                        .toArray();
                    userSessions.forEach((session) => {
                        store.destroy(session._id, (err) => {
                            if (err) {
                                throw err;
                            }
                        })
                    });
                    res.status(200).json({
                        succes: true
                    })

                    return transporter.sendMail(setPassword(candidate.email, candidate.name))
                }
                res.status(200).json({
                    succes: false,
                    message: 'Время действия токена истекло'
                })
            }
            else {
                res.status(404).json({ 
                    succes: false,
                    message: 'Токен не найден'
                })
            }

            
    
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }
}

module.exports = AuthController;