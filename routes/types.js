const { Router } = require('express');

const { TypeCntrl } = require('../controllers');
const { parallelValidate } = require('../middleware');
const { createFilterValidator } = require('../utils/validators/filter');

const router = Router();

router.post('/', parallelValidate(createFilterValidator), TypeCntrl.create);

module.exports = router;
