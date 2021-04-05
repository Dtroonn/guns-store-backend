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
                index: true,
            },
            old: {
                type: Number,
                default: null,
                index: true,
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
            index: true,
        },
        type: {
            type: Schema.Types.ObjectId,
            ref: 'Type',
            index: true,
        },
        kind: {
            type: Schema.Types.ObjectId,
            ref: 'Kind',
            index: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
            index: true,
        },

        count: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false },
);

module.exports = model('Product', productSchema);
