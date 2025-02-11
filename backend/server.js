const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express(); // You missed initializing this
const weatherCache = new NodeCache({ stdTTL: 300 }); // 5-minute cache
const PORT = process.env.PORT || 5000;
const WEATHER_API = "https://api.openweathermap.org/data/2.5/group";

app.use(cors());
app.use(express.json());

const cityCodes = ['524901', '703448', '2643743']; // Add more city codes if needed

app.get('/api/weather', async (req, res) => {
  const cachedData = weatherCache.get('weatherData');

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(WEATHER_API, {
      params: {
        id: cityCodes.join(','),
        units: 'metric',
        appid: process.env.OPENWEATHER_API_KEY,
      },
    });

    const weatherData = response.data.list.map(city => ({
      city: city.name,
      description: city.weather[0].description,
      temperature: city.main.temp,
    }));

    weatherCache.set('weatherData', weatherData);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
