/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getWeatherByCoordinates } from "../Services/Weather";
import Weather from "./Weather";
import useCountry from "../Hooks/useCountry";

const CountrieInfo = ({ countryName }) => {
  const { country, loading, error } = useCountry(countryName);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country || !country.capitalInfo) return;

    const [latitude, longitude] = country.capitalInfo.latlng;

    const fetchWeather = async () => {
      try {
        const data = await getWeatherByCoordinates(latitude, longitude);
        setWeather(data);
      } catch (err) {
        console.error("Error al obtener los datos:", err);
      }
    };

    fetchWeather();
  }, [country]);

  if (loading) return <div>Loading country data...</div>;
  if (error) return <div>{error}</div>;
  if (!country || !weather) return null;

  return (
    <div className="Card">
      <h1 className="title">
        {country.name.common} {country.flag}
      </h1>
      <div className="layout">
        <div className="infocont col">
          <div className="infobold">
            Capital: <span className="infoo">{country.capital}</span>
          </div>
          <div className="infobold">
            Area: <span className="infoo">{country.area}m<sup>2</sup></span>
          </div>
          <h1 className="subtitle">Languages:</h1>
          <ul className="lenlist">
            {Object.values(country.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
        <div className="flag col">
          <img className="flag" src={country.flags.svg} alt={country.flags.alt} />
        </div>
      </div>
      <Weather country={country} weather={weather} />
    </div>
  );
};

export default CountrieInfo;
