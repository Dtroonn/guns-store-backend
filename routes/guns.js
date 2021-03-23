const { Router } = require('express');
const { body } = require('express-validator');

const { GunCntrl } = require('../controllers');
const { createGunValidator } = require('../utils/validators/gun');

const router = Router();

router.get('/', require('../middleware/favorites'), GunCntrl.getGuns);

router.post('/', createGunValidator, GunCntrl.createGun);

module.exports = router;
