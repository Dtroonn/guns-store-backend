const { validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs')


const { User } = require('../models');

class AuthController {
    async checkAuth(req, res) {
        res.status(200).json({
            succes: Boolean(req.session.isAuth)
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
            bcrypt.compare
            const user = new User({
                name,
                surname,
                email,
                password: passwordHash,
                cart: { items: [] },
                favorites: [],
            })

            await user.save();

            res.status(201).json({
                succes: true,
            })

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
                    req.session.isAuth = true;
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
}

module.exports = AuthController;