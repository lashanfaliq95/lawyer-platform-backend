const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js');
const authenticateJWT = require('../middleware/auth');
const wrap = require('../helper/errorHelper');

router.post('/', wrap(userController.createUser));

router.delete('/:id', wrap(userController.deleteUser));

router.put('/:id', wrap(userController.updateUser));

router.put('/:id/password', wrap(userController.updateUserPassword));

router.post('/:id/message', wrap(userController.createUserMessage));

router.get('/:id/appointments', wrap(userController.getUserAppointments));

router.post('/lawyers', wrap(userController.createLawyer));

router.get('/lawyers', wrap(userController.getLawyers));

router.get('/lawyers/:id', wrap(userController.getLawyer));

router.get(
  '/lawyers/:id/availability',
  wrap(userController.getLawyerAvailability)
);

router.get(
  '/lawyers/:id/appointments',
  wrap(userController.getLawyerAppointments)
);

module.exports = router;
