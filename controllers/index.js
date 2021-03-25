const GunController = require('./GunController');
const CategoryController = require('./CategoryController');
const AuthController = require('./AuthController');
const FavoritesController = require('./FavoritesController');
const CartController = require('./CartController');
const OrderController = require('./OrderController');
const ReceiOptionController = require('./ReceiOptionController');
const PayOptionController = require('./PayOptionController');

module.exports = {
    GunCntrl: new GunController(),
    CategoryCntrl: new CategoryController(),
    AuthCntrl: new AuthController(),
    FavoritesCntrl: new FavoritesController(),
    CartCntrl: new CartController(),
    OrderCntrl: new OrderController(),
    ReceiOptionCntrl: new ReceiOptionController(),
    PayOptionCntrl: new PayOptionController(),
};
