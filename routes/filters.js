const { Router } = require('express');

const { parallelValidate } = require('../middleware');
const { createFilterValidator, getFilterValidator } = require('../utils/validators/filter');
const { FilterCntrl } = require('../controllers');

const router = Router();

router.get('/:category?', parallelValidate(getFilterValidator, 400), FilterCntrl.get);

module.exports = router;
