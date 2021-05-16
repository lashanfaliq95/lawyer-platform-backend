const express = require('express');
const router = express.Router();
const proController = require('../controllers/pro.js');

router.get('/tutorial-slots', proController.getTutorialAvailability);

module.exports = router;
