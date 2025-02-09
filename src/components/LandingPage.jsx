import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Video, FileText, Users, X } from "lucide-react";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", semester: "", featureRequest: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const wakeAPI = async () => {
      try {
        await fetch("https://renovation-lji1.onrender.com/api/wake", { method: "GET" });
        console.log("API wake-up call sent");
      } catch (error) {
        console.error("Failed to wake up API:", error);
      }
    };

    wakeAPI();

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { icon: <FileText size={40} className="text-primary" />, title: "Structured Notes", desc: "Well-organized documentation with easy accessibility." },
    { icon: <Video size={40} className="text-primary" />, title: "Exam-Focused Teaching", desc: "High-probability questions and targeted explanations." },
    { icon: <Book size={40} className="text-primary" />, title: "KTU Syllabus Coverage", desc: "Comprehensive materials based on the latest syllabus." },
    { icon: <Users size={40} className="text-primary" />, title: "Interactive Learning", desc: "AI-powered Q&A for personalized guidance." },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://renovation-lji1.onrender.com/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          semester: formData.semester,
          feature: formData.featureRequest,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Success:", result);
        setSubmitted(true);
      } else {
        console.error("Error:", result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#000] to-[#1a1f2e] text-gray-300 overflow-hidden relative">
      {/* Navbar */}
      <nav className={`fixed w-full transition-all duration-300 z-50 px-8 py-5 flex justify-between items-center`}>
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#5570F1] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              <span className="text-[#5570F1]">ED</span>FORMA
            </h1>
          </div>
        </div>
        <div className="hidden md:flex">
          <button 
            className="bg-[#5570F1] px-3 py-2 rounded-lg text-lg font-normal text-white shadow-lg hover:bg-[#4059C7] transition-all cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Join Us
          </button>
        </div>
      </nav>

      {/* Modal for Join Waiting List */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1f2e] p-8 rounded-lg w-full max-w-md relative">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
                <p className="text-gray-400">We appreciate your interest. We'll notify you when we launch.</p>
                <button 
                  className="mt-6 bg-[#5570F1] px-6 py-2 rounded-lg text-white hover:bg-[#4059C7] transition-all"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-white mb-6">Join Waiting List</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#0a0f1a] rounded-lg text-white placeholder-gray-500"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#0a0f1a] rounded-lg text-white placeholder-gray-500"
                    required
                  />
                  <input
                    type="text"
                    name="semester"
                    placeholder="Your Semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#0a0f1a] rounded-lg text-white placeholder-gray-500"
                    required
                  />
                  <textarea
                    name="featureRequest"
                    placeholder="What AI feature would you like to see?"
                    value={formData.featureRequest}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#0a0f1a] rounded-lg text-white placeholder-gray-500"
                    rows="3"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="mt-6 bg-[#5570F1] px-6 py-2 rounded-lg text-white hover:bg-[#4059C7] transition-all w-full"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 relative space-y-8 md:space-y-8">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute w-[70vw] h-[20vw] max-w-[500px] max-h-[500px] rounded-full bg-[#5570F1] opacity-30 blur-[120px] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="hidden md:block absolute w-[400px] h-[400px] rounded-full border-[60px] border-[#5570F1] opacity-65 blur-3xl top-[210px] -left-[200px]"></div>
          <div className="hidden md:block absolute w-[500px] h-[500px] rounded-full border-[60px] border-[#5570F1] opacity-65 blur-3xl -right-[180px]"></div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white relative z-10 leading-tight md:leading-snug"
        >
          Your AI Study Companion
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.5 }} 
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-md sm:max-w-2xl relative z-10"
        >
          AI-powered chatbot for KTU students – structured notes and exam-focused learning made easy.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.5 }}
          className="relative z-10 mt-4 sm:mt-6"
        >
          <Link 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#5570F1] px-6 sm:px-12 py-3 sm:py-4 rounded-lg sm:rounded-xl text-lg sm:text-2xl font-bold text-white shadow-lg hover:bg-[#4059C7] transition-all"
          >
            Join Us
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 relative">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.2 }} 
                className="flex flex-col items-center text-center p-6 bg-[#1a1f2e] rounded-lg shadow-lg"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prototype Announcement Section */}
      <section className="w-full py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="text-4xl md:text-5xl font-bold text-white mb-8"
          >
            We're Just Getting Started!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.5 }} 
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
          >
            This is our initial prototype, and we're excited to share it with you. As we continue to improve and expand, your feedback will help shape the future of EDForMa. Join us on this journey!
          </motion.p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-[#1a1f2e] py-12 relative flex flex-col items-center">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#5570F1] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">E</span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                <span className="text-[#5570F1]">ED</span>FORMA
              </h1>
            </div>
            <p className="text-gray-400 max-w-md">
              Empowering KTU students with AI-driven learning tools for academic success.
            </p>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-gray-400 text-center w-full">
            Join us in shaping the future of education.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;