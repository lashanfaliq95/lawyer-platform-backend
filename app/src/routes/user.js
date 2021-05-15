const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js');
const authenticateJWT = require('../middleware/auth');

router.post('/',  userController.createUser);

router.delete('/:id',  userController.deleteUser);

router.put('/:id',userController.updateUser);

router.put('/:id/password',userController.updateUserPassword);

router.post('/:id/message',userController.createUserMessage);

router.get(
  '/:id/appointments',
  userController.getUserAppointments
);

router.get('/lawyers', userController.getLawyers);

router.get('/lawyers/:id', userController.getLawyer);

router.get(
  '/lawyers/:id/availability',
  userController.getLawyerAvailability
);

router.get(
  '/lawyers/:id/appointments',
  userController.getLawyerAppointments
);

module.exports = router;
