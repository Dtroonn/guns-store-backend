const {Category} = require('../models');

class CategoryController {
    async createCategory(req, res) {
        try {
            const category = new Category({
                name: req.body.name,
            })
            await category.save();
            res.status(201).json({
                succes: true
            })
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e,
            })
        }
    }

    async getCategories(req, res) {
        try {
            const categories = await Category.find().select('-__v');
            res.status(200).json({
                succes: true,
                categories,
            })
        } catch (e) {
            res.status(500).json({
                succes: false,
                message: e,
            })
        }
    }
}

module.exports = CategoryController;