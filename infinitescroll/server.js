const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const port = 3000;

// API URL
const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Weather route
app.get('/weather', async (req, res) => {
  const start = parseInt(req.query.start) || 0; // Default start index
  const limit = parseInt(req.query.limit) || 10; // Default batch size

  try {
    console.log(`Request received with start=${start}, limit=${limit}`);
    console.log(`Slicing data from index ${start} to ${start + limit}`);

    res.set('Cache-Control', 'no-store');
    const response = await axios.get(API_URL);
    const data = response.data;

    // Validate API response
    if (!data.hourly || !data.hourly.time) {
      throw new Error('Invalid API response');
    }

    // Slice data for infinite scrolling
    let html = '';
    for (let i = start; i < start + limit; i++) {
      if (i < data.hourly.time.length) {
        const isLastRow = i === start + limit - 1;
        html += `
          <tr ${isLastRow ? `ic-append-from='/weather?start=${start + limit}&limit=${limit}' ic-trigger-on='scrolled-into-view' ic-target='#weatherTableBody' ic-indicator='#indicator'` : ''}>
            <td>${data.hourly.time[i]}</td>
            <td>${data.hourly.temperature_2m[i]}</td>
            <td>${data.hourly.relative_humidity_2m[i]}</td>
            <td>${data.hourly.wind_speed_10m[i]}</td>
          </tr>
        `;
      }
    }

    res.send(html);
  } catch (error) {
    console.error('Error fetching weather data:', error.message, error.stack);
    res.status(500).send('Error fetching weather data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
