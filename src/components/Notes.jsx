import React, { useState } from "react";

const modules = [
  { name: "Module 1", content: ["Section 1", "Section 2", "Section 3", "Section 4"], xp: 100 },
  { name: "Module 2", content: ["Section 1", "Section 2", "Section 3"], xp: 75 },
  { name: "Module 3", content: ["Section 1", "Section 2", "Section 3", "Section 4", "Section 5"], xp: 125 },
];

function Notes() {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [moduleCompletion, setModuleCompletion] = useState({});
  const [isNotesCollapsed, setIsNotesCollapsed] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];
  const subjects = {
    "Semester 1": ["Subject 1", "Subject 2", "Subject 3"],
    "Semester 2": ["Subject 4", "Subject 5", "Subject 6"],
    "Semester 3": ["Subject 7", "Subject 8", "Subject 9"],
    "Semester 4": ["Subject 10", "Subject 11", "Subject 12"],
  };

  const handleSemesterChange = (selectedSemester) => {
    setSemester(selectedSemester);
    setSubject("");
    setSelectedModule(null);
    setCurrentSection(0);
  };

  const handleSubjectChange = (selectedSubject) => {
    setSubject(selectedSubject);
    setSelectedModule(null);
    setCurrentSection(0);
  };

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setCurrentSection(0);
  };

  const handleNextSection = () => {
    if (currentSection < selectedModule.content.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleCompleteModule = () => {
    if (!moduleCompletion[selectedModule.name]) {
      setTotalXP((prevXP) => prevXP + selectedModule.xp);
    }
    setModuleCompletion((prev) => ({
      ...prev,
      [selectedModule.name]: true,
    }));
    setSelectedModule(null);
  };

  const toggleNotesCollapse = () => {
    setIsNotesCollapsed(!isNotesCollapsed);
  };

  const handleSectionSelect = (sectionIndex) => {
    setCurrentSection(sectionIndex);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className={`lg:w-1/4 w-full bg-white p-6 rounded-xl shadow-lg transition-all ${isNotesCollapsed ? "lg:w-0 lg:hidden" : "lg:block"}`}>
          <h2 className="text-3xl font-semibold text-[#3B82F6] mb-4">Notes</h2>

          {/* Semester Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Select Semester</label>
            <select
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              onChange={(e) => handleSemesterChange(e.target.value)}
            >
              <option value="">-- Select Semester --</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          {semester && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">Select Subject</label>
              <select
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                onChange={(e) => handleSubjectChange(e.target.value)}
              >
                <option value="">-- Select Subject --</option>
                {subjects[semester].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Module List */}
          {subject && (
            <div className="space-y-4">
              {modules.map((module) => (
                <div
                  key={module.name}
                  className={`w-full p-4 text-left border rounded-xl shadow-md hover:bg-[#E6F1FF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition ${
                    moduleCompletion[module.name] ? "bg-[#3B82F6] text-white" : "text-black"
                  }`}
                  onClick={() => handleModuleClick(module)}
                >
                  <h3 className="text-xl font-semibold">{module.name}</h3>
                  <p className="text-sm text-gray-600">XP: {module.xp}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className={`lg:w-3/4 w-full bg-white p-6 rounded-xl shadow-lg flex-1 transition-all ${isNotesCollapsed ? "w-full" : "lg:w-3/4"}`}>
          <div className="absolute top-4 right-6 text-[#3B82F6] text-lg">
            {selectedModule ? `Current Section: ${currentSection + 1} of ${selectedModule.content.length}` : "Select a module"}
          </div>
          <div className="absolute top-4 left-6 text-[#10B981] text-lg font-semibold">Total XP: {totalXP}</div>
          {selectedModule ? (
            <div>
              <h3 className="text-3xl font-semibold text-[#3B82F6]">{selectedModule.name}</h3>
              <div className="space-y-6 mt-6">
                <p className="text-gray-700">{selectedModule.content[currentSection]}</p>
                <div className="mt-6 flex space-x-4">
                  {currentSection < selectedModule.content.length - 1 ? (
                    <button
                      className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      onClick={handleNextSection}
                    >
                      Next Section
                    </button>
                  ) : (
                    <button
                      className="px-6 py-3 bg-[#34D399] text-white rounded-lg hover:bg-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#34D399]"
                      onClick={handleCompleteModule}
                    >
                      Complete Module
                    </button>
                  )}
                </div>
                {/* Section Select Dropdown */}
                <div className="mt-6">
                  <label className="block text-gray-700 font-medium">Select Section</label>
                  <select
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    onChange={(e) => handleSectionSelect(Number(e.target.value))}
                    value={currentSection}
                  >
                    {selectedModule.content.map((section, index) => (
                      <option key={index} value={index}>
                        {section}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a module to view content.</p>
          )}
        </div>
      </div>

      {/* Minimize Selection Panel Button */}
      <div
        className={`absolute top-4 left-1/2 transform -translate-x-1/2 p-4 bg-[#3B82F6] text-white rounded-full cursor-pointer transition-all ${isNotesCollapsed ? "rotate-180" : ""}`}
        onClick={toggleNotesCollapse}
      >
        <span className={`transform ${isNotesCollapsed ? "rotate-180" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
            <path d="M3.646 10.646a.5.5 0 0 1 .708 0L8 6.707l3.646 3.939a.5.5 0 1 1-.708.707L8 7.707l-3.646 3.939a.5.5 0 0 1-.708-.707z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default Notes;
