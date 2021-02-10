const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    productsCount: {
        type: Number,
        default: 0,
    },
}); 

categorySchema.method('toClient', function() {
    var obj = this.toObject();
 
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
 
    return obj; 
}); 

module.exports = model('Category', categorySchema);