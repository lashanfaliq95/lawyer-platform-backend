const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.js');

router.get('/lawyers', searchController.filterLawyers);

router.get('/filters', searchController.getFilters);

module.exports = router;
