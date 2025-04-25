import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aqiApi, geoApi, openCageApi, weatherApi } from "../../api/api";

/* -----------------------------------------------
   Async Thunk: Fetch matching city options for search input
------------------------------------------------ */
export const fetchCityOptions = createAsyncThunk(
  'geo/fetchCityOptions',
  async (inputValue, thunkAPI) => {
    try {
      const response = await geoApi.get('/cities', {
        params: {
          minPopulation: 100,
          namePrefix: inputValue,
        },
      });

      const result = response.data;

      return {
        fulfilled: true,
        options: result.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        fulfilled: false,
        message: error.response?.data || error.message,
      });
    }
  }
);



/* -----------------------------------------------
   Async Thunk: Fetch 5-day weather forecast
------------------------------------------------ */
export const fetchForecastData = createAsyncThunk(
  'weather/fetchForecastData',
  async (searchData, { rejectWithValue, fulfillWithValue }) => {
    const [lat, lon] = searchData.value.split(' ');
    const city = searchData.label;

    try {
      const forecastResponse = await weatherApi.get('/forecast', { params: { lat, lon } });

      return fulfillWithValue({
        city,
        forecast: forecastResponse.data,
      });
    } catch (error) {
      return rejectWithValue({
        fulfilled: false,
        message: error.response?.data?.message || error.message || 'Weather fetch failed',
      });
    }
  }
);

/* -----------------------------------------------
   Async Thunk: Fetch current weather data
------------------------------------------------ */
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (searchData, { rejectWithValue, fulfillWithValue }) => {
    const [lat, lon] = searchData.value.split(' ');
    const city = searchData.label;

    try {
      const currentResponse = await weatherApi.get('/weather', { params: { lat, lon } });

      return fulfillWithValue({
        city,
        current: currentResponse.data,
      });
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message || 'Weather fetch failed',
      });
    }
  }
);

/* -----------------------------------------------
   Async Thunk: Fetch daily weather data
------------------------------------------------ */
export const fetchDailyWeatherData = createAsyncThunk(
  'weather/fetchDailyWeatherData',
  async (searchData, { rejectWithValue, fulfillWithValue }) => {
    const [lat, lon] = searchData.value.split(' ');
    const cnt = 1;
    const city = searchData.label;

    try {
      const currentResponse = await weatherApi.get('/forecast/daily', {
        params: { lat, lon, cnt },
      });

      return fulfillWithValue({
        city,
        current: currentResponse.data,
      });
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message || 'Weather fetch failed',
      });
    }
  }
);

/* -----------------------------------------------
   Async Thunk: Fetch air quality index (AQI) data
------------------------------------------------ */
export const fetchAqiData = createAsyncThunk(
  'weather/fetchAqiData',
  async (searchData, { rejectWithValue, fulfillWithValue }) => {
    const [lat, lon] = searchData.value.split(' ');
    const lng = lon;

    try {
      const currentaqiResponse = await aqiApi.get(
        `/geo:${lat};${lng}/?token=${import.meta.env.VITE_AQIKEY}`,
        { params: { lat, lng } }
      );

      return fulfillWithValue(currentaqiResponse.data);
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message || 'AQI fetch failed',
      });
    }
  }
);

/* -----------------------------------------------
   Slice: Geo and Weather Data
------------------------------------------------ */
export const geoReducer = createSlice({
  name: 'geo',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    aqi: null,
    city: null,
    currWeatherMain: null,
    country: null,
    currWeather: null,
    currentMain: null,
    pm10: null,
    wind: null,
    timeShift: null,
    coordinates: null,
    selectedCity: null,
  },
  reducers: {
    // Clears error and success messages
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    // Sets the selected city and its coordinates
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload.label;
      const [lat, lon] = action.payload.value.split(" ");
      state.coordinates = { lat, lon };
    },
  },
  extraReducers: (builder) => {
    builder
      // Forecast
      .addCase(fetchForecastData.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchForecastData.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })
      .addCase(fetchForecastData.fulfilled, (state) => {
        state.loader = false;
      })

      // Current Weather
      .addCase(fetchWeatherData.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchWeatherData.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })
      .addCase(fetchWeatherData.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.timeShift = payload.current.timezone;
        state.city = payload.current.name;
        state.country = payload.current.sys.country;
        state.currentMain = payload.current.main;
        state.wind = payload.current.wind;
        state.currWeather = payload.current.weather[0].description;
        state.currWeatherMain = payload.current.weather[0].main;
      })

      // AQI
      .addCase(fetchAqiData.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.aqi = payload.data.aqi;
        state.pm10 = payload.data.iaqi.pm10.v;
      });
  },
});

// Export actions and reducer
export const { messageClear, setSelectedCity } = geoReducer.actions;
export default geoReducer.reducer;
