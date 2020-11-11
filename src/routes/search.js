const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.js');
const authenticateJWT = require('../middleware/auth');

router.get('/lawyers', authenticateJWT, searchController.filterLawyers);

router.get('/filters', authenticateJWT, searchController.getFilters);

module.exports = router;
