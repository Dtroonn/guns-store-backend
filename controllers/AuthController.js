const { validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const { User } = require('../models');
const {transporter, registration} = require('../emails')

class AuthController {
    async checkAuth(req, res) {
        if(req.session.user) {
            return res.status(200).json({
                succes: true,
                data: req.session.user
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
                    req.session.user = candidate; 
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
}

module.exports = AuthController;