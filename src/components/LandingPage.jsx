import React, { useState } from "react";
import { motion } from "framer-motion";
import { File, PlayCircle, ScrollText, MessageCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";

import {Footer,FeatureCard,Modal,Navbar} from './landingcomponents'

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", semester: "", featureRequest: "" });
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    const wakeServer = async () => {
      try {
        const response = await fetch("https://renovation-lji1.onrender.com/api/wake", {
          method: "GET",
        });
        if (response.ok) {
          console.log("Server woken up successfully!");
        } else {
          console.error("Failed to wake up the server.");
        }
      } catch (error) {
        console.error("Error waking up the server:", error);
      }
    };

    wakeServer();
  }, []);
  const features = [
    { icon: <File size={40} className="text-[var(--primary)]" />, title: "No More PDFs", desc: "Well-organized documentation with easy accessibility." },
    { icon: <PlayCircle size={40} className="text-[var(--primary)]" />, title: "Learn What You Need", desc: "High-probability questions and targeted explanations." },
    { icon: <ScrollText size={40} className="text-[var(--primary)]" />, title: "KTU Syllabus Coverage", desc: "Comprehensive materials based on the latest syllabus." },
    { icon: <MessageCircle size={40} className="text-[var(--primary)]" />, title: "Interactive Learning", desc: "AI-powered Q&A for personalized guidance." },
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-darker)] text-[var(--text-primary)] overflow-hidden relative">
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
      <section className="flex flex-col items-center justify-center h-[75vh] text-center px-6 relative space-y-6">
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Central Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute w-[55vw] h-[20vw] max-w-[480px] max-h-[480px] rounded-full bg-[var(--primary)] opacity-30 blur-[90px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[40vw] md:h-[15vw]"
          ></motion.div>

          {/* Left Border Animation (Only for md+ screens) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="hidden md:block absolute top-[35%] left-[-5%] w-[clamp(200px,18vw,350px)] h-[clamp(200px,15vw,400px)] rounded-full border-[var(--primary)] border-[35px] blur-2xl md:border-[20px] md:w-[clamp(220px,20vw,380px)] md:h-[clamp(220px,18vw,420px)]"
          ></motion.div>

          {/* Right Border Animation (Only for md+ screens) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="hidden md:block absolute w-[clamp(350px,18vw,380px)] h-[clamp(350px,15vw,400px)] rounded-full border-[var(--primary)] border-[15px] blur-2xl top-[-10%] right-[-5%] md:border-[25px] md:w-[clamp(380px,20vw,420px)] md:h-[clamp(380px,18vw,450px)]"
          ></motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] relative z-10 leading-tight md:leading-snug"
        >
          The New Way Of Learning
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-lg sm:text-xl md:text-1xl text-[var(--text-secondary)] max-w-md sm:max-w-2xl relative z-10"
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
            to="login"
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] rounded-[100px] px-6 sm:px-10 py-2 sm:py-3 text-lg sm:text-xl font-bold text-[var(--text-primary)] shadow-lg hover:scale-105 transition-transform"
          >
            Join Us
          </Link>

          <Link
            to="/dashboard/chatbot"
            className="border border-[var(--primary)] text-[var(--primary)] px-6 sm:px-10 py-2 sm:py-3 rounded-[100px] text-lg sm:text-xl font-bold hover:bg-[var(--primary)] hover:text-[var(--text-primary)] transition-all flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>See Demo</span>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full relative">
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
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-8"
          >
            We're Just Getting Started!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto"
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