const GunController = require('./GunController');
const CategoryController = require('./CategoryController');
const AuthController  = require('./AuthController');

module.exports = {
    GunCntrl: new GunController(),
    CategoryCntrl: new CategoryController(),
    AuthCntrl : new AuthController(),
}