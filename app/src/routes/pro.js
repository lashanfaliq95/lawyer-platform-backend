const express = require('express');
const router = express.Router();
const proController = require('../controllers/pro.js');
const wrap = require('../helper/errorHelper');

router.get('/tutorial-slots', wrap(proController.getTutorialAvailability));

module.exports = router;
