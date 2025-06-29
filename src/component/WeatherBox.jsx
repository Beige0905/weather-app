import React from "react";

const WeatherBox = ({ weather }) => {
  if (!weather) {
    return <div className="weather-box" style={{ minHeight: "380px" }}></div>;
  }
  if (weather.cod !== 200) {
    return (
      <div className="weather-box">
        <h2>Please</h2>
        <h2>check your</h2>
        <h2>location</h2>
      </div>
    );
  }
  const temp = weather.main?.temp;
  const locationName = weather.name;
  const weatherDescription = weather.weather?.[0].description;
  const icon = weather.weather?.[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <div className="weather-box">
      <h2 className="location-name">{locationName}</h2>
      <img src={iconUrl} alt={weatherDescription} className="weather-icon" />
      <h1 className="temperature">{temp ? `${Math.round(temp)}°C` : ""}</h1>
      <h3 className="weather-description">{weatherDescription || ""}</h3>
    </div>
  );
};

export default WeatherBox;
