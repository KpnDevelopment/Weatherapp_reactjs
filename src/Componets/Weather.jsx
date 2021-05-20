import React, { useState } from "react";
import { fetchWeather } from "../api/fetchWeather";
import "./Weather.css";
import moment from "moment";

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container ">
      <input
        type="text"
        className="search"
        placeholder="Search.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city" style={{ width: "18rem" }}>
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
            <div className="more-temp">
              <h6>
                max:
                {Math.round(weather.main.temp_max)}
                <sup>&deg;C</sup>
              </h6>
              <h6>
                min:
                {Math.round(weather.main.temp_min)}
                <sup>&deg;C</sup>
              </h6>
            </div>
            <p>
              Sunrise:{" "}
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("en-IN")}
            </p>
            <p>
              Sunset:{" "}
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString("en-IN")}
            </p>
            <p>Day: {moment().format("dddd")}</p>
            <p>Date: {moment().format("LL")}</p>
          </div>
          <div className="info">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="city-icon"
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
