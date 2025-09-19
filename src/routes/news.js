const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// GET /api/sources - Get news sources
// Query parameters: category, language, country
router.get('/sources', newsController.getSources);

// GET /api/headlines - Get top headlines
// Query parameters: country, category, sources, q, pageSize, page
router.get('/headlines', newsController.getHeadlines);

// GET /api/news - Get everything (news search)
// Query parameters: q, qInTitle, sources, domains, excludeDomains, from, to, language, sortBy, pageSize, page
router.get('/news', newsController.getEverything);

module.exports = router;
