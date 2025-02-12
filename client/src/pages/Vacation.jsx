import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar, FaMapMarkerAlt, FaCloudSun, FaCamera, FaVideo } from 'react-icons/fa';
import Navbar from '../components/Navbar';

function Vacation() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [userImage, setUserImage] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { location, date, userImage });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Navbar */}

      <Navbar />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Plan Your Perfect Vacation Outfit
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Location Input */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your destination"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Date Picker */}
              <div className="relative">
                <FaCalendar className="absolute top-3 left-3 text-gray-400" />
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="relative">
                <FaCamera className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* Image Preview */}
            {userImage && (
              <div className="mt-4 flex flex-col items-center">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={userImage}
                  alt="User uploaded"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-md"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
            >
              Generate Outfit Suggestions
            </button>
          </form>
        </div>

        {/* How It Works Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FaMapMarkerAlt className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-blue-500 text-xl font-semibold mb-2">Choose Location</h4>
              <p className="text-gray-600">Enter your vacation destination</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FaCloudSun className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-blue-500 text-xl font-semibold mb-2">Weather Analysis</h4>
              <p className="text-gray-600">We check the weather for your dates</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FaVideo className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-blue-500 text-xl font-semibold mb-2">Virtual Try-On</h4>
              <p className="text-gray-600">See how outfits look on you</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Vacation;
