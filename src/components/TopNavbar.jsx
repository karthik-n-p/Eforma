import React from "react";
import { Search, User } from "lucide-react"; // Importing lucide-react icons
import { BsDiscord } from "react-icons/bs"; // Importing Discord icon from react-icons

function TopNavbar() {
  return (
    <div className="bg-white fixed top-0 left-0 w-full z-40 px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo or Title */}
   

      {/* Desktop and Mobile Layout (Responsive) */}
      <div className="flex items-center space-x-4 sm:space-x-6 w-full justify-end">
        {/* Desktop-Only Search Bar */}
        <div className="relative hidden w-full max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            className="pl-5 pr-4 py-2 text-sm border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5570F1]"
          />
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-[#5570F1]"
          />
        </div>

        {/* Mobile-Only Search Bar */}
     

        {/* Discord Icon */}
        <button
          className="p-3 sm:p-4 rounded-full bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-[#5570F1]"
          aria-label="Discord"
        >
          <BsDiscord size={20} className="text-[#5570F1]" />
        </button>

        {/* Profile Icon */}
        <button
          className="p-3 sm:p-4 rounded-full bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-[#5570F1]"
          aria-label="Profile"
        >
          <User size={20} className="text-[#5570F1]" />
        </button>
      </div>
    </div>
  );
}

export default TopNavbar;
