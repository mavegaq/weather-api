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

    return (
      <div className={`App ${darkMode ? "dark" : "light"}`}>
        <div className="content-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={searchByCity} className={`search-button ${darkMode ? "dark" : "light"}`}> Buscar </button>
  
          <div className={`card ${darkMode ? "dark" : "light"}`}>
            <h1>{data.name}</h1>
            {data.sys && <p>País: {data.sys.country}</p>}
            {data.weather && (
              <>
                <p>{data.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
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
          </div>
  
          <button onClick={toggleTemperatureUnit} className={`toggle-temp-button ${darkMode ? "dark" : "light"}`}>
            Cambiar a {displayFahrenheit ? "Celsius" : "Fahrenheit"}
          </button>
          
          <button onClick={toggleDarkMode} className={`toggle-mode-button ${darkMode ? "dark" : "light"}`}>
            Cambiar a {darkMode ? "Modo claro" : "Modo oscuro"}
          </button>
        </div>
      </div>
    );
  }
  

export default App;