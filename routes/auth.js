const { Router } = require('express');

const { AuthCntrl }  = require('../controllers');
const { registerValidator, loginValidator } = require('../utils/validators/auth');

const router = Router();

router.get('/me', AuthCntrl.checkAuth);

router.post('/register', registerValidator, AuthCntrl.register);

router.post('/login', loginValidator, AuthCntrl.login);

router.delete('/login', AuthCntrl.logout); 

router.post('/emailConfirmation/:token', AuthCntrl.confirmEmail);





module.exports = router;