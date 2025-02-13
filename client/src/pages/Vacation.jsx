// import { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import axios from 'axios';
// import "react-datepicker/dist/react-datepicker.css";
// import { FaCalendar, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
// import { ExternalLink, Shirt } from 'lucide-react';
// import Navbar from '../components/Navbar';

// function Vacation() {
//   const [location, setLocation] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [userImage, setUserImage] = useState(null);
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [outfits, setOutfits] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     try {
//       const gender = "male"
//       const formData = {location, date, gender}
      
//       console.log(formData)
//       const response = await axios.post('http://localhost:4700/model', formData);
//       const { weatherData, thumbnails } = response.data.payload;
      
//       setWeather(weatherData);
//       setOutfits(thumbnails);
//     } catch (err) {
//       console.log(err)
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUserImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 py-12">
//         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//             Plan Your Perfect Vacation Outfit
//           </h2>
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-4">
//               <div className="relative">
//                 <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   placeholder="Enter your destination"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <FaCalendar className="absolute top-3 left-3 text-gray-400" />
//                 <DatePicker
//                   selected={date}
//                   onChange={(date) => setDate(date)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <FaCamera className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {userImage && (
//               <div className="mt-4">
//                 <p className="text-sm text-gray-600 mb-2">Preview:</p>
//                 <img
//                   src={userImage}
//                   alt="User uploaded"
//                   className="w-32 h-32 object-cover rounded-lg"
//                 />
//               </div>
//             )}

//             {error && (
//               <div className="bg-red-50 text-red-500 p-3 rounded-lg">
//                 {error}
//               </div>
//             )}

//             {weather && (
//               <div className="bg-blue-50 p-4 rounded-lg">
//                 <h4 className="font-semibold text-lg mb-2">Current Weather in {location}</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-600">Temperature</p>
//                     <p className="font-semibold">{Math.round(weather.main.temp)}°C</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Weather</p>
//                     <p className="font-semibold">{weather.weather[0].main}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Humidity</p>
//                     <p className="font-semibold">{weather.main.humidity}%</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Wind Speed</p>
//                     <p className="font-semibold">{weather.wind.speed} m/s</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {outfits.length > 0 && (
//               <div className="mt-6">
//                 <h4 className="text-2xl font-semibold mb-4">Recommended Outfits</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {outfits.map((outfit, index) => (
//                     <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
//                       <div className="relative group">
//                         <img 
//                           src={outfit.thumbnail} 
//                           alt={`Outfit ${index + 1}`} 
//                           className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                         />
//                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       </div>
                      
//                       <div className="p-4">
//                         <div className="flex flex-col gap-2">
//                           <button 
//                             onClick={() => window.open(`https://www.amazon.com/dp/${outfit.asin}`, '_blank')}
//                             className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
//                           >
//                             <ExternalLink className="w-4 h-4" />
//                             View on Amazon
//                           </button>
                          
//                           <button 
//                             onClick={() => {/* Add try on functionality */}}
//                             className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
//                           >
//                             <Shirt className="w-4 h-4" />
//                             Try On
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full bg-blue-500 text-white py-3 px-6 rounded-lg transition-colors duration-200 ${
//                 loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
//               }`}
//             >
//               {loading ? 'Loading...' : 'Generate Outfit Suggestions'}
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Vacation;

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar, FaMapMarkerAlt, FaCamera, FaTimes } from 'react-icons/fa';
import { ExternalLink, Shirt } from 'lucide-react';
import Navbar from '../components/Navbar';

function Vacation() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [userImage, setUserImage] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [outfits, setOutfits] = useState([]);
  // New state for try-on feature
  const [tryOnImage, setTryOnImage] = useState(null);
  const [tryOnLoading, setTryOnLoading] = useState(false);
  const [showTryOnModal, setShowTryOnModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const gender = "male"
      const formData = {location, date, gender}
      
      console.log(formData)
      const response = await axios.post('http://localhost:4700/model', formData);
      const { weatherData, thumbnails } = response.data.payload;
      
      setWeather(weatherData);
      setOutfits(thumbnails);
    } catch (err) {
      console.log(err)
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

  // New try-on handler
  const handleTryOn = async (outfit) => {
    if (!userImage) {
      alert('Please upload your image first');
      return;
    }

    setTryOnLoading(true);
    setShowTryOnModal(true);

    try {
      const response = await axios.post('http://localhost:4700/model/try-on', {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Try-on Modal */}
      {showTryOnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full relative">
            <button
              onClick={() => {
                setShowTryOnModal(false);
                setTryOnImage(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Virtual Try-On Result</h3>
              <div className="flex justify-center">
                {tryOnLoading ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : tryOnImage ? (
                  <img
                    src={tryOnImage}
                    alt="Try-on result"
                    className="max-h-96 object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Processing try-on...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Plan Your Perfect Vacation Outfit
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Existing form inputs */}
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

            {outfits.length > 0 && (
              <div className="mt-6">
                <h4 className="text-2xl font-semibold mb-4">Recommended Outfits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {outfits.map((outfit, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                      <div className="relative group">
                        <img 
                          src={outfit.thumbnail} 
                          alt={`Outfit ${index + 1}`} 
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="p-4">
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => window.open(`https://www.amazon.com/dp/${outfit.asin}`, '_blank')}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View on Amazon
                          </button>
                          
                          <button 
                            onClick={() => handleTryOn(outfit)}
                            disabled={tryOnLoading}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-200 
                              ${tryOnLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                          >
                            <Shirt className="w-4 h-4" />
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
              className={`w-full bg-blue-500 text-white py-3 px-6 rounded-lg transition-colors duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {loading ? 'Loading...' : 'Generate Outfit Suggestions'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Vacation;