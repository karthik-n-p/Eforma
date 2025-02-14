import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // For success animation

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    semester: "",
    featureRequest: ""
  });

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // For success animation
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
      ? "https://renovation-lji1.onrender.com/api/auth/login"
      : "https://renovation-lji1.onrender.com/api/waitlist";

    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.name,
          email: formData.email,
          semester: formData.semester,
          feature: formData.featureRequest,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log("Success:", result);
        setShowSuccess(true); // Show success animation
        setTimeout(() => {
          setShowSuccess(false);
          if (isLogin) {
            navigate("/dashboard/chatbot"); // Navigate to chatbot after login
          }
        }, 2000); // Hide animation after 2 seconds
      } else {
        console.error("Error:", result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0F12]">
      <div className="max-w-md w-full p-6 bg-[#1A1D21] shadow-lg rounded-lg border border-gray-800 relative">
        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-[#1A1D21] rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex flex-col items-center text-[#4ADE80]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle size={48} className="mb-2" />
                <p className="text-lg font-semibold">
                  {isLogin ? "Login Successful!" : "Waitlist Registered!"}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "waitlist"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-center text-[#5570F1] mb-4">
              {isLogin ? "Login" : "Join the Waitlist"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#2D2F33] text-white border border-gray-700 rounded focus:ring-2 focus:ring-[#5570F1] focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="semester"
                    placeholder="Semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#2D2F33] text-white border border-gray-700 rounded focus:ring-2 focus:ring-[#5570F1] focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="featureRequest"
                    placeholder="Feature Request"
                    value={formData.featureRequest}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#2D2F33] text-white border border-gray-700 rounded focus:ring-2 focus:ring-[#5570F1] focus:outline-none"
                    required
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 bg-[#2D2F33] text-white border border-gray-700 rounded focus:ring-2 focus:ring-[#5570F1] focus:outline-none"
                required
              />

              
              <button
                type="submit"
                className="w-full p-2 text-white bg-[#5570F1] rounded hover:bg-[#4054B2] transition-all duration-200 focus:outline-none"
                disabled={loading}
              >
                {loading ? "Processing..." : isLogin ? "Login" : "Join Waitlist"}
              </button>
            </form>

            <p
              className="text-center text-[#5570F1] cursor-pointer mt-4 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "New? Join the Waitlist" : "Already have an account? Login"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
