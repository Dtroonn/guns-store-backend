const fs = require('fs');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const { Gun, Category, RootDocumentForGuns } = require('../models');
const cloudinary = require('../utils/cloudinary')

const mapToGuns = (items) => {
    return items.map((item) => ({
        ...item,
        categories: item.categories.map(category => category.name),
    }));
}

const getSkip = (page, count) => { 
    return count * (page - 1);
}



const getCategoriesIds = async (categories) => {
    const categoriesNames = categories.toLowerCase().split(',');
    const categoriesDocuments = await Category.find({name: categoriesNames});
    if(categoriesNames.length !== categoriesDocuments.length) {
        return false;
    } 
    const categoriesIds = categoriesDocuments.map(category => {
        return mongoose.Types.ObjectId(category._id);
    });
    return categoriesIds;
}
 
class GunController { 
     async createGun(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    succes: false,
                    message: errors.array()[0].msg,
                });
            }


            const categories = await Category.find({_id: req.body.categories});
            if (categories.length !== req.body.categories.length) { 
               return  res.status(404).json({
                    succes: false,
                    message: 'CATEGORY NOT FOUND',
                })
            }

            const uploadedResult = await cloudinary.uploader.upload(req.body.base64EncodedImage, {
                folder: 'guns',
            })

            const gun = new Gun({
                name: req.body.name,
                price: req.body.price,
                imgUrl: uploadedResult.url,
                categories: req.body.categories, 
                count: req.body.count,
            });
            await gun.save();

            const rootDocumentForGuns = await RootDocumentForGuns.findOne(); 

            await Promise.all( [ rootDocumentForGuns.addToItems(gun),  
                Category.updateMany({_id: req.body.categories}, {
                    $inc: {productsCount: 1}
                }) ] )  
            
            res.status(201).json({
                succes: true
            })
            
        } catch (e) {
            console.log(e);
            res.status(500).json({
                success: false,
                message: e.message,
            })
        }
    }


    async getGuns(req, res) {
        let {page, count, categories, sort} = req.query;
        page = Math.abs(+page) || 1;
        count = count <=10 && Math.abs(+count) || 10;
        try{
            if (categories && !sort) {
                const categoriesIds = await getCategoriesIds(categories);
                if(!categoriesIds) {
                    return  res.status(404).json({ 
                        succes: false,
                        message: 'CATEGORY NOT FOUND', 
                    })
                }

                
                // const rootDocumentForGuns = await RootDocumentForGuns.aggregate([
                //     {$lookup: {
                //         from: 'guns', localField: 'items', foreignField: '_id', as: 'items'  
                //     } },
                //     { $unwind: '$items'},
                //     { $match: {'items.categories': {$in: categoriesIds}} },   
                //     {$lookup: {
                //         from: 'categories', localField: 'items.categories', foreignField: '_id', as: 'categories'  
                //     } },
                //     {$addFields: {
                //         'items.categories': '$categories' 
                //     } }, 
                //     {$group : {
                //         _id: "$_id",
                //         items: {$push: '$items'} 
                //     } },
                //     {$project: {
                //         totalCount: { $size: '$items' },
                //         items: { $slice: ['$items', getSkip(page, count), count]},
                //     }}, 
                // ]); 
                // const guns = mapToGuns(rootDocumentForGuns[0].items);

                const promiseGuns = await Gun.find({categories: {$in: categoriesIds}})
                                            .populate('categories')
                                            .skip(getSkip(page, count))
                                            .limit(count)
                                            .lean();

                const [items, totalCount ] =  await Promise.all([
                    promiseGuns, 
                    Gun.countDocuments({categories: {$in: categoriesIds}})
                ]);
                const guns = mapToGuns(items);

                return res.status(200).json({
                    succes: true,
                    items: guns,
                    totalCount,  
                }) 
            }

            if (sort && !categories) {
                const [type, param] = sort.split('_');
                if (type.toLowerCase() === "price" && Math.abs(+param) === 1) {
                    const promiseGuns = await Gun.find().sort({'price.current': +param})
                                .populate('categories')
                                .skip(getSkip(page, count)).limit(count)
                                .lean();
                    const [items, totalCount] = await Promise.all( [promiseGuns, Gun.countDocuments()] )
                    const guns = mapToGuns(items);
                    return res.status(200).json({
                        succes: true,
                        items: guns,
                        totalCount,
                    })
                }
            }

            if(sort && categories) {
                const categoriesIds = await getCategoriesIds(categories);
                if(!categoriesIds) {
                    return  res.status(404).json({ 
                        succes: false,
                        message: 'CATEGORY NOT FOUND', 
                    })
                }
                const [type, param] = sort.split('_');
                if (type.toLowerCase() === "price" && Math.abs(+param) === 1) {
                    const promiseGuns = Gun.find({categories: {$in: categoriesIds}})
                                        .sort({'price.current': param})
                                        .populate('categories')
                                        .skip(getSkip(page, count))
                                        .limit(count)
                                        .lean();
                    
                    const [items, totalCount] = await Promise.all( [
                        promiseGuns, 
                        Gun.countDocuments({categories: {$in: categoriesIds}})
                    ] )
                    const guns = mapToGuns(items);
                    return res.status(200).json({
                        succes: true,
                        items: guns,
                        totalCount,
                    })
                }
            }
            const rootDocumentForGuns = await RootDocumentForGuns.findOne()
                .populate({path: 'items',  populate: {path: 'categories'}}) 
                .slice('items', [getSkip(page, count), count])
                .lean();
            const guns = mapToGuns(rootDocumentForGuns.items);  
            res.status(200).json({
                succes: true,
                items: guns,
                totalCount: rootDocumentForGuns.totalCount, 
            }) 
        } catch (e) {
            console.log(e);
            res.status(500).json({
                succes: false,
                message: e.message,
            })
        }
    }
    
}

module.exports = GunController;