import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidity from "../assets/humidity.png";

function Weather() {
  const [weatherData, setWeatherData] = useState(false);

  const inputRef = useRef();
  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": rainIcon,
    "13n": rainIcon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon];
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
      console.log(data);
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("London");
  }, []);
  return (
    <div className="weather">
      <div className="searchbar">
        <input type="text" placeholder="search" className="" ref={inputRef} />
        <img
          src={searchIcon}
          alt=""
          onClick={() => {
            search(inputRef.current.value);
          }}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="WeatherIcon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weatherData">
            <div className="col">
              <img src={windIcon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
            <div className="col">
              <img src={humidity} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Weather;
