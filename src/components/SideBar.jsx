import React, { useEffect } from 'react';
import { FaRegStar } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from 'react-redux';
import slugify from "slugify";
import { activities } from '../utils/activities';
import { FaSpotify } from "react-icons/fa";

// Sidebar component that suggests activities based on current weather
function SideBar({ showSidebar, setShowSidebar }) {

  // Get current day and its name
  const d = new Date();
  const day = d.getDay();
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Destructure values from Redux store
  const { city, country, currWeather, currentMain, timeShift } = useSelector(state => state.geo);

  // Generate a slug from the current weather to match keys in `activities`
  const slug = slugify(`${currWeather}`, '_');

  // Debug: Log current weather
//   useEffect(() => {
//     console.log(currWeather);
//   }, [currWeather]);

  // Debug: Log the slug and corresponding activities
//   useEffect(() => {
//     console.log(slug);
//     console.log(activities[slug]);
//   }, [slug]);

      const nowUTC = new Date(Date.now());
        
      // Convert seconds to milliseconds
      const offsetMs = timeShift*1000 ;

      // Adjust time based on UTC offset
      // If running locally make sure to adjust the value, for india subtarct 5*60*60*1000
      const localTime = new Date(nowUTC.getTime() + offsetMs -5*60*60*1000);

      // Format the date and time
      const formatted = localTime.toLocaleString('en-US', {
        weekday: 'long',     
        // year: 'numeric',
        // month: 'long',       
        // day: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
        // hour12: true,
      });

  return (
    <div>
      {/* Overlay when sidebar is open (closes on click) */}
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed flex duration-200 ${!showSidebar ? 'invisible' : 'visible max-lg:backdrop-blur-sm'} w-screen h-screen top-0 left-0 z-10`}
      />

      {/* Sidebar container */}
      <div className={`bg-white max-lg:fixed p-5 flex flex-col max-lg:z-50 max-lg:h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${showSidebar ? 'left-0' : '-left-[600px] lg:left-0'}`}>
        
        {/* Header section with day, location, temperature, and close button */}
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <div className='font-extralight text-2xl'>{formatted}</div>
            <div className='text-sm uppercase'>{city}, {country}</div>
          </div>

          <div className='font-semibold text-3xl flex items-center text-[#fa0]'>
            <div>{Math.trunc(currentMain?.temp)}°C</div> {/* This is static — consider replacing with actual temp from Redux */}
            <IoIosCloseCircleOutline
              onClick={() => setShowSidebar(false)}
              className='lg:hidden w-[25px] ml-5 text-[#ff3232]'
            />
          </div>
        </div>

        {/* Suggested activities */}
        <div className='flex flex-col gap-5 mt-15'>
          <div className='ml-5 font-extralight text-[1.5em] -tracking-[.1em]'>
            Wondering What to do?
          </div>

          {/* Render list of activities based on weather slug */}
          {
            activities[slug]?.map((c, i) => (
              <div
                key={i}
                style={{ backgroundImage: `url(${c?.ImageSource})` }}
                className="h-[85px] text-white bg-cover bg-center overflow-hidden rounded-3xl"
              >
                <div className='w-full p-2 h-full flex justify-between items-center bg-[#00000058]'>
                  <div className='uppercase'>{c?.Activity}</div>
                  <div className='h-[80px] flex justify-center items-center w-[80px]'>
                    <FaRegStar className='h-[30px] w-[30px]' />
                  </div>
                </div>
              </div>
            ))
          }

          {/* Unused static block (has a bug in image syntax — should be removed or fixed) */}
          <a href={`${activities[slug]?activities[slug][0].Playlist:''}`} className="h-[85px] overflow-hidden text-white flex items-center px-4 py-3 justify-between bg-[#000] hover:bg-[#2d2d2d] rounded-3xl" >
            <FaSpotify  className='text-[#1ED760] h-[30px] w-[30px]'/>
            <span className='font-extralight ml-2'>A perfect playlist for the perfect weather</span>
          </a>
            

          </div>
      </div>
    </div>
  );
}

export default SideBar;
