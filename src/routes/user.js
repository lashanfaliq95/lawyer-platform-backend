const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js');

router.post('/', userController.register);

router.post('/lawyers', () => {});

module.exports = router;
