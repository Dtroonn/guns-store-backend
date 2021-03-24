const { Router } = require('express');

const { CartCntrl } = require('../controllers');

const router = Router();

router.get('/', CartCntrl.get);

router.post('/:id', CartCntrl.add);

router.delete('/:id', CartCntrl.remove);

module.exports = router;
