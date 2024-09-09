import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/', 
  timeout: 10000,
});

export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await apiClient.get('weather', {
      params: {
        lat,
        lon,
        appid: import.meta.env.VITE_SOME_KEY, 
        units: 'metric', 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error obteniendo el clima:', error.response ? error.response.data : error.message);
    throw error;
  }
};
