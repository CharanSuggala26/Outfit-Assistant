import { use, useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar, FaMapMarkerAlt, FaCamera, FaTimes, FaEnvelope, FaStreetView, FaCalculator } from 'react-icons/fa';
import { ExternalLink, Shirt } from 'lucide-react';
import Navbar from '../components/Navbar';

function Vacation() {
  const [location, setLocation] = useState('');
  const [Ocassion,setOcassion]=useState('');
  const [date, setDate] = useState(new Date());
  const [userImage, setUserImage] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [tryOnImage, setTryOnImage] = useState(null);
  const [tryOnLoading, setTryOnLoading] = useState(false);
  const [showTryOnModal, setShowTryOnModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const gender = "male"
      const formData = {location,Ocassion, date, gender}
      const response = await axios.post('https://outfit-assistant.vercel.app//model', formData);
      const { weatherData, thumbnails } = response.data.payload;
      
      setWeather(weatherData);
      setOutfits(thumbnails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async (outfit) => {
    if (!userImage) {
      alert('Please upload your image first');
      return;
    }

    setTryOnLoading(true);
    setShowTryOnModal(true);

    try {
      const response = await axios.post('https://outfit-assistant.vercel.app//model/try-on', {
        model_image:"D:\\Outfit Assistant\\server\\APIs\\assets\\Kohli.png",
        cloth_image:"D:\\Outfit Assistant\\server\\APIs\\assets\\csk.png"
      });

      if (response.data.status === 'Success') {
        setTryOnImage(`data:image/jpeg;base64,${response.data.image}`);
      } else {
        throw new Error('Try-on failed');
      }
    } catch (err) {
      setError('Failed to process try-on. Please try again.');
    } finally {
      setTryOnLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />

      {/* Try-on Modal */}
      {showTryOnModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full relative overflow-hidden border border-gray-700">
            <button
              onClick={() => {
                setShowTryOnModal(false);
                setTryOnImage(null);
              }}
              className="absolute right-4 top-4 text-teal-400 hover:text-teal-300 transition-colors"
            >
              <FaTimes size={28} />
            </button>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-teal-400 mb-6">Virtual Try-On Result</h3>
              <div className="flex justify-center">
                {tryOnLoading ? (
                  <div className="flex items-center justify-center h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-400"></div>
                  </div>
                ) : tryOnImage ? (
                  <img
                    src={tryOnImage}
                    alt="Try-on result"
                    className="max-h-[400px] object-contain rounded-xl shadow-md border border-gray-700"
                  />
                ) : (
                  <div className="flex items-center justify-center h-[400px] bg-gray-700 rounded-xl">
                    <p className="text-teal-400 text-lg">Processing try-on...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-700">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-teal-400 tracking-tight">
            Plan Your Perfect Vacation Outfit
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative">
                <FaMapMarkerAlt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-teal-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your destination"
                  className="w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-teal-400 placeholder-gray-400 bg-gray-700"
                  required
                />
              </div>
              <div className="relative">
                <FaStreetView className="absolute top-1/2 left-4 transform -translate-y-1/2 text-teal-400" />
                <input
                  type="text"
                  value={Ocassion}
                  onChange={(e) => setOcassion(e.target.value)}
                  placeholder="Enter your Purpose"
                  className="w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-teal-400 placeholder-gray-400 bg-gray-700"
                  required
                />
              </div>

              <div className="relative">
                <FaCalendar className="absolute top-1/2 left-4 transform -translate-y-1/2 text-teal-400" />
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-teal-400 bg-gray-700"
                  required
                />
              </div>

              <div className="relative">
                <FaCamera className="absolute top-1/2 left-4 transform -translate-y-1/2 text-teal-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-teal-400 bg-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-400 file:text-gray-800 hover:file:bg-teal-300"
                />
              </div>
            </div>

            {userImage && (
              <div className="mt-6">
                <p className="text-sm text-teal-400 mb-3 font-medium">Preview:</p>
                <img
                  src={userImage}
                  alt="User uploaded"
                  className="w-40 h-40 object-cover rounded-xl shadow-md border border-gray-700"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-900/20 text-red-400 p-4 rounded-xl border border-gray-700">
                {error}
              </div>
            )}

            {weather && (
              <div className="bg-gray-700 p-6 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-xl mb-4 text-teal-400">Weather in {location}</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 text-sm">Temperature</p>
                    <p className="font-semibold text-lg text-teal-400">{Math.round(weather.main.temp)}°C</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Weather</p>
                    <p className="font-semibold text-lg text-teal-400">{weather.weather[0].main}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Humidity</p>
                    <p className="font-semibold text-lg text-teal-400">{weather.main.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Wind Speed</p>
                    <p className="font-semibold text-lg text-teal-400">{weather.wind.speed} m/s</p>
                  </div>
                </div>
              </div>
            )}

            {outfits.length > 0 && (
              <div className="mt-8">
                <h4 className="text-2xl font-bold mb-6 text-teal-400">Recommended Outfits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {outfits.map((outfit, index) => (
                    <div key={index} className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700">
                      <div className="relative group">
                        <img 
                          src={outfit.thumbnail} 
                          alt={`Outfit ${index + 1}`} 
                          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="p-5">
                        <div className="flex flex-col gap-3">
                          <button 
                            onClick={() => window.open(`https://www.amazon.com/dp/${outfit.asin}`, '_blank')}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-teal-400 font-medium"
                          >
                            <ExternalLink className="w-5 h-5" />
                            View on Amazon
                          </button>
                          
                          <button 
                            onClick={() => handleTryOn(outfit)}
                            disabled={tryOnLoading}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-400 text-gray-800 rounded-lg transition-colors duration-200 font-medium
                              ${tryOnLoading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-teal-500'}`}
                          >
                            <Shirt className="w-5 h-5" />
                            {tryOnLoading ? 'Processing...' : 'Try On'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-teal-400 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-teal-500'
              }`}
            >
              {loading ? 'Generating...' : 'Generate Outfit Suggestions'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Vacation;