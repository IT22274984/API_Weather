import React from 'react';

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h3>{weather.city}</h3>
      <p>{weather.description}</p>
      <p>Temperature: {weather.temperature}°C</p>
    </div>
  );
}

export default WeatherCard;
