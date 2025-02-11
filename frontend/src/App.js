import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/weather')
      .then(response => setWeatherData(response.data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Weather Information</h1>
      <div className="weather-container">
        {weatherData.map((weather, index) => (
          <WeatherCard key={index} weather={weather} />
        ))}
      </div>
    </div>
  );
}

export default App;
