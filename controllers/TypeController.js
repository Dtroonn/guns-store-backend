const slugify = require('slugify');

const { Type } = require('../models');

class TypeController {
    async get(req, res) {}

    async create(req, res) {
        const { name } = req.body;
        try {
            const slug = await slugify(name, {
                lower: true,
            });
            const type = new Type({
                name,
                slug,
                category: req.category,
            });
            await type.save();
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

module.exports = TypeController;
