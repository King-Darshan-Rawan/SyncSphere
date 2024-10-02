import React, { useState } from "react";
import { Link } from "react-router-dom"; // Correct import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          MyWebsite
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          <Link to="/services" className="text-white hover:text-gray-300">Services</Link>
          <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
        </div>
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link to="/" className="block text-white hover:text-gray-300">Home</Link>
          <Link to="/about" className="block text-white hover:text-gray-300">About</Link>
          <Link to="/services" className="block text-white hover:text-gray-300">Services</Link>
          <Link to="/contact" className="block text-white hover:text-gray-300">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
