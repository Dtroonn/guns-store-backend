const { Router } = require('express');

const { CartCntrl } = require('../controllers');
const cart = require('../middleware/cart');

const router = Router();

router.get('/', cart, CartCntrl.get);

router.post('/:id', CartCntrl.add);

router.delete('/:id', CartCntrl.remove);

module.exports = router;
