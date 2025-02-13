  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import {
    ChevronLeft,
    ChevronRight,
    Notebook,
    Bot,
    PlayCircle,
    LogOut,
    ChevronDown,
  } from "lucide-react";

  function Navbar({ isCollapsed, setIsCollapsed }) {
    const [notesExpanded, setNotesExpanded] = useState(true);
    const [selectedSemester, setSelectedSemester] = useState("Semester 1");
    const [selectedSubject, setSelectedSubject] = useState("Subject 1");

    const semesters = ["Sem 2"];
    const subjects = {
      
      "Semester 2": ["Programmning In C"],
    };

    return (
      <div className={`fixed top-2 left-2 z-50 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
        {/* Title Section */}
        <div className="bg-[#1F1F1F] text-white flex items-center justify-between py-3 px-3 rounded-lg shadow-md">
          <div className={` bg-[#5570F1] ${isCollapsed ? "rounded-md w-0 h-0" : "rounded-lg w-10 h-10"} flex items-center justify-center shadow-lg`}>
            <span className={` ${isCollapsed ? "hidden" : "text-white font-bold text-2xl"}`}>E</span>
          </div>
          {!isCollapsed && (
            <h1 className="text-lg font-bold tracking-wide">
              <span className="text-[#5570F1]">ED</span>FORMA
            </h1>
          )}
          <button
            className="p-2 rounded-md hover:bg-gray-700 transition"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        {/* Sidebar Main Section */}
        <div className={`bg-[#1F1F1F] h-[92vh] mt-2 rounded-2xl p-3 pb-15g shadow-lg flex flex-col justify-between transition-all duration-300 ${isCollapsed ? "w-18" : "w-64"}`}>
          <div className="space-y-2">
            {/* Forma */}
            {!isCollapsed && <h2 className="text-gray-400 px-2 text-sm font-medium">Forma</h2>}
            <Link
              to="/dashboard/chatbot"
              className="flex items-center space-x-3 py-2 px-3 rounded-md text-gray-300 hover:bg-[#5570F1] transition"
            >
              <Bot size={28} />
              {!isCollapsed && <span>FormaAi</span>}
            </Link>

            {/* Notes */}
            {!isCollapsed && <h2 className="text-gray-400 px-2 text-sm font-medium">Notes</h2>}
            <div>
              <Link
                to="/dashboard/notes/module-1"
                className="flex items-center justify-between w-full text-gray-300 py-2 px-3 rounded-md hover:bg-[#5570F1] transition"
                onClick={() => setNotesExpanded(!notesExpanded)}
              >
                <div className="flex items-center space-x-3">
                  <Notebook size={28} />
                  {!isCollapsed && <span>Programming In C</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown size={18} className={`transition ${notesExpanded ? "rotate-180" : ""}`} />
                )}
              </Link>
              {notesExpanded && !isCollapsed && (
                <div className="space-y-2 pl-4 mt-2">
                  {/* Semester & Subject Selection in the Same Row */}
                  <div className="flex space-x-2">
                    <select
                      className="w-1/2 bg-[#424242] text-gray-300 py-2 px-3 rounded-md cursor-pointer focus:outline-none"
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                    >
                      {semesters.map((sem) => (
                        <option key={sem} value={sem}>
                          {sem}
                        </option>
                      ))}
                    </select>

                    <select
                      className="w-1/2 bg-[#424242] text-gray-300 py-2 px-3 rounded-md cursor-pointer focus:outline-none"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      {subjects[selectedSemester]?.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>


                </div>
              )}
            </div>

            {/* Videos */}
            {!isCollapsed && <h2 className="text-gray-400 px-2 text-sm font-medium mt-2">Videos</h2>}
            <Link
              to="/dashboard/videos"
              className="flex items-center space-x-3 py-2 px-3 rounded-md text-gray-300 hover:bg-[#5570F1] transition"
            >
              <PlayCircle size={28} />
              {!isCollapsed && <span>Videos</span>}
            </Link>
          </div>

          {/* Log Out Button */}
          <button className="w-full flex items-center justify-center space-x-2 bg-[#5570F1] text-white py-2 rounded-md hover:bg-[#4256c2] transition">
            <LogOut size={18} />
            {!isCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </div>
    );
  }

  export default Navbar;