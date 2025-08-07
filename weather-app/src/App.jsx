
import React, { useState } from "react";
import "./App.css";

const apiKey = "b4135d766ee153196cdb4631ae4e0ab1";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeatherData = async () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      const res = await fetch(
        `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
      );
      const data = await res.json();

      if (!data.current) {
        alert("City not found");
        setWeather(null);
        return;
      }

      setWeather({
        temperature: data.current.temperature,
        description: data.current.weather_descriptions[0],
        location: `${data.location.name}, ${data.location.country}`,
        feelslike: data.current.feelslike,
        humidity: data.current.humidity,
        wind: data.current.wind_speed,
        icon: data.current.weather_icons[0],
        time: new Date().toLocaleString(),
      });
    } catch (error) {
      alert("Error fetching data");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") getWeatherData();
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={getWeatherData}>Get Weather</button>

      {weather && (
        <div className="card">
          <img src={weather.icon} alt="Weather icon" />
          <h2>{weather.location}</h2>
          <p>{weather.description}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Feels Like: {weather.feelslike}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.wind} m/s</p>
          <p>Time: {weather.time}</p>
        </div>
      )}
    </div>
  );
};

export default App;
