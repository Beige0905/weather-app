import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, selectedCity, setSelectedCity }) => {
  return (
    <div className="mt-3">
      <Button
        variant={selectedCity === null ? "warning" : "light"}
        className="m-2"
        onClick={() => setSelectedCity(null)}
      >
        Current Location
      </Button>
      {cities.map((city, index) => (
        <Button
          key={index}
          variant={selectedCity === city ? "warning" : "light"}
          className="m-2"
          onClick={() => setSelectedCity(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
