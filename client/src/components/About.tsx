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
          className="glass rounded-2xl p-8 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-lg text-gray-300 leading-relaxed text-center">
            Results-driven Full Stack Developer with 2+ years of hands-on experience in React, TypeScript, and MERN stack development. Proven track record of building scalable web applications serving 500+ users and improving development efficiency by 40%. Expertise in frontend architecture, responsive design, and API integration. Seeking to leverage technical skills and leadership experience to contribute to innovative software development projects at a technology-focused organization.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
