const slugify = require('slugify');

const { Kind } = require('../models');

class KindController {
    async get(req, res) {}

    async create(req, res) {
        const { name } = req.body;
        try {
            const slug = await slugify(name, {
                lower: true,
            });
            const kind = new Kind({
                name,
                slug,
                category: req.category,
            });
            await kind.save();
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

module.exports = KindController;
