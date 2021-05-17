const { Product, Category, Type, Kind } = require('../models');
const cloudinary = require('../utils/cloudinary');

const getSkip = (page, count) => {
    return count * (page - 1);
};

class ProductController {
    async create(req, res) {
        const { name, currentPrice, oldPrice, count, rating } = req.body;
        try {
            const uploadedResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'papigun',
                format: 'webp',
            });

            const product = new Product({
                name,
                price: {
                    current: currentPrice,
                    old: oldPrice,
                },
                imgUrl: uploadedResult.secure_url,
                category: req.category,
                type: req.type,
                kind: req.kind,
                rating,
                count,
            });
            await product.save();

            await Promise.all([
                Category.findByIdAndUpdate(req.category, {
                    $inc: { productsCount: 1 },
                }),
                Type.findByIdAndUpdate(req.type, {
                    $inc: { productsCount: 1 },
                }),
                Kind.findByIdAndUpdate(req.kind, {
                    $inc: { productsCount: 1 },
                }),
            ]);

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

    async get(req, res) {
        const { page, count, sale } = req.query;
        let findObj = {};
        if (req.category) {
            findObj.category = req.category;
        }
        if (req.types) {
            findObj.type = req.types;
        }
        if (req.kinds) {
            findObj.kind = req.kinds;
        }
        if (sale) {
            findObj['price.old'] = { $ne: null };
        }
        if (req.price) {
            findObj['price.current'] = { $gte: req.price.min, $lte: req.price.max };
        }
        if (req.query.search) {
            findObj.name = { $regex: new RegExp(`${req.query.search}`), $options: 'i' };
        }

        try {
            if (req.sort) {
                const promiseProducts = await Product.find(findObj)
                    .sort({ [req.sort.type]: req.sort.direction })
                    .populate('category type kind', '-_id -productsCount -category')
                    .skip(getSkip(page, count))
                    .limit(count)
                    .lean();
                const [products, totalCount] = await Promise.all([
                    promiseProducts,
                    Product.countDocuments(findObj),
                ]);

                return res.status(200).json({
                    status: 'succes',
                    items: products,
                    totalCount,
                });
            }

            const promiseProducts = Product.find(findObj)
                .populate('category type kind', '-_id -productsCount -category')
                .skip(getSkip(page, count))
                .limit(count)
                .lean();

            const [products, totalCount] = await Promise.all([
                promiseProducts,
                Product.countDocuments(findObj),
            ]);

            return res.status(200).json({
                status: 'succes',
                items: products,
                totalCount,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                status: 'error',
                message: e.message,
            });
        }
    }
}

module.exports = ProductController;
