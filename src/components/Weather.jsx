import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/style.css'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!capital) {
      setLoading(false)
      return
    }

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY

    if (!apiKey) {
      setError('Weather API key not configured')
      setLoading(false)
      return
    }

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
      .then(response => {
        setWeather(response.data)
        setLoading(false)
      })
      .catch(err => {
        setError('Could not fetch weather data')
        setLoading(false)
      })
  }, [capital])

  if (loading) {
    return <div className="weather loading">Loading weather...</div>
  }

  if (error) {
    return <div className="weather error">{error}</div>
  }

  if (!weather) {
    return <div className="weather empty">No weather data available</div>
  }

  return (
    <div className="weather">
      <h3 className="weather-title">Weather in {capital}</h3>
      <div className="weather-grid">
        <div>
          <p className="weather-item-label">
            <strong>Temperature:</strong>
          </p>
          <p className="weather-item-value">
            {weather.main.temp}°C
          </p>
        </div>
        <div>
          <p className="weather-item-label">
            <strong>Feels like:</strong>
          </p>
          <p className="weather-item-value">
            {weather.main.feels_like}°C
          </p>
        </div>
        <div>
          <p className="weather-item-label">
            <strong>Condition:</strong>
          </p>
          <p className="weather-item-value small">
            {weather.weather[0].main}
          </p>
        </div>
        <div>
          <p className="weather-item-label">
            <strong>Humidity:</strong>
          </p>
          <p className="weather-item-value small">
            {weather.main.humidity}%
          </p>
        </div>
      </div>
      <div className="weather-wind">
        <p className="weather-item-label">
          <strong>Wind Speed:</strong>
        </p>
        <p className="weather-item-value small">
          {weather.wind.speed} m/s
        </p>
      </div>
      {weather.weather[0].icon && (
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  )
}

export default Weather
