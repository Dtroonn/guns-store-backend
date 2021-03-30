const { Schema, model } = require('mongoose');

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                count: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalCount: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false },
);

cartSchema.methods.addItem = function (id, count) {
    const candidate = this.items.find((item) => item.product.toString() === id.toString());
    if (!candidate) {
        this.items.push({
            product: id,
            count,
        });
        this.totalCount += count;
    } else {
        this.totalCount = this.totalCount - candidate.count + count;
        candidate.count = count;
    }
    return this.save();
};

cartSchema.methods.removeItem = function (id) {
    const itemIndex = this.items.findIndex((item) => item.product.toString() === id.toString());
    this.totalCount -= this.items[itemIndex].count;
    this.items.splice(itemIndex, 1);
    return this.save();
};

cartSchema.methods.clear = function () {
    this.items = [];
    this.totalCount = 0;
    return this.save();
};

module.exports = model('Cart', cartSchema);
