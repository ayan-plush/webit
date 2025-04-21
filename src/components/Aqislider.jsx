import React from "react";
import { useSelector } from "react-redux";

// Component to display AQI (Air Quality Index) visually
export const AQISlider = () => {
  // Extract the AQI value from the Redux store (geo slice)
  const { aqi } = useSelector((state) => state.geo);

  // Determine the air quality label based on AQI value
  // const getAQILabel = (value) => {
  //   if (value <= 50) return "Good";
  //   if (value <= 100) return "Moderate";
  //   return "Poor";
  // };

  // Determine the background color based on AQI value
  const getColor = (value) => {
    if (value <= 50) return "bg-green-500";      // Good air quality
    if (value <= 100) return "bg-yellow-400";    // Moderate air quality
    return "bg-red-500";                         // Poor air quality
  };

  // Convert AQI value into a percentage (out of 200, capped at 100%)
  const getPercentage = (value) => Math.min((value / 200) * 100, 100);

  return (
    <div className="max-w-md p-3 px-6 rounded-3xl bg-white flex flex-col">
      {/* Header */}
      <h2 className="text-md font-light pb-1 text-gray-800 text-center">
        Air Quality Index
      </h2>

      {/* AQI Slider Bar */}
      <div className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(aqi)}`}
          style={{ width: `${getPercentage(aqi)}%`, transition: "width 0.5s" }}
        />
      </div>

      {/* AQI Labels */}
      <div className="flex justify-between text-sm text-gray-600 px-1 mt-1">
        <span>Good</span>
        <span>Poor</span>
      </div>
    </div>
  );
};

export default AQISlider;
