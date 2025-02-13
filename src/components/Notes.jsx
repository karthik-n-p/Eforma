import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, ChevronDown, ChevronUp, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import moduleData from "../../../gemini_test/pdfs/ktu_modules.json";

const Notes = () => {
  const { moduleId, subtopicId } = useParams();
  const decodedSubtopicId = decodeURIComponent(subtopicId || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedModule, setExpandedModule] = useState(null);
  const [xp, setXp] = useState(0);
  const [completedSubtopicIds, setCompletedSubtopicIds] = useState([]);
  const [level, setLevel] = useState(1);
  const [isLevelUp, setIsLevelUp] = useState(false); // State to trigger level-up animation

  // Extract modules from JSON data
  const modules = moduleData[0].modules.map((module) => ({
    id: module.module_name.toLowerCase().replace(/\s+/g, "-"),
    name: module.module_name,
    description: module.description,
    subtopics: module.subtopics.map((subtopic) => ({
      id: subtopic.subtopic_name.toLowerCase().replace(/\s+/g, "-"),
      name: subtopic.subtopic_name,
      content: subtopic.content,
      keywords: subtopic.keywords,
      questions: subtopic.questions,
    })),
    question_bank: module.question_bank,
  }));

  // Universal Search
  const filteredModules = modules
    .map((module) => ({
      ...module,
      subtopics: module.subtopics.filter(
        (subtopic) =>
          module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          subtopic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          subtopic.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          subtopic.keywords.join(" ").toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((module) => module.subtopics.length > 0 || module.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const selectedModule = modules.find((module) => module.id === moduleId);
  const selectedSubtopic = selectedModule?.subtopics.find((subtopic) => subtopic.id === decodedSubtopicId);

  // Toggle module expansion
  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  // Mark subtopic as completed and award XP
  const markSubtopicAsCompleted = (subtopicId) => {
    if (!completedSubtopicIds.includes(subtopicId)) {
      setCompletedSubtopicIds([...completedSubtopicIds, subtopicId]);
      setXp((prevXp) => {
        const newXp = prevXp + 10;
        if (newXp >= 100) {
          setLevel((prevLevel) => prevLevel + 1);
          setIsLevelUp(true); // Trigger level-up animation
          setTimeout(() => setIsLevelUp(false), 1000); // Reset animation after 1 second
          return newXp % 100; // Reset XP after leveling up
        }
        return newXp;
      });
    }
  };

  const isSubtopicCompleted = (subtopicId) => completedSubtopicIds.includes(subtopicId);

  // Mark subtopic as completed when viewed
  useEffect(() => {
    if (selectedSubtopic && !isSubtopicCompleted(selectedSubtopic.id)) {
      markSubtopicAsCompleted(selectedSubtopic.id);
    }
  }, [selectedSubtopic]);

  if (!selectedModule) {
    return <div className="flex-1 p-8 overflow-y-auto">Module not found.</div>;
  }

  return (
    <div className="p-6 flex h-screen bg-[#0D0F12] text-white">
      {/* Sidebar */}
      <motion.div
        className="bg-[#1A1D21] p-4 border-r border-gray-800 w-64"
        initial={{ width: 256 }}
        animate={{ width: 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Search Bar */}
        <motion.div
          className="relative mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2D2F33] text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5570F1]"
          />
          <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
        </motion.div>

        {/* Module List */}
        <div className="space-y-2">
          {filteredModules.map((module) => (
            <div key={module.id}>
              <motion.div
                className={`flex items-center justify-between py-2 px-3 rounded-md text-gray-300 hover:bg-[#5570F1] transition cursor-pointer ${
                  moduleId === module.id ? "bg-[#5570F1]" : ""
                }`}
                onClick={() => toggleModule(module.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{module.name}</span>
                <button className="p-1 rounded-md hover:bg-gray-700 transition">
                  {expandedModule === module.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </motion.div>
              <AnimatePresence>
                {expandedModule === module.id && (
                  <motion.div
                    className="pl-4 mt-2 space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {module.subtopics.map((subtopic) => (
                      <Link
                        key={subtopic.id}
                        to={`/dashboard/notes/${module.id}/${encodeURIComponent(subtopic.id)}`}
                        className={`flex items-center space-x-2 py-1 px-2 rounded-md text-gray-300 hover:bg-[#5570F1] transition ${
                          decodedSubtopicId === subtopic.id ? "bg-[#5570F1]" : ""
                        }`}
                      >
                        {/* Strikethrough effect for completed subtopics */}
                        <span
                          className={`${
                            isSubtopicCompleted(subtopic.id) ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {subtopic.name}
                        </span>
                        {isSubtopicCompleted(subtopic.id) && (
                          <Check size={16} className="text-[#4ADE80]" /> // Minimal check icon
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* XP Tracker */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            {/* Level Badge with Glow Animation */}
            <motion.div
              className="flex items-center space-x-3"
              animate={{
                scale: isLevelUp ? 1.1 : 1,
                boxShadow: isLevelUp ? "0 0 10px 2px rgba(85, 112, 241, 0.8)" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#5570F1] text-white px-3 py-1 rounded-full text-sm font-semibold">
                Level {level}
              </div>
              <div className="text-lg font-semibold text-[#5570F1]">
                {xp}/100 XP
              </div>
            </motion.div>

            {/* Progress Bar with Glow Animation */}
            <motion.div
              className="w-1/2 bg-gray-800 rounded-full h-2.5 relative"
              animate={{
                boxShadow: isLevelUp ? "0 0 10px 2px rgba(74, 222, 128, 0.8)" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-[#4ADE80] h-2.5 rounded-full"
                style={{ width: `${xp}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${xp}%` }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </motion.div>

        <h1 className="text-3xl font-bold text-[#5570F1] mb-6">{selectedModule?.name || "Select a Module"}</h1>

        {/* Module Description */}
        {selectedModule && <p className="text-gray-300 mb-6">{selectedModule.description}</p>}

        {/* Subtopic Content */}
        {selectedSubtopic ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-[#5570F1] mb-4">{selectedSubtopic.name}</h2>
            <p className="text-gray-300 mb-2">{selectedSubtopic.content}</p>
            <div className="text-sm text-gray-400">
              <strong>Keywords:</strong> {selectedSubtopic.keywords.join(", ")}
            </div>
            <div className="text-sm text-gray-400">
              <strong>Questions:</strong> {selectedSubtopic.questions.join("; ")}
            </div>
          </motion.div>
        ) : (
          <p className="text-gray-300">Select a subtopic to view its content.</p>
        )}

        {/* Question Bank */}
        {selectedModule?.question_bank && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-[#5570F1] mb-4">Question Bank</h2>
            <ul className="list-disc pl-5 text-gray-300">
              {selectedModule.question_bank.map((question, index) => (
                <li key={index} className="mb-2">
                  {question.question_text}
                  <span className="text-sm text-yellow-400 ml-2">({question.probability}% probability)</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;