import '../Styles/App.css';
import { useEffect, useState } from 'react';
import CountrieService from '../Services/Countries';
import CountrieInfo from '../components/CountrieInfo';
import Notification from '../components/Notification';

function App() {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCountryName, setSelectedCountryName] = useState(null);

  const handleInfo = (countryName) => {
    setShowInfo(!showInfo);
    setSelectedCountryName(countryName);
  };

  useEffect(() => {
    CountrieService.getAll().then((response) => setCountries(response));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (showInfo) {
      setSelectedCountryName(null);
      setShowInfo(false);
    }
  };

  const filteredCountries = (countries || []).filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!countries) {
      setMessage('Please wait...');
    } else if (filteredCountries.length === 250) {
      setMessage('Please search some country.');
    } else if (filteredCountries.length > 10) {
      setMessage('Too many matches, specify another filter...');
    } else if (filteredCountries.length === 0) {
      setMessage('No results found');
    } else {
      setMessage('');
      setShow(false);
    }

    if (message) {
      setShow(true);
    }
  }, [countries, filteredCountries, message]);

  return (
    <div className="App">
      <div className="search">
        <input
          className="input"
          placeholder="search..."
          type="text"
          name="search"
          onChange={handleSearch}
          value={search}
        />
        {show && <Notification text={message} />}
      </div>
      <div className="results">
        {countries ? (
          <>
            {filteredCountries.length > 1 &&
            filteredCountries.length <= 10 &&
            !showInfo ? (
              filteredCountries.map((country, index) => (
                <div className="option" key={index}>
                  {country.name.common}
                  <button
                    className="show"
                    onClick={() => handleInfo(country.name.common)}
                  >
                    Show
                  </button>
                </div>
              ))
            ) : filteredCountries.length === 1 || showInfo ? (
              <CountrieInfo countryName={selectedCountryName || filteredCountries[0].name.common} />
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
