import React, { useState, useEffect } from 'react';

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

const apiKey = "3c55d79ad6bcde2f6f031ce795914e1c";

function WeatherComponent() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}q=Toshkent&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.log(error));
  }, []);

  if (!weatherData) {
    return <div className='loading'>Yuklanmoqda... </div>;
    <img src="" alt="" />
  }

  const { main, weather, wind, name } = weatherData;
  const { temp, humidity } = main;
  const { speed, gust } = wind;
  const { description } = weather[0];

  return (
    <div className="container">
      <div className="weather__box">
        <div className="address__info">
          <h1 className='addres__title'>{name}</h1>
          <p className='address__text'>{currentTime.toLocaleTimeString()}</p>
          <div id="txt"></div>
        </div>
        <div className="temprature">
          <h1 className='temprature__title'>{Math.round(temp - 273.15)} ℃</h1>
        </div>
        <div className="wind__speed">
          <p className='wind__text'>Yuqori tezlik: {gust} m/s</p>
          <p className='wind__text'>Past tezlik: {gust} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherComponent;