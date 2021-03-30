const { validationResult } = require('express-validator');

const { PayOption } = require('../models');

class PayOptionController {
    async get(req, res) {
        try {
            const payOptions = await PayOption.find().lean();
            res.status(200).json({
                status: 'succes',
                items: payOptions,
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }

    async create(req, res) {
        const { title, description } = req.body;
        try {
            const receiOption = new PayOption({
                title,
                description,
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

module.exports = PayOptionController;
