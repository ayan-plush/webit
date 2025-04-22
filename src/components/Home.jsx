import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import SideBar from './SideBar';
import Search from './Search';
import HourlyForecast from './HourlyForecast';
import AQISlider from './Aqislider';

// Icons
import { CiMenuBurger } from "react-icons/ci";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdAir } from "react-icons/md";


// API constants
import { WEATHER_APIURL } from '../api/api';

// Redux Actions
import {
  fetchAqiData,
  fetchForecastData,
  fetchWeatherData,
  // fetchDailyWeatherData, // Optional if needed in the future
} from '../store/Reducers/geoReducer';

function Home() {
  const dispatch = useDispatch();

  // Local UI states
  const [showSidebar, setShowSidebar] = useState(false);
  // const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [minTemp, setMinTemp] = useState(null);

  // Redux store states
  const { city, country, currentMain, currWeather, pm10, aqi } = useSelector(state => state.geo);

  const username = localStorage.getItem('name')

  // Optional debug useEffect
  // useEffect(() => {
  //   if (currentWeather) {
  //     console.log("Updated current weather:", currentWeather);
  //   }
  // }, [currentWeather]);

  useEffect(() => {
    if (forecast) {
      const tomorrowData = forecast?.forecast?.list[12];
      setForecastData(tomorrowData);
      const temps = forecast?.forecast?.list?.slice(0, 8)?.map(x => x?.main?.temp).filter(temp => typeof temp === 'number');
      const min_Temp = temps?.length ? Math.min(...temps) : null; // or a fallback value like 0
      setMinTemp(min_Temp);
    }
  }, [forecast]);

  

  /**
   * Handles search changes and dispatches API calls.
   * Updates local state with Redux payloads.
   */
  const handleOnSearchChange = async (searchData) => {
    try {
      const forecastData = await dispatch(fetchForecastData(searchData));
      dispatch(fetchWeatherData(searchData));
      dispatch(fetchAqiData(searchData));


      // setCurrentWeather(weatherData.payload);
      setForecast(forecastData.payload);
    } catch (error) {
      console.error("Error in search handler:", error);
    }
  };

  return (
    <div className="h-full w-full flex justify-between">
      {/* Main screen */}
      <div className="screen-1 flex flex-col gap-5 lg:w-3/4 p-5 h-full w-full">

        {/* Header */}
        <div className="header flex justify-between items-center w-full md:h-[80px] p-5">
          <div className="uppercase max-lg:hidden">
            <div className="md:text-xl font-extralight">Hello,</div>
            <div className="md:text-2xl">{username}</div>
          </div>

          <Search onSearchChange={handleOnSearchChange} />

          {/* Burger icon for sidebar */}
          <div className="lg:hidden">
            <CiMenuBurger onClick={() => setShowSidebar(true)} className="w-full h-full" />
          </div>
        </div>

        {/* App Body */}
        <div className="appbody w-full flex flex-col justify-between gap-5">

          {/* Top Row: Weather & AQI Cards */}
          <div className="body-row-1 flex gap-5 max-md:flex-col">

            {/* Weather Container */}
            <div className="container-1 overflow-hidden w-full items-center rounded-3xl h-[285px] bg-cover bg-center bg-[url('https://res.cloudinary.com/decks92gf/image/upload/v1745064501/4f2d440dac6e12b6c699d55c93b79a63_ds95fm.jpg')]">
              <div className="gap-3 p-5 flex h-full bg-[#00000043] flex-col w-full">

                {/* Weather Title Section */}
                <div className="h-full lg:w-7/12 flex items-center">
                  <div className="w-[40px] h-[40px] text-[#ffa600] mx-3 rounded-full bg-[#fff] flex items-center justify-center">
                    <TiWeatherPartlySunny />
                  </div>

                  <div>
                    <div className="font-semibold text-[#fff]">Weather</div>
                    <div className="text-[#fff]">What's the weather.</div>
                  </div>
                </div>

                {/* Temperature Info */}
                <div className="w-full h-full mx-3 flex flex-col justify-between items-start">
                  <div className="flex items-center justify-start gap-4 w-5/12">
                    <div className="text-4xl w-[70px] font-semibold text-[#fff]">
                      {Math.trunc(currentMain?.temp)}°C
                    </div>
                    <div className="text-sm bg-[#fff] h-fit p-1 rounded-md">{Math.trunc(minTemp)}°C</div>
                  </div>
                  <div className="text-[#fff]">{currWeather}</div>
                </div>

                {/* Additional Weather Details */}
                <div className="w-full h-full  flex items-center gap-3 justify-between">
                  {/* Pressure */}
                  <div className="w-1/3 h-full flex flex-col p-3 items-center justify-between rounded-md bg-[#303030]">
                    <div className="text-sm font-light text-[#fff]">Pressure</div>
                    <div className="text-md xl:text-xl flex items-center font-semibold text-[#fff]">
                      {currentMain?.pressure} <span className='text-sm font-light'>hpa</span>
                    </div>
                  </div>
                  {/* Feels Like */}
                  <div className="w-1/3 h-full flex flex-col p-3 items-center justify-between rounded-md bg-[#CCE267]">
                    <div className="text-sm  font-light text-[#000]">Feels Like</div>
                    <div className="text-md xl:text-xl font-semibold text-[#000]">
                      {Math.trunc(currentMain?.feels_like)}°C
                    </div>
                  </div>
                  {/* Humidity */}
                  <div className="w-1/3 h-full flex flex-col p-3 items-center justify-between rounded-md bg-[#fff]">
                    <div className="text-sm font-light text-[#000]">Humidity</div>
                    <div className="text-md xl:text-xl font-semibold text-[#000]">
                      {currentMain?.humidity}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AQI Container */}
            <div className="container-2 flex overflow-hidden flex-col gap-3 w-full rounded-3xl h-[285px] bg-cover bg-center bg-[url('https://res.cloudinary.com/decks92gf/image/upload/v1745064702/4ec1be9d2c91bbdf89fbe1d9a6fe81c3_tlo7jd.jpg')]">
              <div className="gap-3 p-5 flex h-full bg-[#00000043] flex-col w-full">
                <div className="h-full lg:w-7/12 flex items-center">
                  <div className="w-[40px] h-[40px] text-[#ffa600] mx-3 rounded-full bg-[#fff] flex items-center justify-center">
                    <MdAir />
                  </div>

                  <div>
                    <div className="font-semibold text-[#fff]">Air Quality</div>
                    <div className="text-[#fff]">PM10 : {pm10}</div>
                  </div>
                </div>

                <div className="w-full h-full mx-3 flex flex-col justify-center items-start">
                  <div className="flex items-center justify-start gap-4 w-5/12">
                    <div className="text-4xl w-[50px] font-semibold text-[#fff]">{aqi}</div>
                    <div className="text-sm bg-[#CCE267] text-[#fff] h-fit p-1 rounded-md">AQI</div>
                  </div>
                </div>

                <div className="w-full h-full p-3">
                  <div className="w-full h-full">
                    <AQISlider />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row: Hourly Forecast & Extra Info */}
          <div className="body-row-2 flex gap-5 max-md:flex-col">
            {/* Hourly Forecast */}
            <div className="container-3 w-full md:w-2/3 rounded-3xl h-[285px]">
              <HourlyForecast data={forecast} />
            </div>

            {/* Placeholder Card */}
            <div className="container-4 w-full md:w-1/3 overflow-hidden rounded-3xl h-[285px] bg-cover bg-center bg-[url('https://res.cloudinary.com/decks92gf/image/upload/v1745064501/32f4ffa2c10fcd33a525a084956d432a_tg1vzv.jpg')]">
                <div className="gap-3 p-5 flex h-full bg-[#00000043] flex-col w-full">
                      <div className="h-full lg:w-7/12 flex items-center">
                        <div>
                          <div className="font-semibold text-[#fff]">Tomorrow</div>
                          <div className="text-[#fff] font-bold text-3xl">{city}, {country}</div>
                        </div>
                      </div>

                      <div className="w-full h-full flex flex-col">
                        <div className="flex flex-col  justify-start gap-4 w-5/12">
                          <div className="text-4xl font-semibold text-[#fff]">{Math.trunc(forecastData?.main?.temp)}°C</div>
                          <div className="text-sm text-[#fff] ">{forecastData?.weather[0]?.main}</div>
                        </div>
                      </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="screen-2 lg:w-1/4">
        <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
}

export default Home;
