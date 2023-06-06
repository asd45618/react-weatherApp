import React from "react";

const WeatherBox = ({ weather }) => {
  console.log(weather);
  let celsius = Math.floor((weather.main?.temp * 9) / 5 + 32);
  return (
    <div className="weatherBox">
      <h3>{weather?.name}</h3>
      <h2>
        {weather.main?.temp}°C / {celsius}°F
      </h2>
      <h3>{weather && weather.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
