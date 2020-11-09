const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js');

router.post('/', userController.createUser);

router.get('/lawyers', userController.getLawyers);

router.get('/lawyers/availability/:id', userController.getLawyerAvailability);

module.exports = router;
