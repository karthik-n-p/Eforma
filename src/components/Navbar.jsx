import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Notebook, Bot, PlayCircle, LogOut } from "lucide-react";

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true); // Auto-collapse on small screens
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle Collapsed State
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-[#5570F1] text-white rounded-md md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1F1F1F] shadow-lg transition-all duration-300 z-40
          ${isMobileOpen ? "w-64 translate-x-0" : isCollapsed ? "w-16 md:w-16" : "w-64"} 
          ${isMobileOpen ? "md:translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo Section */}
        <div className="flex items-center py-4 px-4 bg-[#1F1F1F] text-white shadow-md">
          <div className="flex items-center space-x-2">
            <div className="bg-[#5570F1] rounded-lg w-10 h-10 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            {!isCollapsed || isMobileOpen ? (
              <h1 className="text-lg font-bold">
                <span className="text-[#5570F1]">ED</span>FORMA
              </h1>
            ) : null}
          </div>
          {/* Chevron Button to Toggle Collapse */}
          <button
            className="p-2 rounded-md hover:bg-gray-700 transition hidden md:block"
            onClick={toggleCollapse} // Fixed: This now properly toggles isCollapsed
            
          >
            {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="h-[92vh] mt-2 flex flex-col justify-between">
          <div className="space-y-2">
            <NavItem to="/dashboard/chatbot" icon={Bot} label="FormaAi" isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />
            <NavItem to="/dashboard/notes/module-1" icon={Notebook} label="Notes" isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />
            <NavItem to="/dashboard/videos" icon={PlayCircle} label="Videos" isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />
          </div>

          {/* Log Out Button Positioned Higher */}
          <div className="pb-20 px-4">
            <button
              className={`w-full flex items-center space-x-2 bg-[#5570F1] text-white py-3 rounded-md hover:bg-[#4058D6] transition
              ${isCollapsed ? "justify-center p-3" : "justify-center"}`}
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const NavItem = ({ to, icon: Icon, label, isCollapsed, isMobileOpen }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 py-3 px-2 text-gray-300 rounded-xl hover:bg-[#5570F1] transition
      ${isCollapsed && !isMobileOpen ? "justify-center" : "pl-4"}`}
  >
    <div className="p-2 bg-[#5570F1] bg-opacity-20 rounded-xl flex items-center justify-center">
      <Icon size={22} className="text-white" />
    </div>
    {!isCollapsed || isMobileOpen ? <span>{label}</span> : null}
  </Link>
);

export default Navbar;
