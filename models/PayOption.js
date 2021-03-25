const { Schema, model } = require('mongoose');

const schemaPayOption = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
    },
    { versionKey: false },
);

module.exports = model('Pay-option', schemaPayOption);
