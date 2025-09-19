const axios = require('axios');

const BASE = 'https://newsapi.org/v2';
const API_KEY = process.env.NEWSAPI_KEY || '';

const client = axios.create({
  baseURL: BASE,
  headers: API_KEY ? { 'X-Api-Key': API_KEY } : {}
});

async function doGet(path, params = {}) {
  if (!API_KEY) {
    throw new Error('NEWSAPI_KEY no está definida. Añádela en .env');
  }
  const resp = await client.get(path, { params });
  return resp.data;
}

module.exports = {
  fetchSources: (params) => doGet('/sources', params),
  fetchHeadlines: (params) => doGet('/top-headlines', params),
  fetchEverything: (params) => doGet('/everything', params)
};
