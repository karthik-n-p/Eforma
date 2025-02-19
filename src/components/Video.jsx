import { useState, useEffect } from "react";
import { MessageSquare, Globe, Send, BookOpen, StickyNote, X, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Notes from "./Notes";
import { motion, AnimatePresence } from "framer-motion";

export default function Videos() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showNotes, setShowNotes] = useState(true); // Show notes by default when a module is selected

  const handleSend = async (customQuestion = null, skipUserMessage = false) => {
    setIsTyping(false);
    setHasInteracted(true);

    const userMessage = customQuestion || input;
    if (!skipUserMessage) {
      setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://renovation-ktu-node-server.onrender.com/api/v1/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branch: "CSE",
          semester: "S2",
          subject: "Programming-in-C",
          module: selectedModule || "Module_1",
          question: userMessage,
        }),
      });

      const data = await response.json();
      if (data.response) {
        setMessages((prev) => [...prev, { role: "assistant", text: data.response }]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { role: "assistant", text: "Failed to fetch response. Please try again." }]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setShowNotes(true); // Show notes panel when a module is selected
    handleSend(`You are a tutor for ${module}. Greet user and ask for doubts.`, true);
  };

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen bg-gray-950 text-white p-4 transition-all duration-300">
      {/* Chat Container */}
      <div className={`flex flex-col ${selectedModule ? "lg:w-full" : "w-full max-w-[400px]"} h-auto rounded-xl p-6 bg-gray-900 shadow-lg transition-all duration-300 mx-auto`}>
        {!hasInteracted && !isTyping && (
          <>
            <h2 className="text-xl font-semibold text-center mb-2 text-[#5570F1]">How can I help you today?</h2>
            <p className="text-center text-sm text-gray-400 pb-4">Select a module to begin!</p>
          </>
        )}

        {hasInteracted ? (
          <div className="mb-4">
            <label htmlFor="module" className="block text-gray-400 mb-2">Select Module</label>
            <select
              id="module"
              value={selectedModule || ""}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none border border-[#5570F1] focus:border-[#8B5CF6] transition"
            >
              <option value="" disabled>Select a module</option>
              {["Module_1", "Module_2", "Module_3", "Module_4"].map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {["Module_1", "Module_2", "Module_3", "Module_4"].map(module => (
              <PromptButton key={module} icon={<BookOpen size={20} />} text={module} onClick={() => handleModuleSelect(module)} />
            ))}
          </div>
        )}

        {hasInteracted && (
          <div className="flex-1 overflow-y-auto space-y-3 p-2 mb-4 max-h-[40vh]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-sm w-fit max-w-[80%] ${
                  msg.role === "user" ? "bg-[#5570F1] ml-auto" : "bg-gray-800 mr-auto"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isLoading && (
              <div className="p-3 rounded-lg text-sm w-fit max-w-[80%] bg-gray-800">
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">Analyzing...</span>
                </span>
              </div>
            )}
          </div>
        )}

        {hasInteracted && (
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setIsTyping(e.target.value.length > 0);
                if (!hasInteracted) setHasInteracted(true);
              }}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
              placeholder="Type your prompt..."
              className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none border border-[#5570F1] focus:border-[#8B5CF6] transition"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#5570F1] hover:bg-[#8B5CF6] text-white rounded-lg transition"
              onClick={() => handleSend()}
              disabled={isLoading}
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Notes Panel */}
      <AnimatePresence>
        {showNotes && selectedModule ? (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed right-4 sm:relative sm:w-1/2 h-[70vh] bg-gray-900 overflow-y-auto rounded-lg shadow-lg"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Notes for {selectedModule}</h3>
              {selectedModule && <Notes module_id1={selectedModule.toLowerCase()} />}
            </div>
            <button onClick={toggleNotes} className="absolute top-2 right-2 p-2 bg-red-500 rounded-full">
              <X size={16} />
            </button>
          </motion.div>
        ) : (
          <button onClick={toggleNotes} className="fixed top-16 right-4 bg-[#5570F1] p-3 rounded-full shadow-lg hover:bg-[#8B5CF6] transition">
            <ChevronRight size={24} className="text-white" />
            <span className="text-sm ml-2">{selectedModule}</span> {/* Show currently loaded module */}
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}

function PromptButton({ icon, text, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-[#5570F1] hover:text-white transition"
    >
      {icon}
      <span className="text-sm mt-2">{text}</span>
    </motion.button>
  );
}