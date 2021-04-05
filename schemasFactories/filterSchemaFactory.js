const { Schema } = require('mongoose');

module.exports = (schemaDefinition) => {
    return new Schema(
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
            category: {
                type: Schema.Types.ObjectId,
                ref: 'Category',
                required: true,
                index: true,
            },
            productsCount: {
                type: Number,
                default: 0,
            },
            ...schemaDefinition,
        },
        { versionKey: false },
    );
};
