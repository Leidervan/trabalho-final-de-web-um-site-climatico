import React, { useState } from 'react';
import './App.css'; // Verifique se o caminho está correto

const WeatherApp = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cityName) {
      setWeatherData(null);
      setAlertMessage('Você precisa digitar uma cidade para assim receber os dados meteorológicos');
      return;
    }

    const apiKey = '8e310cdc1c7acec9e4bede0324722901';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      cityName
    )}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
      const results = await fetch(apiUrl);
      const json = await results.json();

      if (json.cod === 200) {
        const data = {
          city: json.name,
          country: json.sys.country,
          temp: json.main.temp,
          tempMax: json.main.temp_max,
          tempMin: json.main.temp_min,
          description: json.weather[0].description,
          tempIcon: json.weather[0].icon,
          windSpeed: json.wind.speed,
          humidity: json.main.humidity,
        };
        setWeatherData(data);
        setAlertMessage('');
      } else {
        setWeatherData(null);
        setAlertMessage(" Erro ao efetuar a busca, por favor tente novamente ");
      }
    } catch (error) {
      setWeatherData(null);
      setAlertMessage('Erro ao buscar os dados');
    }
  };

  return (
    <div id="container">
      <form id="search" onSubmit={handleSubmit}>
        <i className="fa-solid fa-location-dot"></i>
        <input
          type="search"
          name="city_name"
          id="city_name"
          placeholder="Buscar cidade"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      <div id="weather" className={weatherData ? 'show' : ''}>
        {weatherData && (
          <>
            <h1 id="title">{`${weatherData.city}, ${weatherData.country}`}</h1>
            <div id="infos">
              <div id="temp">
                <img
                  id="temp_img"
                  src={`https://openweathermap.org/img/wn/${weatherData.tempIcon}@2x.png`}
                  alt="Weather Icon"
                />
                <div>
                  <p id="temp_value">
                    {`${weatherData.temp.toFixed(1)
                      .toString()
                      .replace('.', ',')}`}{' '}
                    <sup>C°</sup>
                  </p>
                  <p id="temp_description">{weatherData.description}</p>
                </div>
              </div>
              <div id="other_infos">
                <div className="info">
                  <i id="temp_max_icon" className="fa-solid fa-temperature-high"></i>
                  <div>
                    <h2>Temp. max</h2>
                    <p id="temp_max">
                      {`${weatherData.tempMax.toFixed(1)
                        .toString()
                        .replace('.', ',')}`}{' '}
                      <sup>C°</sup>
                    </p>
                  </div>
                </div>
                <div className="info">
                  <i id="temp_min_icon" className="fa-solid fa-temperature-low"></i>
                  <div>
                    <h2>Temp. min</h2>
                    <p id="temp_min">
                      {`${weatherData.tempMin.toFixed(1)
                        .toString()
                        .replace('.', ',')}`}{' '}
                      <sup>C°</sup>
                    </p>
                  </div>
                </div>
                <div className="info">
                  <i id="humidity_icon" className="fa-solid fa-droplet"></i>
                  <div>
                    <h2>Umidade</h2>
                    <p id="humidity">{`${weatherData.humidity}%`}</p>
                  </div>
                </div>
                <div className="info">
                  <i id="wind_icon" className="fa-solid fa-wind"></i>
                  <div>
                    <h2>Vento</h2>
                    <p id="wind">{`${weatherData.windSpeed.toFixed(1)}km/h`}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div id="alert" dangerouslySetInnerHTML={{ __html: alertMessage }}></div>
    </div>
  );
};

export default WeatherApp;