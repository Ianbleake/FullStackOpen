/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const CountrieInfo = ({ info }) => {
  const [countrie, setCountrie] = useState(null);

  useEffect(() => {
    setCountrie(info);
  }, [info]);

  if (!countrie) return null;

  return (
    <div className="Card" >
      <h1 className="title" >{countrie.name.common}</h1>
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
        </div>
      </div>

    </div>
  );
};

export default CountrieInfo;
