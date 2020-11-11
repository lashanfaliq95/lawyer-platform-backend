const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js');
const authenticateJWT = require('../middleware/auth');

router.post('/', authenticateJWT, userController.createUser);

router.get('/lawyers', authenticateJWT, userController.getLawyers);

router.get(
  '/lawyers/availability/:id',
  authenticateJWT,
  userController.getLawyerAvailability
);

module.exports = router;