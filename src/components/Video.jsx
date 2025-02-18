import { useState, useEffect } from "react";
import { MessageSquare, Globe, Send, ShieldQuestionIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Notes from "./Notes"; // Assuming Notes is a separate component
import { motion } from "framer-motion"; // Import framer-motion

export default function Videos() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const handleSend = async (customQuestion = null) => {
    setIsTyping(false);
    setHasInteracted(true);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://renovation-ktu-node-server.onrender.com/api/v1/chat/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            branch: "CSE",
            semester: "S2",
            subject: "Programming-in-C",
            module: selectedModule || "Module_1",
            question: customQuestion || input + ` Add a follow-up question to keep the conversation going`,
          }),
        }
      );

      const data = await response.json();
      if (data.response) {
        setMessages((prev) => [...prev, { role: "assistant", text: data.response }]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { role: "assistant", text: "Failed to fetch response. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    handleSend(`You are a tutor for ${module}. Greet Karthik and ask for doubts.`);
  };

  // Show the dropdown only after user interaction
  const handleDropdownChange = (e) => {
    setSelectedModule(e.target.value);
    handleSend(`You are a tutor for ${e.target.value}. Greet Karthik and ask for doubts.`);
  };

  return (
    <div className={`flex flex-col-reverse sm:flex-row items-center h-screen bg-black text-white p-4 transition-all duration-300 ${selectedModule ? "justify-between" : "justify-center"}`}>
      <div className={`flex flex-col ${selectedModule ? "lg:w-1/2" : "w-[90%] sm:w-[400px]"} h-auto bg-gray-900 rounded-xl p-6 shadow-xl transition-all duration-300`}>
        {!hasInteracted && !isTyping && (
          <>
            <h2 className="text-xl font-semibold text-center mb-2 text-[#5570F1]">
              How can I help you today?
            </h2>
            <p className="text-center text-sm text-gray-400 pb-4">Select a module to begin!</p>
          </>
        )}

        {/* Display the dropdown only after the user has interacted */}
        {hasInteracted ? (
          <div className="mb-4">
            <label htmlFor="module" className="block text-gray-400 mb-2">
              Select Module
            </label>
            <select
              id="module"
              value={selectedModule || ""}
              onChange={handleDropdownChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none border border-[#5570F1] focus:border-[#7290F3] transition"
            >
              <option value="" disabled>
                Select a module
              </option>
              <option value="Module_1">Module_1</option>
              <option value="Module_2">Module_2</option>
              <option value="Module_3">Module_3</option>
              <option value="Module_4">Module_4</option>
            </select>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-1 lg:grid-cols-2">
            <PromptButton
              icon={<ShieldQuestionIcon />}
              text="Module_1"
              onClick={() => handleModuleSelect("Module_1")}
            />
            <PromptButton
              icon={<ShieldQuestionIcon />}
              text="Module_2"
              onClick={() => handleModuleSelect("Module_2")}
            />
            <PromptButton
              icon={<ShieldQuestionIcon />}
              text="Module_3"
              onClick={() => handleModuleSelect("Module_3")}
            />
            <PromptButton
              icon={<ShieldQuestionIcon />}
              text="Module_4"
              onClick={() => handleModuleSelect("Module_4")}
            />
          </div>
        )}

{hasInteracted && (
          <div className="flex-1 overflow-y-auto space-y-3 p-2 mb-4 max-h-[60vh]">
      
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-lg text-sm w-fit max-w-[80%] ${msg.role === "user" ? "bg-[#5570F1] ml-auto" : "bg-gray-700 mr-auto"}`}>
                {msg.role === "assistant" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isLoading && <div className="p-2 rounded-lg text-sm w-fit max-w-[80%] bg-gray-700">Analyzing...</div>}
          </div>
        )}
       {hasInteracted&&
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
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none border border-[#5570F1] focus:border-[#7290F3] transition"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#5570F1] hover:bg-[#7290F3] text-white rounded-lg transition"
            onClick={() => handleSend()}
            disabled={isLoading}
          >
            <Send size={18} />
          </button>
       
        </div>}
      </div>

      {/* Notes section with framer-motion animation */}
      <motion.div
        className={`flex flex-col items-center justify-center transition-all duration-300 ${selectedModule ? "lg:w-1/2" : "hidden"}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {selectedModule && <Notes module_id1={selectedModule.toLowerCase()} />}
      </motion.div>
    </div>
  );
}

function PromptButton({ icon, text, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className="flex flex-col items-center p-2 bg-gray-800 rounded-lg hover:bg-[#5570F1] hover:text-white transition"
    >
      {icon}
      <span className="text-xs mt-1">{text}</span>
    </motion.button>
  );
}
