const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            current: {
                type: Number,
                required: true,
            },
            old: {
                type: Number,
                default: null,
            },
        },
        imgUrl: {
            type: String,
            required: true,
            default: 'lalka',
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },

        count: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false },
);

module.exports = model('Product', productSchema);
