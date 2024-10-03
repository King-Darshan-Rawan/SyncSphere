import React from "react";
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import MeetPage from "./Pages/MeetPage";
import ChatPage from "./Pages/ChatPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meet" element={<MeetPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
