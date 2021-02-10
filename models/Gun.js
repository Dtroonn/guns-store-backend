const {Schema, model} = require('mongoose');

const gunSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        current: {
            type: Number,
            required: true,
        },
        old: {
            type: Number,
            default: null,
        }
    },
    imgUrl: {
        type: String,
        required: true,
        default: 'lalka', 
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }], 
    count: {
        type: Number,
        required: true,
    },
}, { versionKey: false });

// gunSchema.method('toClient', function() {
//     let obj = this.toObject(); 
 
//     
//     obj.id = obj._id;  
//     delete obj._id;
//     return obj; 
// }); 

module.exports = model('Gun', gunSchema);