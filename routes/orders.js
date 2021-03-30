const { Router } = require('express');

const { OrderCntrl } = require('../controllers');
const { cart, user, parallelValidate } = require('../middleware');
const { createOrderValidator } = require('../utils/validators/order');

const router = Router();

router.get('/', user, OrderCntrl.get);

router.post('/', parallelValidate(createOrderValidator), cart, OrderCntrl.create);

module.exports = router;
