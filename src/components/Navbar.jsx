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

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");
  const [selectedSubject, setSelectedSubject] = useState("Subject 1");

  const semesters = ["Sem 1", "Sem 2", "Sem 3", "Sem 4"];
  const subjects = {
    "Semester 1": ["Math", "Physics", "Chemistry"],
    "Semester 2": ["Data Structures", "OOP", "DBMS"],
    "Semester 3": ["OS", "Networks", "Algorithms"],
    "Semester 4": ["AI", "Machine Learning", "Big Data"],
  };

  return (
    <div className={`fixed top-2 left-2 z-50 transition-all duration-300 ${isCollapsed ? "w-30" : "w-64"}`}>
      {/* Title Section */}
      <div className="bg-[#1F1F1F] text-white flex items-center justify-between py-3 px-3 rounded-lg shadow-md">
        <div className={`w-10 h-10 bg-[#5570F1] ${isCollapsed ? "rounded-md":"rounded-lg"} flex items-center justify-center shadow-lg`}>
          <span className="text-white font-bold text-2xl">E</span>
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
      <div className={`bg-[#1F1F1F] h-[92vh] mt-2 rounded-2xl p-3 pb-6 shadow-lg flex flex-col justify-between transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
        <div className="space-y-2">
          {/* Forma */}
          {!isCollapsed && <h2 className="text-gray-400 px-2 text-sm font-medium">Forma</h2>}
          <Link
            to="/dashboard/chatbot"
            className="flex items-center space-x-3 py-2 px-3 rounded-md text-gray-300 hover:bg-[#1A1F2E] transition"
          >
            <Bot size={18} />
            {!isCollapsed && <span>FormaAi</span>}
          </Link>

          {/* Notes */}
          {!isCollapsed && <h2 className="text-gray-400 px-2 text-sm font-medium">Notes</h2>}
          <div>
            <button
              className="flex items-center justify-between w-full  text-gray-300 py-2 px-3 rounded-md hover:bg-[#1A1F2E] transition"
              onClick={() => setNotesExpanded(!notesExpanded)}
            >
              <div className="flex items-center space-x-3">
                <Notebook size={18} />
                {!isCollapsed && <span>Distributed Computing</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown size={18} className={`transition ${notesExpanded ? "rotate-180" : ""}`} />
              )}
            </button>
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

                {['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'].map((module) => (
                  <Link
                    key={module}
                    to={`/notes/${module.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center space-x-2 text-gray-400 py-1 px-2 hover:bg-[#1A1F2E] rounded-md transition"
                  >
                    <Notebook size={16} />
                    <span>{module}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Videos */}
          {!isCollapsed && <h2 className="text-gray-400 px-2 text-sm font-medium mt-2">Videos</h2>}
          <Link
            to="/videos"
            className="flex items-center space-x-3  py-2 px-3 rounded-md text-gray-300 hover:bg-[#1A1F2E] transition"
          >
            <PlayCircle size={18} />
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