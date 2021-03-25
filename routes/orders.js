const { Router } = require('express');

const { OrderCntrl } = require('../controllers');
const { cart, user } = require('../middleware');
const { createOrderValidator } = require('../utils/validators/order');

const router = Router();

router.get('/', user, OrderCntrl.get);

router.post('/', cart, createOrderValidator, OrderCntrl.create);

module.exports = router;
