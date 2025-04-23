import { useEffect, useState } from "react";

export default function WeatherInfo() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    const apiKey = "f398e8e614936a3e3aa0ec208249b381"; // Replace with your OpenWeatherMap API key
    const city = "New York"; // Replace with the desired city
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  const groupForecastsByDay = (forecasts) => {
    const grouped = {};
    forecasts.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
      if (!grouped[date]) {
        grouped[date] = forecast;
      }
    });
    return Object.values(grouped).slice(0, 5); // Return only the first 5 days
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="weather-info">
      <h2>Weather Forecast</h2>
      {weatherData ? (
        <div className="weather-days">
          {groupForecastsByDay(weatherData.list).map((forecast, index) => {
            const date = new Date(forecast.dt * 1000);
            const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
            return (
              <p key={index}>
                {dayOfWeek}: {forecast.weather[0].description} {Math.round(forecast.main.temp)}°C
              </p>
            );
          })}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
      <button
        className="explore-button"
        onClick={() => window.open("https://openweathermap.org/city/1264527", "_blank")}
      >
        Explore Weather
      </button>
    </div>
  );
}