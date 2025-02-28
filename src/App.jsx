import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Video from "./components/Video";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import "./components/global.css"; // Import the global CSS file

function App() {
  const { chatid: paramChatId } = useParams(); // Get chatid from URL

  const [chatid, setChatId] = useState(paramChatId); // Store chat ID in state
  const [isCollapsed, setIsCollapsed] = useState(false);

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <div className="App min-h-screen flex flex-col bg-[var(--bg-dark)]">
              <div className="flex flex-1 flex-col md:flex-row">
                <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div
                  className={`flex-1 transition-all duration-300  sm:pl-6 md:p-0 ${
                    isCollapsed ? "w-full md:pl-0" : "md:pl-64"
                  } overflow-auto`}
                >
                  <Routes>
                    <Route path="chat/:chatid" element={<Home />} />
                    <Route path="notes/:moduleId" element={<Notes />} />
                    <Route path="notes/:moduleId/:subtopicId" element={<Notes />} />
                    <Route path="formaAi" element={<Video />} />
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