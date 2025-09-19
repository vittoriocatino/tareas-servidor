require('dotenv').config();
const express = require('express');
const newsRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', newsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'News API - Tarea 1',
    version: '1.0.0',
    endpoints: {
      sources: '/api/sources',
      headlines: '/api/headlines',
      news: '/api/news'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📰 News API endpoints available at:`);
  console.log(`   - Sources: http://localhost:${PORT}/api/sources`);
  console.log(`   - Headlines: http://localhost:${PORT}/api/headlines`);
  console.log(`   - News: http://localhost:${PORT}/api/news`);
});

module.exports = app;
