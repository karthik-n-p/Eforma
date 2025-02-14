import React, { useState, useEffect } from "react";
import { motion ,AnimatePresence} from "framer-motion";

import { Book, Video, FileText, Users } from "lucide-react";

import { X } from "lucide-react";




function Navbar ({ setIsModalOpen })  {
  
  return (
    <nav className="fixed w-full transition-all duration-300 z-50 px-8 py-5 flex justify-between items-center">
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
      
    </nav>
  );
};


function Modal ({ isModalOpen, setIsModalOpen, formData, handleInputChange, handleSubmit, submitted })  {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1f2e] bg-opacity-90 backdrop-blur-lg p-8 rounded-lg w-full max-w-md relative border border-[#5570F1] shadow-2xl">
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
              className="mt-6 bg-gradient-to-r from-[#5570F1] to-[#4059C7] px-6 py-2 rounded-lg text-white hover:scale-105 transition-transform"
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
                className="w-full p-3 bg-[#0a0f1a] rounded-lg text-white placeholder-gray-500 border border-[#5570F1] focus:outline-none focus:ring-2 focus:ring-[#5570F1]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-[#0a0f1a] rounded-lg text-white placeholder-gray-500 border border-[#5570F1] focus:outline-none focus:ring-2 focus:ring-[#5570F1]"
                required
              />
              <input
                type="text"
                name="semester"
                placeholder="Your Semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="w-full p-3 bg-[#0a0f1a] rounded-lg text-white placeholder-gray-500 border border-[#5570F1] focus:outline-none focus:ring-2 focus:ring-[#5570F1]"
                required
              />
              <textarea
                name="featureRequest"
                placeholder="What AI feature would you like to see?"
                value={formData.featureRequest}
                onChange={handleInputChange}
                className="w-full p-3 bg-[#0a0f1a] rounded-lg text-white placeholder-gray-500 border border-[#5570F1] focus:outline-none focus:ring-2 focus:ring-[#5570F1]"
                rows="3"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-6 bg-gradient-to-r from-[#5570F1] to-[#4059C7] px-6 py-2 rounded-lg text-white hover:scale-105 transition-transform w-full"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};


function FeatureCard({ icon, title, desc, index })  {
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="flex flex-col items-center text-center p-6 rounded-lg  hover:border-gray-300 hover:shadow-sm   "
  >
    <div className="mb-4 text-[#5570F1]">{icon}</div> {/* Icon with a subtle accent color */}
    <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </motion.div>
  );
};



function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email && message) {
      setSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
        setEmail("");
        setMessage("");
      }, 2000);
    }
  };
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white p-6 text-center">
      <div className="container mx-auto px-6 text-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 bg-[#5570F1] rounded-lg flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-2xl">E</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-white hover:text-[#5570F1] transition-colors">
              <span className="text-[#5570F1]">ED</span>FORMA
            </h1>
          </div>
          <p className="text-gray-400 max-w-md">
            Empowering KTU students with AI-driven learning tools for academic success.
          </p>
        </div>

        {/* Contact Us Button */}
        <div className="container mx-auto flex flex-col items-center">
       
        <a
          href="mailto:knp5826@gmail.com"
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          Subscribe
        </a>
      </div>

        {/* Footer Text */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-gray-400 text-center w-full">
          Join us in shaping the future of education.
        </div>
      </div>

    
    </footer>
  );
};

import { File, PlayCircle, ScrollText, MessageCircle,Play } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Navbar, Modal, FeatureCard, and Footer components remain the same as provided earlier

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", semester: "", featureRequest: "" });
  const [submitted, setSubmitted] = useState(false);

  const features = [
    { icon: <File size={40} className="text-primary" />, title: "No More PDFs", desc: "Well-organized documentation with easy accessibility." },
    { icon: <PlayCircle size={40} className="text-primary" />, title: "Learn What You Need", desc: "High-probability questions and targeted explanations." },
    { icon: <ScrollText size={40} className="text-primary" />, title: "KTU Syllabus Coverage", desc: "Comprehensive materials based on the latest syllabus." },
    { icon: <MessageCircle size={40} className="text-primary" />, title: "Interactive Learning", desc: "AI-powered Q&A for personalized guidance." },
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
      <Navbar setIsModalOpen={setIsModalOpen} />
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        submitted={submitted}
      />

      {/* Hero Section */}
      {/* Hero Section */}
<section className="flex flex-col items-center justify-center h-[75vh] text-center px-6 relative space-y-6">
<div className="absolute inset-0 overflow-hidden z-0">
      {/* Central Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="absolute w-[55vw] h-[20vw] max-w-[480px] max-h-[480px] rounded-full bg-[#5570F1] opacity-30 blur-[90px] 
          top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          md:w-[40vw] md:h-[15vw]"
      ></motion.div>

      {/* Left Border Animation (Only for md+ screens) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="hidden md:block absolute top-[35%] left-[-5%] w-[clamp(200px,18vw,350px)] 
          h-[clamp(200px,15vw,400px)] rounded-full border-[#5570F1] border-[35px] blur-2xl 
          md:border-[20px] md:w-[clamp(220px,20vw,380px)] md:h-[clamp(220px,18vw,420px)]"
      ></motion.div>

      {/* Right Border Animation (Only for md+ screens) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        className="hidden md:block absolute w-[clamp(350px,18vw,380px)] h-[clamp(350px,15vw,400px)] 
          rounded-full border-[#5570F1] border-[15px] blur-2xl top-[-10%] right-[-5%] 
          md:border-[25px] md:w-[clamp(380px,20vw,420px)] md:h-[clamp(380px,18vw,450px)]"
      ></motion.div>
    </div>

  {/* Made with AI Button */}


  {/* Title */}
  <motion.h1
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white relative z-10 leading-tight md:leading-snug"
  >
    The New Way Of Learning
  </motion.h1>

  {/* Subtitle */}
  <motion.p
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5 }}
    className="text-lg sm:text-xl md:text-1xl text-gray-300 max-w-md sm:max-w-2xl relative z-10"
  >
    Your ultimate AI guide to learn and prepare for KTU exams.
  </motion.p>

  {/* Buttons */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5 }}
    className="relative z-10 mt-4 sm:mt-6 flex items-center space-x-4"
  >
    <Link
      to='login'
      onClick={() => setIsModalOpen(true)}
      className="bg-gradient-to-r from-[#5570F1] to-[#4059C7] rounded-[100px] px-6 sm:px-10 py-2 sm:py-3 text-lg sm:text-xl font-bold text-white shadow-lg hover:scale-105 transition-transform"
    >
      Join Us
    </Link>
    
    <Link to='/dashboard/chatbot'
      className="border border-[#5570F1] text-[#5570F1] px-6 sm:px-10 py-2 sm:py-3 rounded-[100px] text-lg sm:text-xl font-bold hover:bg-[#5570F1] hover:text-white transition-all flex items-center space-x-2"
    >
      
      <Play className="w-5 h-5" />
       <span>See Demo</span>
      
    </Link>
    
     {/* Play icon */}
  </motion.div>
</section>

      {/* Features Section */}
      <section className="w-full  relative">
        <div className="container mx-auto px-6">
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} index={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Prototype Announcement Section */}
      <section className="w-full py-12 relative">
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

      <Footer />
    </div>
  );
};

export default LandingPage;