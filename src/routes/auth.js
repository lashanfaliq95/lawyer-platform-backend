const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

router.post('/login', authController.login);

router.post('/forgot', authController.forgot);

router.get('/reset-token/:token', authController.getResetToken);

router.post('/token', authController.token);

router.post('/logout', authController.logout);

module.exports = router;
