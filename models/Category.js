const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            index: true,
        },
        productsCount: {
            type: Number,
            default: 0,
        },
    },
    { versionKey: false },
);

module.exports = model('Category', categorySchema);
