const { Schema, model } = require('mongoose');

const RootDocumentForProductsSchema = new Schema({
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    ],
    totalCount: {
        type: Number,
        default: 0,
    },
});

RootDocumentForProductsSchema.methods.addToItems = async function (item) {
    this.items.push(item._id);
    this.totalCount++;
    return this.save();
};

RootDocumentForProducts = model('Root-document-for-products', RootDocumentForProductsSchema);

// (async function () {
//     rootDocumentForProducts = new RootDocumentForProducts({
//         items: [],
//     });
//     rootDocumentForProducts.save();
// })();

module.exports = RootDocumentForProducts;
