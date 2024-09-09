import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/';

const getAll = ()=>{
  const request = axios.get(baseUrl.concat('/api/all'));
  return request.then(response => response.data);
}

const getByName = (name)=>{
 const request = axios.get(baseUrl.concat(`/api/name/${name}`));
 return request.then(response => response.data)
}

export default { getAll, getByName }