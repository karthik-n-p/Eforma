import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Video, MessageCircle, FileText, Phone, Menu, X, Users, Brain, Layers, Mail, Github, Linkedin } from "lucide-react";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", semester: "", featureRequest: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your logic to submit the form data to your backend or API
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0f1a] to-[#1a1f2e] text-gray-300 overflow-hidden relative">
      {/* Navbar */}
      <nav className={`fixed w-full transition-all duration-300 z-50 px-8 py-6 flex justify-between items-center`}>
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#5570F1] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-wide">
              <span className="text-[#5570F1]">ED</span>FORMA
            </h1>
          </div>
          <div className="hidden md:flex space-x-8 text-lg">
            <Link to="/" className="hover:text-[#5570F1] transition-all text-white">Home</Link>
            <Link to="/about" className="hover:text-[#5570F1] transition-all text-white">About</Link>
            <Link to="/contact" className="hover:text-[#5570F1] transition-all text-white">Contact</Link>
          </div>
        </div>
        <div className="hidden md:flex">
          <button 
            className="bg-[#5570F1] px-6 py-3 rounded-lg text-lg font-semibold text-white shadow-lg hover:bg-[#4059C7] transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            Join Waiting List
          </button>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {/* Modal for Join Waiting List */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1f2e] p-8 rounded-lg w-full max-w-md">
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
      <section className="flex flex-col items-center justify-center h-screen text-center px-6 relative space-y-6">
        {/* Background Rings */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute w-[800px] h-[800px] rounded-full bg-[#5570F1] opacity-10 blur-3xl -top-[400px] -left-[400px]"></div>
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#5570F1] opacity-10 blur-3xl -bottom-[300px] -right-[300px]"></div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="text-6xl md:text-8xl font-extrabold text-white relative z-10"
        >
          Your AI Study Companion
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.5 }} 
          className="text-xl md:text-2xl text-gray-400 max-w-3xl relative z-10"
        >
          AI-powered chatbot for KTU students – structured notes and exam-focused learning made easy.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.5 }}
          className="relative z-10"
        >
          <Link 
            to="/dashboard" 
            className="bg-[#5570F1] px-8 md:px-10 py-3 md:py-4 rounded-lg text-lg md:text-2xl font-semibold text-white shadow-lg hover:bg-[#4059C7] transition-all"
          >
            Get Started
          </Link>
        </motion.div>
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

      {/* Footer Section */}
      <footer className="w-full bg-[#1a1f2e] py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#5570F1] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">E</span>
                </div>
                <h1 className="text-2xl font-bold text-white">
                  <span className="text-[#5570F1]">ED</span>FORMA
                </h1>
              </div>
              <p className="text-gray-400">
                Empowering KTU students with AI-driven learning tools for academic success.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold text-white">Quick Links</h3>
              <Link to="/" className="text-gray-400 hover:text-[#5570F1] transition-all">Home</Link>
              <Link to="/about" className="text-gray-400 hover:text-[#5570F1] transition-all">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-[#5570F1] transition-all">Contact</Link>
            </div>

            {/* Social Links */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold text-white">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="mailto:support@edforma.com" className="text-gray-400 hover:text-[#5570F1] transition-all">
                  <Mail size={24} />
                </a>
                <a href="https://github.com/edforma" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5570F1] transition-all">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/company/edforma" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5570F1] transition-all">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            Join us in shaping the future of education.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;