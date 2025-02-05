import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopNavbar from "./components/TopNavBar";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Video from "./components/Video";
import "./App.css"; // Import the main App styles

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        {/* Top Navbar */}
        <TopNavbar />
        <div className="flex flex-1">
          {/* Sidebar */}
          <Navbar />
          {/* Main Content Area */}
          <div className="flex-1 bg-[#F1F5F9] lg:pl-70 sm:pl-10 sm:pt-20 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/video" element={<Video />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
