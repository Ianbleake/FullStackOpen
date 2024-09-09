/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getWeatherByCoordinates } from "../Services/Weather";


const CountrieInfo = ({ info }) => {
  const [countrie, setCountrie] = useState(null);
  const [weather, setWeather] = useState(null);
  let latitude = 0;
  let longitude = 0;

  useEffect(() => {
    setCountrie(info);
    latitude = info.capitalInfo.latlng[0];
    longitude = info.capitalInfo.latlng[1];
  }, [info,latitude,longitude]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherByCoordinates(latitude, longitude);
        setWeather(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  console.log('Pais:',countrie)

  if (!countrie || !weather ) return null;

  return (
    <div className="Card" >
      <h1 className="title" >{countrie.name.common} {countrie.flag}</h1>
      <div className="layout" >
        <div className="infocont col">
          <div className="infobold">Capital: <span className="infoo" >{countrie.capital}</span></div>
          <div className="infobold">Area: <span className="infoo" >{countrie.area}m<sup>2</sup></span></div>
          <h1 className="subtitle" >Languages:</h1>
          <ul className="lenlist" >
            {Object.values(countrie.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
        <div className="flag col" >
          <img className="flag" src={countrie.flags.svg} alt={countrie.flags.alt} />
          <div className="weather">
            <h2 className="subtitle">Weather in {countrie.capital}</h2>
            <div className="infobold">Temperature: <span className="infoo" >{weather.main.temp}, {weather.weather[0].description}</span></div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" className="wicon" />
            <div className="infobold">Wind: <span className="infoo" >{weather.wind.speed}m/s</span></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CountrieInfo;
