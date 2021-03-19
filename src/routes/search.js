const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.js');

router.get('/lawyers', searchController.filterLawyers);

router.get('/filters', searchController.getFilters);

router.get('/suggestions', searchController.getSuggestions);

router.get('/suggestions/locations', searchController.getPlaces);

module.exports = router;
