import React from "react";
import { Button } from "react-bootstrap";

function WeatherButton({ cities, setCity, getCurrentLocation }) {
  return (
    <div className="locationButton">
      <Button
        className="cityButton"
        variant="warning"
        onClick={() => {
          getCurrentLocation();
        }}
      >
        Current Location
      </Button>
      {cities.map((item, index) => {
        return (
          <div>
            <Button
              className="cityButton"
              variant="warning"
              key={index}
              onClick={() => setCity(item)}
            >
              {item}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default WeatherButton;
