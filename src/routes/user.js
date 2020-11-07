const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js');

router.post('/', userController.createUser);

router.get('/lawyers', userController.getLawyers);

module.exports = router;
