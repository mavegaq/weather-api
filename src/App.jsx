import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [displayFahrenheit, setDisplayFahrenheit] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "cf332887912bdddc4ce177391b3180b7";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la información del clima:", error);
        });
    });
  }, []);

  const searchByCity = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la información del clima:", error);
      });
  };

  const kelvinToCelsius = (temp) => {
    return temp - 273.15;
  };

  const kelvinToFahrenheit = (temp) => {
    return (temp - 273.15) * (9 / 5) + 32;
  };

  const toggleTemperatureUnit = () => {
    setDisplayFahrenheit((prevState) => !prevState);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const getWeatherImage = (description, defaultIcon) => {
    switch (description) {
      case "clear sky":
        return "1.svg";
      case "few clouds":
        return "2.svg";
      case "scattered clouds":
        return "3.svg";
      case "broken clouds":
        return "4.svg";
      case "shower rain":
        return "5.svg";
      case "rain":
        return "6.svg";
      case "thunderstorm":
        return "7.svg";
      case "snow":
        return "8.svg";
      case "mist":
        return "9.svg";
      default:
        return `http://openweathermap.org/img/wn/${defaultIcon}@2x.png`;
    }
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <div className="switch-wrapper">
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleDarkMode}
            checked={darkMode}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className={`card ${darkMode ? "dark" : "light"}`}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={searchByCity} className={`search-button ${darkMode ? "dark" : "light"}`}> Buscar </button>
  
        <h1>{data.name}</h1>
        {data.sys && <p>País: {data.sys.country}</p>}
        {data.weather && (
           <>
           <p>{data.weather[0].description}</p>
           <img
             src={getWeatherImage(
               data.weather[0].description,
               data.weather[0].icon
             )}
             alt={data.weather[0].description}
           />
         </>
        )}
        {data.main && (
          <p>
            Temperatura:{" "}
            {displayFahrenheit
              ? kelvinToFahrenheit(data.main.temp).toFixed(1)
              : kelvinToCelsius(data.main.temp).toFixed(1)}
            °{displayFahrenheit ? "F" : "C"}
          </p>
        )}
  
        <button onClick={toggleTemperatureUnit} className={`toggle-temp-button ${darkMode ? "dark" : "light"}`}>
          Cambiar a {displayFahrenheit ? "Celsius" : "Fahrenheit"}
        </button>
      </div>
    </div>
  );
  
}
export default App;

