const slugify = require('slugify');

const { Category } = require('../models');

class CategoryController {
    async create(req, res) {
        try {
            const slug = await slugify(req.body.name, { lower: true });
            const category = new Category({
                name: req.body.name,
                slug,
            });
            await category.save();
            res.status(201).json({
                status: 'succes',
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e,
            });
        }
    }

    async get(req, res) {
        try {
            const categories = await Category.find();
            res.status(200).json({
                status: 'succes',
                items: categories,
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e,
            });
        }
    }
}

module.exports = CategoryController;
