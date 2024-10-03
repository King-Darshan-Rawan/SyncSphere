import React from "react";
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Informative/Home";
import About from "./Pages/Informative/About";
import Services from "./Pages/Informative/Services";
import Contact from "./Pages/Informative/Contact";
import MeetPage from "./Pages/Subjective/MeetPages/MeetPage";
import ChatPage from "./Pages/Subjective/ChatPages/ChatPage";
import SignIn from "./Pages/Permitive/SingIn";
import SignUp from "./Pages/Permitive/SingUp";
import ChatList from "./Pages/Subjective/ChatPages/ChatList";
function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meet" element={<MeetPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:chatid" element={<ChatList />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SingUp" element={<SignUp />} />
      </Routes>
      <br />
      <br />
      <Footer/>
    </Router>
  );
}

export default App;
