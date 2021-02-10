const { Router } = require('express');

const {CategoryCntrl} = require('../controllers');

const router = Router();

router.get('/', CategoryCntrl.getCategories);

router.post('/', CategoryCntrl.createCategory);


module.exports = router;