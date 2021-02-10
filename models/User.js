const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, 
    },
    favorites: [{type: Schema.Types.ObjectId, ref: 'Gun'}],
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    default: 1,
                },
                gun: {
                    type: Schema.Types.ObjectId,
                    ref: 'Gun',
                    required: true,
                }
            }
        ]
    },

});

module.exports = model('User', userSchema);