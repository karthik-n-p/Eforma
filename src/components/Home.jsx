import { useState } from "react";
import { MessageSquare, Globe, Send } from "lucide-react";

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to chat
      setMessages([...messages, { role: "user", text: input }]);
      setInput("");
      setIsTyping(false);
      setHasInteracted(true);
      setIsLoading(true); // Start loading animation

      try {
        // Call the API
        const response = await fetch(
          "https://renovation-ktu-node-server.onrender.com/api/v1/chat/ask",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              branch: "CSE",
              semester: "S8",
              subject: "Distributed-Computing",
              module: "module1",
              question: input,
            }),
          }
        );

        const data = await response.json();
        if (data.response) {
          // Add API response to chat
          setMessages((prev) => [
            ...prev,
            { role: "assistant", text: data.response },
          ]);
        }
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Failed to fetch response. Please try again." },
        ]);
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white p-4">
      {/* Chat Container */}
      <div
        className={`flex flex-col ${
          hasInteracted || isTyping ? "w-full h-full" : "w-[400px] h-[400px]"
        } bg-gray-900 rounded-xl p-6 shadow-xl transition-all duration-300`}
      >
        {/* Header & Description (Hidden on typing or after interaction) */}
        {!hasInteracted && !isTyping && (
          <>
            <h2 className="text-xl font-semibold text-center mb-2 text-[#5570F1]">
              How can I help you today?
            </h2>
            <p className="text-center text-sm text-gray-400 pb-4">
              Ask about Module 1, key topics, or step-by-step solutions!
            </p>

            {/* Saved Prompt Options */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <PromptButton icon={<MessageSquare />} text="Saved Prompts" />
              <PromptButton icon={<Globe />} text="Multilingual Support" />
              <PromptButton icon={<Send />} text="Media Upload" />
            </div>
          </>
        )}

        {/* Chat History */}
        <div className="flex-1  space-y-3 p-2 bg-gray-800 rounded-lg shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg text-sm w-fit max-w-[80%] ${
                msg.role === "user"
                  ? "bg-[#5570F1] ml-auto"
                  : "bg-gray-700 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="p-2 rounded-lg text-sm w-fit max-w-[80%] bg-gray-700">
              Analyzing...
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="mt-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setIsTyping(e.target.value.length > 0);
              if (!hasInteracted) setHasInteracted(true);
            }}
            placeholder="Type your prompt..."
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none border border-[#5570F1] focus:border-[#7290F3] transition"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#5570F1] hover:bg-[#7290F3] text-white rounded-lg transition"
            onClick={handleSend}
            disabled={isLoading}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function PromptButton({ icon, text }) {
  return (
    <button className="flex flex-col items-center p-2 bg-gray-800 rounded-lg hover:bg-[#5570F1] hover:text-white transition">
      {icon}
      <span className="text-xs mt-1">{text}</span>
    </button>
  );
}