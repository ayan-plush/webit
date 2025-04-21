import axios from 'axios';

/* -----------------------------------------------
   Constants: GeoDB API Base URL and Options
------------------------------------------------ */

// GeoDB endpoint to fetch cities
export const geourl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

// Header options used with manual axios requests (optional)
export const getApioptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '5c7ae02454msh15793922c5bfcd3p1c3918jsnc6a194ac6af7',
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
  }
};

/* -----------------------------------------------
   Axios Instance: GeoDB API
------------------------------------------------ */

// Preconfigured axios instance for GeoDB API
export const geoApi = axios.create({
  baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
  headers: {
    'x-rapidapi-key': '5c7ae02454msh15793922c5bfcd3p1c3918jsnc6a194ac6af7',
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
  },
});

/* -----------------------------------------------
   Axios Instance: OpenWeatherMap API
------------------------------------------------ */

// Preconfigured axios instance for OpenWeatherMap API
export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    units: 'metric', // Temperature in Celsius
    appid: import.meta.env.VITE_OPENWEATHERMAP_KEY, // API key from .env file
  },
});

/* -----------------------------------------------
   Axios Instance: Air Quality Index (AQI) API
------------------------------------------------ */

// AQI API base setup
export const aqiApi = axios.create({
  baseURL: "https://api.waqi.info/feed"
});

/* -----------------------------------------------
   Constant: Direct OpenWeatherMap base URL
   (Use this if needed elsewhere for manual requests)
------------------------------------------------ */
export const WEATHER_APIURL = "https://api.openweathermap.org/data/2.5";
