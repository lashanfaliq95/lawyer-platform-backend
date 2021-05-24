const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.js');
const wrap = require('../helper/errorHelper');

router.get('/lawyers', wrap(searchController.filterLawyers));

router.get('/suggestions', wrap(searchController.getSuggestions));

router.get('/suggestions/locations', wrap(searchController.getPlaces));

module.exports = router;
