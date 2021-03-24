const { Schema, model } = require('mongoose');

const orderSchema = newSchema(
    {
        totalPrice: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: new Date(Date.now()),
        },
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                },
                product: {
                    type: Object,
                    required: true,
                },
            },
        ],
    },
    { versionKey: false },
);

module.exports = model('Order', orderSchema);
