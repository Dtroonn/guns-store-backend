const { Router } = require('express');

const { FavoritesCntrl } = require('../controllers');

const router = Router();

router.post('/:id', FavoritesCntrl.add);

router.get('/', require('../middleware/favorites'), FavoritesCntrl.get);

router.delete('/:id', FavoritesCntrl.remove);

router.delete('/', FavoritesCntrl.clear);

module.exports = router;
