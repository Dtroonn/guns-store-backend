const { model } = require('mongoose');

const { filterSchemaFactory } = require('../schemasFactories');

const typeSchema = filterSchemaFactory();

module.exports = model('Type', typeSchema);
