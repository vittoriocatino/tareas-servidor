const newsService = require('../services/newsapiService');

// Get news sources
const getSources = async (req, res) => {
  try {
    const { category, language, country } = req.query;
    
    const params = {};
    if (category) params.category = category;
    if (language) params.language = language;
    if (country) params.country = country;

    const data = await newsService.fetchSources(params);
    
    res.json({
      success: true,
      totalResults: data.sources?.length || 0,
      sources: data.sources || []
    });
  } catch (error) {
    console.error('Error fetching sources:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news sources',
      message: error.message
    });
  }
};

// Get top headlines
const getHeadlines = async (req, res) => {
  try {
    const { 
      country, 
      category, 
      sources, 
      q, 
      pageSize, 
      page 
    } = req.query;
    
    const params = {};
    if (country) params.country = country;
    if (category) params.category = category;
    if (sources) params.sources = sources;
    if (q) params.q = q;
    if (pageSize) params.pageSize = parseInt(pageSize);
    if (page) params.page = parseInt(page);

    const data = await newsService.fetchHeadlines(params);
    
    res.json({
      success: true,
      totalResults: data.totalResults || 0,
      articles: data.articles || []
    });
  } catch (error) {
    console.error('Error fetching headlines:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch top headlines',
      message: error.message
    });
  }
};

// Get everything (news search)
const getEverything = async (req, res) => {
  try {
    const { 
      q, 
      qInTitle, 
      sources, 
      domains, 
      excludeDomains, 
      from, 
      to, 
      language, 
      sortBy, 
      pageSize, 
      page 
    } = req.query;
    
    // Query parameter is required for everything endpoint
    if (!q && !qInTitle && !sources && !domains) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Required parameters are missing. Please set any of the following parameters and try again: q, qInTitle, sources, domains.'
      });
    }

    const params = {};
    if (q) params.q = q;
    if (qInTitle) params.qInTitle = qInTitle;
    if (sources) params.sources = sources;
    if (domains) params.domains = domains;
    if (excludeDomains) params.excludeDomains = excludeDomains;
    if (from) params.from = from;
    if (to) params.to = to;
    if (language) params.language = language;
    if (sortBy) params.sortBy = sortBy;
    if (pageSize) params.pageSize = parseInt(pageSize);
    if (page) params.page = parseInt(page);

    const data = await newsService.fetchEverything(params);
    
    res.json({
      success: true,
      totalResults: data.totalResults || 0,
      articles: data.articles || []
    });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
      message: error.message
    });
  }
};

module.exports = {
  getSources,
  getHeadlines,
  getEverything
};
