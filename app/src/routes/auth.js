const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');
const wrap = require('../helper/errorHelper');

router.post('/login', wrap(authController.login));

router.post('/forgot', wrap(authController.forgot));

router.get('/reset-token/:token', wrap(authController.getResetToken));

router.post('/confirmation-token/', wrap(authController.getConfirmationToken));

router.post('/reset-password', wrap(authController.resetUserPassword));

router.post('/token', wrap(authController.token));

router.post('/logout', wrap(authController.logout));

module.exports = router;
