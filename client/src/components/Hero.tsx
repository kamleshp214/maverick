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
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="text-center max-w-5xl mx-auto">
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light sf-pro-display mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Kamlesh Porwal
        </motion.h1>
        
        <motion.div
          className="text-xl sm:text-2xl md:text-3xl font-normal sf-pro-text text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {displayText}
          <span className="border-r-2 border-black animate-pulse ml-1">|</span>
        </motion.div>
        
        <motion.p 
          className="text-lg sm:text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed sf-pro-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Results-driven Full Stack Developer with 2+ years of hands-on experience in React, TypeScript, and MERN stack development.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.button
            onClick={scrollToProjects}
            className="px-8 py-4 apple-button rounded-xl text-base font-medium sf-pro-text"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View My Work
          </motion.button>
          <motion.a
            href="/resume.pdf"
            download
            className="px-8 py-4 apple-button-secondary rounded-xl text-base font-medium sf-pro-text"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
