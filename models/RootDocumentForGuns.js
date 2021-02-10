const {Schema, model} = require('mongoose');

const RootDocumentForGunsSchema = new Schema({
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Gun',
            required: true,
        }
    ],
    totalCount: {
        type: Number,
        default: 0, 
    }
});


RootDocumentForGunsSchema.methods.addToItems = async function(item) {
    this.items.push(item._id);
    this.totalCount++;
    return this.save(); 
}

RootDocumentForGuns = model('RootDocumentForGuns', RootDocumentForGunsSchema);

// (async function () {
//     rootDocumentForGuns =  new RootDocumentForGuns({
//         items: []
//     })
//     rootDocumentForGuns.save();
// })() 

module.exports = RootDocumentForGuns;