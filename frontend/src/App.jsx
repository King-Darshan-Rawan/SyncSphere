import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./../Components/Navbar";
import Home from "./../Pages/Home";
import About from "./../Pages/About";
import Services from "./../Pages/Services";
import Contact from "./../Pages/Contact";
import './index.css'; 
function App() {
  return (
    <Router>
      <Navbar />
      <div className='bg-black text-white'>
        jbchhjqbhugc
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
