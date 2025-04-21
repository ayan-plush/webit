# 🌤️ Weather & Activity Finder App

This is a **React-based web application** that lets users:
- Search for cities using the GeoDB API
- Get current weather data using OpenWeatherMap
- Retrieve air quality (AQI) data using the WAQI API
- Receive personalized activity suggestions based on the current weather

---

## 🚀 Features

- 🔍 **Live city search** with autocomplete using GeoDB Cities API
- 🌦️ **Current weather, forecast, and AQI** based on selected city
- ⭐ **Suggested activities** depending on the weather condition
- 📱 Responsive, sidebar-based UI with clean, modern styling
- ⚙️ **Redux Toolkit** for global state and async data handling

---

## 📆 Tech Stack

- **Frontend**: React, TailwindCSS, React Icons, React Hot Toast
- **APIs**:
  - [GeoDB Cities](https://rapidapi.com/wirefreethought/api/geodb-cities)
  - [OpenWeatherMap](https://openweathermap.org/)
  - [WAQI](https://aqicn.org/api/)
- **State Management**: Redux Toolkit, `createAsyncThunk`
- **Component Libraries**: `react-select-async-paginate`, `react-icons`

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/ayan-plush/webit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the root of the project:

```
VITE_OPENWEATHERMAP_KEY=your_openweathermap_api_key
VITE_AQIKEY=your_waqi_api_key
```

### 4. Start the dev server

```bash
npm run dev
```

---

## 🔑 API Keys

- You will need:
  - An OpenWeatherMap API key (for weather and forecast)
  - A WAQI API key (for AQI data)
  - A RapidAPI key (for the GeoDB cities autocomplete)

> ⚠️ **Keep your keys secure.** Don’t expose them in client-side code without proper obfuscation for production.

---

## 📁 Project Structure

```bash
src/
├── api/               # Axios instances and API config
├── assets/            # Assets
├── components/        # React components (SearchBar, Sidebar, etc.)
├── store/             # Redux slices and async thunks
├── utils/             # Static data (e.g., activities list)
├── App.jsx            # Main app layout
└── main.jsx           # Entry point
```

---

## ✨ Future Improvements

- Add dark mode support
- Allow users to favorite/save activities
- Display 7-day weather forecast
- Local storage for city persistence
- Loading skeletons and better error handling

---

## 🧑‍💻 Author

Made with ❤️ by [Ayan Jyotir Khajuria](https://github.com/ayan-plush)

