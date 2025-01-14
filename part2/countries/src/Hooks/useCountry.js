import { useState, useEffect } from 'react';
import CountrieService from '../Services/Countries';

const useCountry = (countryName) => {
  
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) return;

    setLoading(true);
    setError(null);

    CountrieService.getByName(countryName)
      .then(response => {
        setCountry(response);
        setLoading(false);
      })
      .catch(err => {
        setError(`Something went wrong: ${err}`);
        setLoading(false);
      });
  }, [countryName]);

  return { country, loading, error };
};

export default useCountry;
