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
const { parallelValidate } = require('../middleware');

const router = Router();

router.get('/me', user, AuthCntrl.checkAuth);

router.post('/register', parallelValidate(registerValidator), AuthCntrl.register);

router.post('/login', parallelValidate(loginValidator), AuthCntrl.login);

router.delete('/login', AuthCntrl.logout);

router.post(
    '/emailConfirmation',
    parallelValidate(sendConfirmationEmailValidator),
    AuthCntrl.sendConfirmationEmail,
);
router.post('/emailConfirmation/:token', AuthCntrl.confirmEmail);

router.post('/resetPassword', parallelValidate(resetPasswordValidator), AuthCntrl.resetPassword);
router.get('/resetPassword/:token', AuthCntrl.checkPasswordResetToken);
router.post('/resetPassword/:token', parallelValidate(setPasswordValidator), AuthCntrl.setPassword);

module.exports = router;
