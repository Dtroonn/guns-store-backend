const { Router } = require('express');

const { KindCntrl } = require('../controllers');
const { parallelValidate } = require('../middleware');
const { createFilterValidator } = require('../utils/validators/filter');

const router = Router();

router.post('/', parallelValidate(createFilterValidator), KindCntrl.create);

module.exports = router;
