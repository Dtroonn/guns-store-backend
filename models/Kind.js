const { model } = require('mongoose');

const { filterSchemaFactory } = require('../schemasFactories');

const kindSchema = filterSchemaFactory();

module.exports = model('Kind', kindSchema);
