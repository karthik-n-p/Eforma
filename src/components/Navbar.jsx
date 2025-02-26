import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut, MessageSquare, Plus, NotebookIcon, Edit } from "lucide-react";

function Navbar({ isCollapsed, setIsCollapsed }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const userId = localStorage.getItem("userId");
  console.log(userId)
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPreviousChats();
    }
  }, [userId]);

  const fetchPreviousChats = async () => {
    try {
      const response = await fetch(`https://renovation-ktu-node-server.onrender.com/api/v1/chat/titles?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setPreviousChats(data.chats);
      }
    } catch (error) {
      console.error("Error fetching previous chats:", error);
    }
  };

  const handleNewChat = async () => {
    
        // Navigate after state update
        navigate(`/dashboard/chat/:chatid`);
  
     
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleEditTitle = (chatId, currentTitle) => {
    setEditingChatId(chatId);
    setNewTitle(currentTitle);
  };

  const handleUpdateTitle = async (chatId) => {
    try {
      const response = await fetch("https://renovation-ktu-node-server.onrender.com/api/v1/chat/update-title", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, newTitle }),
      });
      const data = await response.json();
      if (data.success) {
        setPreviousChats((prevChats) =>
          prevChats.map((chat) =>
            chat.chatId === chatId ? { ...chat, title: newTitle } : chat
          )
        );
        setEditingChatId(null);
        setNewTitle("");
      }
    } catch (error) {
      console.error("Error updating chat title:", error);
    }
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-[#5570F1] text-white rounded-md md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-[#1F1F1F] shadow-lg transition-all duration-300 z-40
          ${isMobileOpen ? "w-64 translate-x-0" : isCollapsed ? "w-16 md:w-16" : "w-64"} 
          ${isMobileOpen ? "md:translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center py-4 px-4 bg-[#1F1F1F] text-white shadow-md">
          <div className="flex items-center space-x-2">
            <div className="bg-[#5570F1] rounded-lg w-10 h-10 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            {!isCollapsed || isMobileOpen ? (
              <h1 className="text-lg font-bold">
                <span className="text-[#5570F1]">Ed</span>Forma
              </h1>
            ) : null}
          </div>
          <button className="p-2 rounded-md hover:bg-gray-700 transition hidden md:block" onClick={toggleCollapse}>
            {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        <div className="h-[92vh] mt-2 flex flex-col justify-between">
          <div className="space-y-2 px-2">
            <NavItem to="/dashboard/notes/module_1" icon={NotebookIcon} label="Notes" isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />

            <button
              onClick={handleNewChat}
              className={`w-full flex items-center space-x-3 py-3 px-2 text-gray-300 rounded-xl hover:bg-[#5570F1] transition
                ${isCollapsed && !isMobileOpen ? "justify-center" : "pl-4"}`}
            >
              <div className="p-2 bg-[#5570F1] bg-opacity-20 rounded-xl flex items-center justify-center">
                <Plus size={22} className="text-white" />
              </div>
              {!isCollapsed || isMobileOpen ? <span>New Chat</span> : null}
            </button>

            {/* Chat History */}
            {(!isCollapsed || isMobileOpen) && (
              <div className="overflow-y-auto max-h-[60vh] mt-2">
                <div className="text-gray-500 text-sm px-4 py-2">FormAI</div>
                {previousChats.length > 0 ? (
                  <div className="space-y-2">
                    {previousChats.map((chat) => (
                      <div key={chat.chatId} className="flex items-center justify-between">
                        {editingChatId === chat.chatId ? (
                          <div className="flex items-center space-x-2 w-full">
                            <input
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              className="w-full p-2 bg-gray-600 text-white rounded-md"
                            />
                            <button
                              onClick={() => handleUpdateTitle(chat.chatId)}
                              className="p-2 bg-[#5570F1] text-white rounded-md"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <NavItem
                            to={`/dashboard/chat/${chat.chatId}`}
                            label={chat.title}
                            isCollapsed={isCollapsed}
                            isMobileOpen={isMobileOpen}
                          />
                        )}
                        {!isCollapsed || isMobileOpen ? (
                          <button
                            onClick={() => handleEditTitle(chat.chatId, chat.title)}
                            className="p-2 text-gray-300 hover:bg-gray-600 rounded-md"
                          >
                            <Edit size={16} />
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center mt-4">No chat history available</p>
                )}
              </div>
            )}
          </div>

          <div className="pb-20 px-4">
            <Link to='/' className={`w-full flex items-center space-x-2 bg-[#5570F1] text-white py-3 rounded-md hover:bg-[#4058D6] transition
              ${isCollapsed ? "justify-center p-3" : "justify-center"}`}>
              <LogOut size={24} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const NavItem = ({ to, icon: Icon, label, isCollapsed, isMobileOpen }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 py-3 px-2 text-gray-300 rounded-xl hover:bg-[#2D2D2D] transition
      ${isCollapsed && !isMobileOpen ? "justify-center" : "pl-4"}`}
  >
    {Icon && (
      <div className="p-2 bg-[#5570F1] bg-opacity-20 rounded-xl flex items-center justify-center">
        <Icon size={22} className="text-white" />
      </div>
    )}
    {!isCollapsed || isMobileOpen ? <span className="truncate w-40">{label}</span> : null}
  </Link>
);

export default Navbar;