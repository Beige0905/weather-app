import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClipLoader } from "react-spinners";

// APIから取得する天候データの型定義
interface WeatherData {
  cod: number;
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

function App() {
  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY as string;
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cities = ["Seoul", "Tokyo", "California", "Florida", "Paris"];

  const fetchWeatherData = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCurrentLocation = (lat: number, lon: number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetchWeatherData(url);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCity = () => {
    if (selectedCity) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`;
      fetchWeatherData(url);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      getWeatherByCity();
    } else {
      getCurrentLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  useEffect(() => {
    console.log("selectedCity?", selectedCity);
  }, [selectedCity]);

  return (
    <>
      {loading ? (
        <div className="container">
          <ClipLoader
            loading={loading}
            size={80}
            aria-label="Loading Spinner"
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>
      )}
    </>
  );
}

export default App;
