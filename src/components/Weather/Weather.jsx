import React, { useEffect, useState } from "react";
import style from "./Weather.module.css";

const Weather = () => {
  const [weatherInfo, setWeatherInfo] = useState("");
  // const lat = 40.4093;
  // const lon = 49.8671;
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  const apiKey = "37438f19a27580d13b4759197f32e380";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLat(latitude);
        setLon(longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    if (lat && lon) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      fetch(apiUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("There is an error");
          }
        })
        .then((data) => {
          console.log(data);
          setWeatherInfo(data);
        })
        .catch((error) => console.error(error));
    }
  }, [lat, lon]);

  return (
    <div className={style.weatherinfo}>
      {weatherInfo && (
        <div className={style.App_header}>
          <img
            src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
            alt="cloudy"
          />
          <h1>
            Welcome to {weatherInfo.name} ({weatherInfo.sys.country})
          </h1>
          <h3>
            The weather in {weatherInfo.name} is{" "}
            <span>{weatherInfo.weather[0].description}.</span> There are more
            info 👇🏻
          </h3>
          <div className={style.weatherInformation}>
            <p>
              <span>Tepmerature:</span>{" "}
              {Math.trunc(weatherInfo.main.temp - 273)} °C
            </p>
            <p>
              <span>Humidity:</span> {weatherInfo.main.humidity} %
            </p>
            <p>
              <span>Pressure:</span> {weatherInfo.main.pressure} Pa
            </p>
            <p>
              <span>Deg of wind:</span> {weatherInfo.wind.deg} °
            </p>
            <p>
              <span>Speed of wind:</span> {weatherInfo.wind.speed} km/h
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
