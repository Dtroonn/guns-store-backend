const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
    {
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

        totalPrice: {
            type: Number,
            required: true,
        },

        contactDetails: {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                index: true,
            },
            tel: {
                type: Number,
                required: true,
            },
        },
        delivery: {
            adress: {
                city: {
                    type: String,
                    required: true,
                },
                street: String,
                entrance: Number,
                apartment: Number,
            },
            receiOption: {
                type: Schema.Types.ObjectId,
                ref: 'Recei-option',
                required: true,
            },
            payOption: {
                type: Schema.Types.ObjectId,
                ref: 'Pay-option',
                required: true,
            },
            comment: String,
        },
    },
    { versionKey: false },
);

module.exports = model('Order', orderSchema);
