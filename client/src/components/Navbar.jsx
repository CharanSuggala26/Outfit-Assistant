import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useUser,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-teal-300 shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-gray-800">
          AI Vacation Outfit Assistant
        </Link>

        {/* Navbar Menu with routed links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-gray-900">Services</Link>
          <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>

        {/* Menu Button for moblies i.e used for small screens*/}
        <button className="md:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown for smaller screens */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-6 py-4 bg-white shadow-lg">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-gray-900">Services</Link>
          <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>

          {/* Mobile Auth Buttons */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      )}
    </nav>
  );
};

export default Navbar;





