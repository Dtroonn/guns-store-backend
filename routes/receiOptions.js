const { Router } = require('express');

const { ReceiOptionCntrl } = require('../controllers');
const { createReceiOptionValidator } = require('../utils/validators/receiOption');
const { parallelValidate } = require('../middleware');

const router = Router();

router.get('/', ReceiOptionCntrl.get);

router.post('/', parallelValidate(createReceiOptionValidator), ReceiOptionCntrl.create);

module.exports = router;
