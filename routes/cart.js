const { Router } = require('express');

const { CartCntrl } = require('../controllers');
const { cart, parallelValidate } = require('../middleware');
const { addToCartValidator, removeFromCartValidator } = require('../utils/validators/cart');

const router = Router();

router.get('/', cart, CartCntrl.get);

router.post('/:id', parallelValidate(addToCartValidator, 400), CartCntrl.add);

router.delete('/:id', parallelValidate(removeFromCartValidator, 400), CartCntrl.remove);

router.delete('/', CartCntrl.clear);

module.exports = router;
