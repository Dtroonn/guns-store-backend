const { Router } = require('express');

const { AuthCntrl } = require('../controllers');
const { user } = require('../middleware');
const {
    registerValidator,
    loginValidator,
    resetPasswordValidator,
    setPasswordValidator,
    sendConfirmationEmailValidator,
} = require('../utils/validators/auth');

const router = Router();

router.get('/me', user, AuthCntrl.checkAuth);

router.post('/register', registerValidator, AuthCntrl.register);

router.post('/login', loginValidator, AuthCntrl.login);

router.delete('/login', AuthCntrl.logout);

router.post('/emailConfirmation', sendConfirmationEmailValidator, AuthCntrl.sendConfirmationEmail);
router.post('/emailConfirmation/:token', AuthCntrl.confirmEmail);

router.post('/resetPassword', resetPasswordValidator, AuthCntrl.resetPassword);
router.get('/resetPassword/:token', AuthCntrl.checkPasswordResetToken);
router.post('/resetPassword/:token', setPasswordValidator, AuthCntrl.setPassword);

module.exports = router;
