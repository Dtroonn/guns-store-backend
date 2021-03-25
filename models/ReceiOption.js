const { Schema, model } = require('mongoose');

const schemaReceiOption = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        price: {
            type: Number,
            default: 0,
        },
    },
    { versionKey: false },
);

module.exports = model('Recei-option', schemaReceiOption);
