import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut, MessageSquare, Plus, NotebookIcon, Edit } from "lucide-react";

function Navbar({ isCollapsed, setIsCollapsed }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();

if (!userId) {
  console.error("User ID is not available in localStorage");
  // Handle the case where userId is missing (e.g., redirect to login)
}
  // Extract chatid from the URL path
  const pathSegments = location.pathname.split("/"); // Split the URL path into segments
  const currentChatId = pathSegments[pathSegments.length - 1]; // Get the last segment
  console.log("Current Chat ID:", currentChatId); // Debugging

  // Fetch previous chats
  useEffect(() => {
    if (currentChatId) {
      fetchPreviousChats();
    }
  }, [currentChatId]);

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
        className="fixed top-4 left-4 z-50 p-2 bg-[var(--primary)] text-[var(--text-primary)] rounded-md md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-[var(--bg-darker)] shadow-lg transition-all duration-300 z-40
          ${isMobileOpen ? "w-64 translate-x-0" : isCollapsed ? "w-16 md:w-16" : "w-64"} 
          ${isMobileOpen ? "md:translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center py-4 px-4 bg-[var(--bg-darker)] text-[var(--text-primary)] shadow-md">
          <div className="flex items-center space-x-2">
            <div className="bg-[var(--primary)] rounded-lg w-10 h-10 flex items-center justify-center shadow-lg">
              <span className="text-[var(--text-primary)] font-bold text-2xl">E</span>
            </div>
            {!isCollapsed || isMobileOpen ? (
              <h1 className="text-lg font-bold">
                <span className="text-[var(--primary)]">Ed</span>Forma
              </h1>
            ) : null}
          </div>
          <button className="p-2 rounded-md hover:bg-[var(--bg-light)] transition hidden md:block" onClick={toggleCollapse}>
            {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        <div className="h-[92vh] mt-2 flex flex-col justify-between">
          <div className="space-y-2 px-2">
            <NavItem to="/dashboard/notes/module-1" icon={NotebookIcon} label="Notes" isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />

            <button
              onClick={handleNewChat}
              className={`w-full flex items-center space-x-3 py-3 px-2 text-[var(--text-secondary)] rounded-xl hover:bg-[var(--primary)] transition
                ${isCollapsed && !isMobileOpen ? "justify-center" : "pl-4"}`}
            >
              <div className="p-2 bg-[var(--primary-light)] rounded-xl flex items-center justify-center">
                <Plus size={22} className="text-[var(--text-primary)]" />
              </div>
              {!isCollapsed || isMobileOpen ? <span>New Chat</span> : null}
            </button>

            {/* Chat History */}
            {(!isCollapsed || isMobileOpen) && (
              <div className="overflow-y-auto max-h-[60vh] mt-2">
                <div className="text-[var(--text-secondary)] text-sm px-4 py-2">FormAI</div>
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
                              className="w-full p-2 bg-[var(--bg-light)] text-[var(--text-primary)] rounded-md"
                            />
                            <button
                              onClick={() => handleUpdateTitle(chat.chatId)}
                              className="p-2 bg-[var(--primary)] text-[var(--text-primary)] rounded-md"
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
                            isActive={chat.chatId === currentChatId} // Pass isActive prop
                          />
                        )}
                        {!isCollapsed || isMobileOpen ? (
                          <button
                            onClick={() => handleEditTitle(chat.chatId, chat.title)}
                            className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-light)] rounded-md"
                          >
                            <Edit size={16} />
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[var(--text-secondary)] text-sm text-center mt-4">No chat history available</p>
                )}
              </div>
            )}
          </div>

          <div className="pb-20 px-4">
            <Link to='/' className={`w-full flex items-center space-x-2 bg-[var(--primary)] text-[var(--text-primary)] py-3 rounded-md hover:bg-[var(--primary-hover)] transition
              ${isCollapsed ? "justify-center p-3" : "justify-center"}`}>
              <LogOut size={24} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const NavItem = ({ to, icon: Icon, label, isCollapsed, isMobileOpen, isActive }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 py-3 px-2 text-[var(--text-secondary)] rounded-xl hover:bg-[var(--bg-light)] transition
      ${isCollapsed && !isMobileOpen ? "justify-center" : "pl-4"}
      ${isActive ? "bg-[var(--primary)] text-[var(--text-primary)]" : ""}`} // Apply active style
  >
    {Icon && (
      <div className="p-2 bg-[var(--primary-light)] rounded-xl flex items-center justify-center">
        <Icon size={22} className="text-[var(--text-primary)]" />
      </div>
    )}
    {!isCollapsed || isMobileOpen ? <span className="truncate w-40">{label}</span> : null}
  </Link>
);

export default Navbar;
