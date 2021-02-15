const { Router } = require('express');

const { AuthCntrl }  = require('../controllers');
const { 
    registerValidator,
    loginValidator,
    resetPasswordValidator,
    setPasswordValidator
    } = require('../utils/validators/auth');

const router = Router();

router.get('/me', AuthCntrl.checkAuth);

router.post('/register', registerValidator, AuthCntrl.register);

router.post('/login', loginValidator, AuthCntrl.login);

router.delete('/login', AuthCntrl.logout); 

router.post('/emailConfirmation/:token', AuthCntrl.confirmEmail);

router.post('/resetPassword', resetPasswordValidator, AuthCntrl.resetPassword)
router.get('/resetPassword/:token', AuthCntrl.checkPasswordResetToken);
router.post('/resetPassword/:token', setPasswordValidator, AuthCntrl.setPassword);





module.exports = router;