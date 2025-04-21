import React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { format } from 'date-fns';
import { TiWeatherPartlySunny } from "react-icons/ti";

// Hourly forecast component using a line chart to display temperature and "feels like" temperature
function HourlyForecast({ data }) {

  // Prepare chart data: extract first 8 time slots with formatted time, temperature, and weather description
  const chartData = data?.forecast?.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"), // Format timestamp to something like '3PM'
    temp: Math.round(item.main.temp),             // Round temperature
    feels_like: Math.round(item.main.feels_like), // Round "feels like" temp
    weather: item.weather[0].description          // Weather description (e.g., "clear sky")
  }));

  return (
    <div className="w-full h-full pt-5 pr-5">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          {/* X-Axis showing formatted time */}
          <XAxis
            dataKey="time"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          {/* Y-Axis showing temperature with degree symbol */}
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}°`}
          />

          {/* Custom tooltip showing weather, temperature, and feels like */}
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#000] flex flex-col gap-1 text-white px-3 py-1 rounded-md">
                    {/* Weather description */}
                    <div className="text-xs font-extralight">
                      {payload[0].payload.weather}
                    </div>

                    {/* Temperature and Feels Like display with icon */}
                    <div className="flex gap-3 items-center">
                      <div className="flex flex-col items-center">
                        <div className="w-full h-full rounded-full bg-white p-2">
                          <TiWeatherPartlySunny className="text-black" />
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-sm font-extralight">Temperature</span>
                        <span className="text-xl font-semibold">
                          {payload[1].value}°
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-sm font-extralight">Feels Like</span>
                        <span className="text-xl font-semibold">
                          {payload[0].value}°
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

          {/* Solid line for actual temperature */}
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />

          {/* Dashed line for "feels like" temperature */}
          <Line
            type="monotone"
            dataKey="feels_like"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HourlyForecast;
