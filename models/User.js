const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
    {
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
        isEmailConfirmed: {
            type: Boolean,
            default: false,
        },
        emailConfirmationToken: String,
        password: {
            type: String,
            required: true,
        },
        passwordResetToken: {
            body: String,
            expireAt: Date,
        },
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
                    },
                },
            ],
        },
    },
    { versionKey: false },
);

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = model('User', userSchema);
