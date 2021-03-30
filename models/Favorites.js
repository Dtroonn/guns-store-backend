const { Schema, model } = require('mongoose');

const favoritesSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        items: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        ],
    },
    { versionKey: false },
);

favoritesSchema.methods.addItem = function (id) {
    this.items.push(id);
    return this.save();
};

favoritesSchema.methods.removeItem = function (id) {
    items = this.items.filter((itemId) => itemId.toString() !== id.toString());
    this.items = items;
    return this.save();
};

favoritesSchema.methods.clearItems = function () {
    this.items = [];
    return this.save();
};

module.exports = model('Favorites', favoritesSchema);
