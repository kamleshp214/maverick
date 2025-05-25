import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "Full Stack Developer";

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText !== fullText) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      } else if (isDeleting && displayText !== "") {
        setDisplayText(fullText.substring(0, displayText.length - 1));
      } else if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, fullText]);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 floating"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gray-100">Kamlesh</span>{" "}
          <span className="gradient-text">Porwal</span>
        </motion.h1>
        
        <div className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 mb-6 h-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="typewriter-container"
          >
            <span className="typewriter-text">{displayText}</span>
            <span className="border-r-2 border-blue-400 animate-pulse">|</span>
          </motion.div>
        </div>
        
        <motion.p 
          className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Results-driven Full Stack Developer with 2+ years of hands-on experience in React, TypeScript, and MERN stack development.
        </motion.p>
        
        <motion.button
          onClick={scrollToProjects}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work
        </motion.button>
      </div>
    </section>
  );
}
