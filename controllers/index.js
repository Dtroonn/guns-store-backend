const ProductController = require('./ProductController');
const CategoryController = require('./CategoryController');
const AuthController = require('./AuthController');
const FavoritesController = require('./FavoritesController');
const CartController = require('./CartController');
const OrderController = require('./OrderController');
const ReceiOptionController = require('./ReceiOptionController');
const PayOptionController = require('./PayOptionController');
const TypeController = require('./TypeController');
const KindController = require('./KindController');
const FilterController = require('./FilterController');

module.exports = {
    ProductCntrl: new ProductController(),
    CategoryCntrl: new CategoryController(),
    AuthCntrl: new AuthController(),
    FavoritesCntrl: new FavoritesController(),
    CartCntrl: new CartController(),
    OrderCntrl: new OrderController(),
    ReceiOptionCntrl: new ReceiOptionController(),
    PayOptionCntrl: new PayOptionController(),
    TypeCntrl: new TypeController(),
    FilterCntrl: new FilterController(),
    KindCntrl: new KindController(),
};
