const { validationResult } = require('express-validator');

const { PayOption } = require('../models');

class PayOptionController {
    async get(req, res) {
        try {
            const payOptions = await PayOption.find().lean();
            res.status(200).json({
                items: payOptions,
            });
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }

    async create(req, res) {
        const { title, description } = req.body;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    succes: false,
                    errors: errors.array(),
                });
            }

            const receiOption = new PayOption({
                title,
                description,
            });
            await receiOption.save();
            res.status(200).json({
                succes: true,
            });
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e.message,
            });
        }
    }
}

module.exports = PayOptionController;
