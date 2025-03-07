const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Weather API URL
const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';

let startIndex = 0;
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
let requestCount = 0;
app.get('/poll_example', async (req, res) => {
  try {
   requestCount++;
    const response = await axios.get(API_URL);
    const data = response.data;

    if (!data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
      throw new Error('Invalid API response');
    }
     const randomIndex = Math.floor(Math.random() * data.hourly.time.length);

    const weatherData = {
      time: data.hourly.time[randomIndex],
      temperature: data.hourly.temperature_2m[randomIndex],
      humidity: data.hourly.relative_humidity_2m[randomIndex],
      windSpeed: data.hourly.wind_speed_10m[randomIndex],
    };
     res.send(`
      <span>
        <strong>Time:</strong> ${weatherData.time} <br>
        <strong>Temperature:</strong> ${weatherData.temperature}°C <br>
        <strong>Humidity:</strong> ${weatherData.humidity}% <br>
        <strong>Wind Speed:</strong> ${weatherData.windSpeed} km/h
      </span>
    `);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).send('Error fetching weather data');
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
