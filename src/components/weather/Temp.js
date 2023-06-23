import React, { useEffect, useState } from "react";
import "./styles.css";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("lahore");

  const [tempInfo, setTempInfo] = useState({});

  // when you rehresh the page, the function should be called automatically -> in that case, we will use the useEffect hook
  const getWeatherInfo = async () => {
    try {
      let url = `API-KEY`;

      // fetch will return a promise, so we'll need to write the keyword await
      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <WeatherCard {...tempInfo} />
    </>
  );
};

export default Temp;
