const GunController = require('./GunController');
const CategoryController = require('./CategoryController');
const AuthController = require('./AuthController');
const FavoritesController = require('./FavoritesController');
const CartController = require('./CartController');

module.exports = {
    GunCntrl: new GunController(),
    CategoryCntrl: new CategoryController(),
    AuthCntrl: new AuthController(),
    FavoritesCntrl: new FavoritesController(),
    CartCntrl: new CartController(),
};
