import React, { useRef } from "react";
import "../Components/Weather.css";
import axios from "axios";
import { useEffect, useState } from "react";
import clear_icon from "../assets/clear-weather.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setweatherData] = useState(false);

  const allIcons = {
    "01d": " https://openweathermap.org/img/wn/01d@2x.png",
    "01n": "https://openweathermap.org/img/wn/01n@2x.png",
    "02d": "https://openweathermap.org/img/wn/02d@2x.png",
    "02n": "https://openweathermap.org/img/wn/02n@2x.png",
    "03d": "https://openweathermap.org/img/wn/03d@2x.png",
    "03n": "https://openweathermap.org/img/wn/03n@2x.png",
    "04d": "https://openweathermap.org/img/wn/04d@2x.png",
    "04n": "https://openweathermap.org/img/wn/04n@2x.png",
    "09d": "https://openweathermap.org/img/wn/01d@2x.png",
    "09n": "https://openweathermap.org/img/wn/09n@2x.png",
    "10d": "https://openweathermap.org/img/wn/10d@2x.png",
    "10n": "https://openweathermap.org/img/wn/10n@2x.png",
    "11d": "https://openweathermap.org/img/wn/11d@2x.png",
    "11n": "https://openweathermap.org/img/wn/11n@2x.png",
    "13d": "https://openweathermap.org/img/wn/13d@2x.png",
    "13n": "https://openweathermap.org/img/wn/13n@2x.png",
    "50d": "https://openweathermap.org/img/wn/50d@2x.png",
    "50n": "https://openweathermap.org/img/wn/50n@2x.png",
  };
  const search = (city) => {
    if (city === "") {
      alert("input field cannot be empty");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
      import.meta.env.VITE_APP_ID
    }`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        const icon = allIcons[response.data.weather[0].icon] || clear_icon;
        setweatherData({
          humidity: response.data.main.humidity,
          windspeed: response.data.wind.speed,
          temperature: Math.floor(response.data.main.temp),
          location: response.data.name,
          icon: icon,
        });
      })
      .catch((error) => {
        setweatherData(false);
        console.error("Fetching data error");
      });
  };
  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <i
          className="fa-solid fa-magnifying-glass"
          id="search-icon"
          onClick={() => search(inputRef.current.value)}
        ></i>
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <i className="fa-solid fa-water" id="data-img"></i>
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <i className="fa-solid fa-wind" id="data-img"></i>
              <div>
                <p>{weatherData.windspeed} km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
