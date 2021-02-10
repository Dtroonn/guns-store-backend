const GunController = require('./GunController');
const CategoryController = require('./CategoryController');

module.exports = {
    GunCntrl: new GunController(),
    CategoryCntrl: new CategoryController(),
}