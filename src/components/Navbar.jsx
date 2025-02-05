import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, FileText, Video } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 md:hidden z-50 bg-white p-2 rounded shadow-md text-[#9297AA]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`bg-white  h-screen fixed top-0 left-0 z-50 p-8 transition-transform duration-300 w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#5570F1] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
              <span className="text-[#5570F1]">ED</span>FORMA
            </h1>
          </div>
        </div>

        {/* Menu Items */}
        <ul className="space-y-8">
          <li>
            <Link
              to="/"
              className={`flex items-center space-x-4 py-3 px-6 rounded-lg text-lg ${
                location.pathname === "/"
                  ? "text-[#5570F1] bg-[#DEE6FF]"
                  : "text-[#9297AA] hover:text-[#5570F1] hover:bg-gray-100"
              }`}
            >
              <Home size={24} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/notes"
              className={`flex items-center space-x-4 py-3 px-6 rounded-lg text-lg ${
                location.pathname === "/notes"
                  ? "text-[#5570F1] bg-[#DEE6FF]"
                  : "text-[#9297AA] hover:text-[#5570F1] hover:bg-gray-100"
              }`}
            >
              <FileText size={24} />
              <span>Notes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/video"
              className={`flex items-center space-x-4 py-3 px-6 rounded-lg text-lg ${
                location.pathname === "/video"
                  ? "text-[#5570F1] bg-[#DEE6FF]"
                  : "text-[#9297AA] hover:text-[#5570F1] hover:bg-gray-100"
              }`}
            >
              <Video size={24} />
              <span>Video</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Navbar;
