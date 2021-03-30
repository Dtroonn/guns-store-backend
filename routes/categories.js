const { Router } = require('express');

const { CategoryCntrl } = require('../controllers');
const { createCategoryValidator } = require('../utils/validators/category');
const { parallelValidate } = require('../middleware');

const router = Router();

router.get('/', CategoryCntrl.get);

router.post('/', parallelValidate(createCategoryValidator), CategoryCntrl.create);

module.exports = router;
