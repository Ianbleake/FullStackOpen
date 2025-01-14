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
  const [showInfo,setShowInfo] = useState(false);
  const [selected,setSelected] = useState(null);

  const handleInfo = (countrie)=>{
    setShowInfo(!showInfo);
    setSelected(countrie);
  }

  useEffect(() => {
    CountrieService.getAll().then(response => setCountries(response));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if(showInfo && selected !== null){
      setSelected(null);
      setShowInfo(false);
    }
  };

  const filteredCountries = (countries || []).filter((countrie) => {
    return countrie.name.common.toLowerCase().includes(search.toLowerCase());
  });

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
      setShow(false)
    }

    if (message) {
      setShow(true);
    }
  }, [countries, filteredCountries, message]);

  return (
    <div className='App'>
      <div className='search'>
        <input className='input' placeholder='search...' type='text' name='search' onChange={handleSearch} value={search} />
        {show && <Notification text={message} /> }
      </div>
      <div className='results'>
        {countries ? (
          <>
            {filteredCountries.length > 1 && filteredCountries.length <= 10 && !showInfo  ? (
              filteredCountries.map((countrie, index) => (
                <div className='option' key={index}>{countrie.name.common}<button className='show' onClick={()=>handleInfo(countrie)}>Show</button></div>
              ))
            ) : filteredCountries.length === 1 || showInfo ? (
              <CountrieInfo info={ selected || filteredCountries[0]} />
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
