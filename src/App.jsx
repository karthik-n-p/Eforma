// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopNavbar from "./components/TopNavbar";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Video from "./components/Video";
import LandingPage from "./components/LandingPage"; // Import the new landing page

import "./App.css"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <div className="App min-h-screen flex flex-col " >
              <div className="flex flex-1 ">
                <Navbar />
                <div className="flex-1 bg-[#0D0F12] lg:pl-70 sm:pl-10 sm:pt-20 overflow-auto">
                  <Routes>
                    <Route path="/chatbot" element={<Home />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/video" element={<Video />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
