import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Video from "./components/Video";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <div className="App min-h-screen flex flex-col">
              <div className="flex flex-1 ">
                <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div
                  className={`flex-1 bg-[#0D0F12] transition-all duration-300 ${
                    isCollapsed ? "pl-15" : "lg:pl-70 sm:pl-10"
                  } overflow-none`}
                >
                  <Routes>
                    <Route path="chatbot" element={<Home />} />
                    <Route path="notes/:moduleId" element={<Notes />} />
                    <Route path="notes/:moduleId/:subtopicId" element={<Notes />} />
                    <Route path="videos" element={<Video />} />
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
