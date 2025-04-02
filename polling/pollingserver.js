const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Dynamic Weather API URL
const BASE_API_URL = 'https://api.open-meteo.com/v1/forecast';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/poll_example', async (req, res) => {
  const lat = req.query.lat || 12.9585; 
  const long = req.query.long || 78.2710;  
 const timestamp = req.query._ || Date.now();
  
  try {
    const response = await axios.get(`${BASE_API_URL}?latitude=${lat}&longitude=${long}&current_weather=true`);
    const data = response.data.current_weather;
    if (!data) {
      throw new Error('Weather data unavailable');
    }
    const weatherData = {
      time: new Date().toLocaleTimeString(),
      temperature: data.temperature,
      humidity: data.relative_humidity || 'N/A',
      windSpeed: data.windspeed || 'N/A',
    };
res.set({
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache'
}); 
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
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
