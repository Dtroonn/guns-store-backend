const { Router } = require('express');

const { PayOptionCntrl } = require('../controllers');
const { createPayOptionValidator } = require('../utils/validators/payOption');
const { parallelValidate } = require('../middleware');

const router = Router();

router.get('/', PayOptionCntrl.get);

router.post('/', parallelValidate(createPayOptionValidator), PayOptionCntrl.create);

module.exports = router;
