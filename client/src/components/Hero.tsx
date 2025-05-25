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
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-8 hero-bg">
      <div className="text-center max-w-5xl mx-auto w-full">
        {/* Mobile-optimized spacing */}
        <div className="mb-8 sm:mb-12">
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light sf-pro-display mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Kamlesh Porwal
          </motion.h1>
          
          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-normal sf-pro-text text-gray-600 mb-6 sm:mb-8 min-h-[2rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {displayText}
            <span className="border-r-2 border-black animate-pulse ml-1">|</span>
          </motion.div>
        </div>

        {/* Enhanced description for mobile */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg sm:text-xl text-gray-500 mb-6 max-w-3xl mx-auto leading-relaxed sf-pro-text">
            Results-driven Full Stack Developer with 2+ years of hands-on experience in React, TypeScript, and MERN stack development.
          </p>
          
          {/* Stats for mobile engagement */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto mb-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-2xl sm:text-3xl font-semibold sf-pro-display text-black">2+</div>
              <div className="text-sm sm:text-base text-gray-500 sf-pro-text">Years</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="text-2xl sm:text-3xl font-semibold sf-pro-display text-black">500+</div>
              <div className="text-sm sm:text-base text-gray-500 sf-pro-text">Users</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="text-2xl sm:text-3xl font-semibold sf-pro-display text-black">40%</div>
              <div className="text-sm sm:text-base text-gray-500 sf-pro-text">Efficiency</div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.button
            onClick={scrollToProjects}
            className="w-full sm:w-auto px-10 py-5 apple-button rounded-xl text-lg font-medium sf-pro-text touch-target"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View My Work
          </motion.button>
          <motion.a
            href="/resume.pdf"
            download
            className="w-full sm:w-auto px-10 py-5 apple-button-secondary rounded-xl text-lg font-medium sf-pro-text touch-target"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll indicator for mobile */}
        <motion.div
          className="mt-12 sm:mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
