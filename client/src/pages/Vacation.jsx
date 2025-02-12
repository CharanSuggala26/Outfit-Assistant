import { useState } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css"
import { FaCalendar, FaMapMarkerAlt, FaCloudSun, FaCamera } from 'react-icons/fa'
import Navbar from '../components/Navbar'

function Vacation() {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState(new Date())
  const [userImage, setUserImage] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const OPENWEATHER_API_KEY = '21d5f10030f198f64c25b7ef48c8a224' // Replace with your actual API key
  
  const getWeatherData = async (location) => {
    try {
      // First, get coordinates from location name
      const geoResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPENWEATHER_API_KEY}`
      )

      if (geoResponse.data.length === 0) {
        throw new Error('Location not found')
      }

      const { lat, lon } = geoResponse.data[0]

      // Then, get weather data using coordinates
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
      )

      return weatherResponse.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data')
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const weatherData = await getWeatherData(location)
      setWeather(weatherData)
      // Here you would send the weather data along with the user image to your virtual try-on model
      console.log('Form submitted:', { location, date, userImage, weatherData })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar/>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Plan Your Perfect Vacation Outfit
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your destination"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <FaCalendar className="absolute top-3 left-3 text-gray-400" />
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <FaCamera className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

            {userImage && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={userImage}
                  alt="User uploaded"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg">
                {error}
              </div>
            )}

            {weather && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Current Weather in {location}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Temperature</p>
                    <p className="font-semibold">{Math.round(weather.main.temp)}°C</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Weather</p>
                    <p className="font-semibold">{weather.weather[0].main}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Humidity</p>
                    <p className="font-semibold">{weather.main.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Wind Speed</p>
                    <p className="font-semibold">{weather.wind.speed} m/s</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 text-white py-3 px-6 rounded-lg transition-colors duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary'
              }`}
            >
              {loading ? 'Loading...' : 'Generate Outfit Suggestions'}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FaMapMarkerAlt className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Choose Location</h4>
              <p className="text-gray-600">Enter your vacation destination</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FaCloudSun className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Weather Analysis</h4>
              <p className="text-gray-600">We check the weather for your dates</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FaCamera className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Virtual Try-On</h4>
              <p className="text-gray-600">See how outfits look on you</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Vacation;