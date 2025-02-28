import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, File, PlayCircle, ScrollText, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ setIsModalOpen }) {
  return (
    <nav className="fixed w-full transition-all duration-300 z-50 px-8 py-5 flex justify-between items-center">
      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            <span className="text-primary">ED</span>FORMA
          </h1>
        </div>
      </div>
    </nav>
  );
}

function Modal({ isModalOpen, setIsModalOpen, formData, handleInputChange, handleSubmit, submitted }) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-modal-bg bg-opacity-90 backdrop-blur-lg p-8 rounded-lg w-full max-w-md relative border border-primary shadow-2xl">
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
              className="mt-6 bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded-lg text-white hover:scale-105 transition-transform"
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
                className="w-full p-3 bg-input-bg rounded-lg text-white placeholder-gray-500 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-input-bg rounded-lg text-white placeholder-gray-500 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="text"
                name="semester"
                placeholder="Your Semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="w-full p-3 bg-input-bg rounded-lg text-white placeholder-gray-500 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <textarea
                name="featureRequest"
                placeholder="What AI feature would you like to see?"
                value={formData.featureRequest}
                onChange={handleInputChange}
                className="w-full p-3 bg-input-bg rounded-lg text-white placeholder-gray-500 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-6 bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded-lg text-white hover:scale-105 transition-transform w-full"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex flex-col items-center text-center p-6 rounded-lg hover:border-gray-300 hover:shadow-sm"
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white p-6 text-center">
      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">E</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-white hover:text-primary transition-colors">
              <span className="text-primary">ED</span>FORMA
            </h1>
          </div>
          <p className="text-gray-400 max-w-md">Empowering KTU students with AI-driven learning tools for academic success.</p>
        </div>
        <a href="mailto:knp5826@gmail.com" className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
          Subscribe
        </a>
        <div className="border-t border-gray-700 mt-8 pt-6 text-gray-400 text-center w-full">
          Join us in shaping the future of education.
        </div>
      </div>
    </footer>
  );
}

export { Navbar, Modal, FeatureCard, Footer };
