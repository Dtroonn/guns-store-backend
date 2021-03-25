const { Router } = require('express');

const { PayOptionCntrl } = require('../controllers');
const { createPayOptionValidator } = require('../utils/validators/PayOption');

const router = Router();

router.get('/', PayOptionCntrl.get);

router.post('/', createPayOptionValidator, PayOptionCntrl.create);

module.exports = router;
