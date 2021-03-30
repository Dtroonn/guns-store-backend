const { Router } = require('express');

const { FavoritesCntrl } = require('../controllers');
const { parallelValidate } = require('../middleware');
const { addRemoveFavoritesValidagor } = require('../utils/validators/favorites');

const router = Router();

router.post('/:id', parallelValidate(addRemoveFavoritesValidagor, 400), FavoritesCntrl.add);

router.get('/', require('../middleware/favorites'), FavoritesCntrl.get);

router.delete('/:id', parallelValidate(addRemoveFavoritesValidagor, 400), FavoritesCntrl.remove);

router.delete('/', FavoritesCntrl.clear);

module.exports = router;
