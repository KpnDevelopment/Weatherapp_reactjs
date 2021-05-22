import React, { useState } from "react";
import { fetchWeather } from "../api/fetchWeather";
import "./Weather.css";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Badge,
  Card,
  Form,
  InputGroup,
} from "react-bootstrap";

function Weather() {
  const [query, setQuery] = useState("california");
  const [weather, setWeather] = useState({});
  const [wc, setWc] = useState(true); //umount and mount state wc=WeatherCard
  useEffect(() => {
    fetchWeather(localStorage.setItem("wetherlocation") || query)
      .then((result) => {
        setWeather(result);
      })
      .catch(console.log);
  });
  const search = async (e) => {
    if (e.key === "Enter") {
      localStorage.setItem("wetherlocation", query);
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery("");
      setWc(!wc); //umount the weatherCard
    }
  };

  return (
    <div className="Weather">
      <Card className="main-container">
        <Row>
          <InputGroup size="sm">
            <Form.Control
              type="text"
              className="search"
              placeholder="Search.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={search}
            />
          </InputGroup>
        </Row>
        {/* mount umount the card */}
        {wc && (
          <Card
            className="card"
            style={{
              width: "40rem",
            }}
          >
            <Card.Body className="card-body">
              {weather.main && (
                <div className="city">
                  <h2 className="city-name">
                    <span>{weather.name}</span>
                    <Badge className="country" variant="warning">
                      {weather.sys.country}
                    </Badge>
                  </h2>
                  <div className="city-temp" style={{ fontSize: "10rem" }}>
                    <span className="temp">
                      {Math.round(weather.main.temp)}
                    </span>
                    <Badge style={{ color: "red", fontSize: "2rem" }}>
                      &deg;C
                    </Badge>
                    <div className="more-temp">
                      <h3>
                        max:
                        {Math.round(weather.main.temp_max)}
                        <Badge
                          style={{ background: "none", color: "blue" }}
                          variant="secondary"
                        >
                          &deg;C
                        </Badge>
                      </h3>
                      <h3>
                        min:
                        {Math.round(weather.main.temp_min)}
                        <Badge
                          style={{ background: "none", color: "blue" }}
                          variant="secondary"
                        >
                          &deg;C
                        </Badge>
                      </h3>
                    </div>
                    <div className="sun">
                      <h4>
                        Sunrise <br />{" "}
                        {new Date(
                          weather.sys.sunrise * 1000
                        ).toLocaleTimeString("en-IN")}
                      </h4>
                      <h4>
                        Sunset <br />{" "}
                        {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                          "en-IN"
                        )}
                      </h4>
                    </div>

                    <h5>{moment().format("dddd")}</h5>
                    <h5>{moment().format("LL")}</h5>
                  </div>
                  <div className="info">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      className="city-icon"
                    />
                    <h6>{weather.weather[0].description}</h6>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        )}
      </Card>
    </div>
  );
}

export default Weather;
