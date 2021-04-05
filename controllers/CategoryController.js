const slugify = require('slugify');

const { Category } = require('../models');

class CategoryController {
    async create(req, res) {
        try {
            const slug = await slugify(req.body.name);
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
                succes: true,
                categories,
            });
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e,
            });
        }
    }
}

module.exports = CategoryController;
