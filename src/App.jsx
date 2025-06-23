import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS
import { getWeather } from './Functions/fetch';


const App = () => {
  const [city, setCity] = useState('delhi');

  const [temperature, setTemperature] = useState(30);
  const [realFeel, setRealFeel] = useState(33);
  const [description, setDescription] = useState('Sunny');
  const [high, setHigh] = useState(35);
  const [low, setLow] = useState(27);
  const [icon, setIcon] = useState('https://openweathermap.org/img/wn/10d@4x.png');

  const [pressure, setPressure] = useState(1012);
  const [humidity, setHumidity] = useState(65);
  const [rain, setRain] = useState(0);
  const [cloud, setCloud] = useState(20);
  const [direction, setDirection] = useState('N');

  useEffect(() => {
    getWeather(city).then(data => {
      console.log(data);
      setTemperature(Math.round(data.main.temp));
      setRealFeel(Math.round(data.main.feels_like));
      setHigh(Math.round(data.main.temp_max));
      setLow(Math.round(data.main.temp_min));
      setPressure(data.main.pressure);
      setHumidity(data.main.humidity);
      setRain(data.wind.speed);
      setCloud(data.clouds.all);
      setIcon(data.weather[0].icon);
      setDescription(data.weather[0].description);
      setDirection(data.wind.deg);
    })


  }, [city, temperature, realFeel, description, high, low, pressure, humidity, rain, cloud]);

  return (
    <div className="weather-app" style={{ backgroundImage: 'url(https://images.pexels.com/photos/391522/pexels-photo-391522.jpeg)'}}>
      {/* Buttons placed separately */}
      <div className={"city-button-group "+city}>
        <button onClick={() => setCity('delhi')}>Delhi</button>
        <button onClick={() => setCity('mumbai')}>Mumbai</button>
        <button onClick={() => setCity('kolkata')}>Kolkata</button>
      </div>

      <div className="weather-container">
        <div className="weather-body">
          <div className="left-section">
            <div className="icon-temp-wrapper">
              <img src={icon} alt="weather icon" className="weather-icon" />
              <div className="temp-info">
                <h1 className="temperature">{temperature}°C</h1>
                <p className="realfeel">RealFeel: {realFeel}°C</p>
              </div>
            </div>
            <p className="description">{description}</p>
            <p className="high-low">High: {high}°C | Low: {low}°C</p>
          </div>

          <div className="right-section">
            <ul>
              <li>Pressure: {pressure} hPa</li>
              <li>Humidity: {humidity}%</li>
              <li>Wind: {rain} m/s | {direction}</li>
              <li>Cloud: {cloud}%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
