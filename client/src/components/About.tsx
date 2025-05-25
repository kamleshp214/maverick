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
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-light sf-pro-display text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        
        <motion.div 
          className="apple-card rounded-2xl p-8 md:p-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center sf-pro-text">
            Results-driven Full Stack Developer and <span className="font-semibold text-black">Student at MIT Ujjain</span> with <span className="font-semibold text-black">2+ years</span> of hands-on experience in React, TypeScript, and MERN stack development. Proven track record of building scalable web applications serving <span className="font-semibold text-black">500+ users</span> and improving development efficiency by <span className="font-semibold text-black">40%</span>. Expertise in frontend architecture, responsive design, and API integration. Seeking to leverage technical skills and leadership experience to contribute to innovative software development projects at technology-focused organizations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
