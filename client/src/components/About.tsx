import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
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

    const element = document.getElementById("about");
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        
        <motion.div 
          className="glass glass-hover rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
          <p className="text-lg text-gray-300 leading-relaxed text-center relative z-10">
            Results-driven Full Stack Developer with <span className="text-blue-400 font-semibold">2+ years</span> of hands-on experience in React, TypeScript, and MERN stack development. Proven track record of building scalable web applications serving <span className="text-purple-400 font-semibold">500+ users</span> and improving development efficiency by <span className="text-pink-400 font-semibold">40%</span>. Expertise in frontend architecture, responsive design, and API integration. Seeking to leverage technical skills and leadership experience to contribute to innovative software development projects at technology-focused organizations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
