const { validationResult } = require('express-validator');

const { ReceiOption } = require('../models');

class ReceiOptionController {
    async get(req, res) {
        try {
            const receiOptions = await ReceiOption.find().lean();
            res.status(200).json({
                status: 'succes',
                items: receiOptions,
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async create(req, res) {
        const { title, description, price } = req.body;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    succes: false,
                    errors: errors.array(),
                });
            }

            const receiOption = new ReceiOption({
                title,
                description,
                price,
            });
            await receiOption.save();
            res.status(201).json({
                status: 'succes',
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }
}

module.exports = ReceiOptionController;
