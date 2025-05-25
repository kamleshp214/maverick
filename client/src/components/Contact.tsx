import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);



  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-light sf-pro-display text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Let's Connect
        </motion.h2>
        
        <motion.div 
          className="apple-card rounded-2xl p-8 md:p-16 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed sf-pro-text">
            I'm always excited to connect with fellow developers, potential collaborators, and opportunities. 
            Let's build something amazing together!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="mailto:porwalkamlesh5@gmail.com"
              className="flex items-center space-x-3 px-8 py-4 apple-button-secondary rounded-xl sf-pro-text font-medium touch-target"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Email Me</span>
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/kamlesh-porwal-2b1a2a1a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-8 py-4 apple-button-secondary rounded-xl sf-pro-text font-medium touch-target"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </motion.a>
            
            <motion.a
              href="https://github.com/kamleshp214"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-8 py-4 apple-button-secondary rounded-xl sf-pro-text font-medium touch-target"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
