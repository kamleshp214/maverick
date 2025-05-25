import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Skills() {
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

    const element = document.getElementById("skills");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"]
    },
    {
      title: "Frontend Technologies",
      skills: ["React.js", "Next.js", "HTML5", "CSS3", "TailwindCSS", "Bootstrap"]
    },
    {
      title: "Backend Technologies",
      skills: ["Node.js", "Express.js", "RESTful APIs", "Authentication"]
    },
    {
      title: "Databases",
      skills: ["MongoDB", "MySQL", "Dexie.js", "IndexedDB"]
    },
    {
      title: "Development Tools",
      skills: ["Git", "GitHub", "VS Code", "npm", "Webpack"]
    },
    {
      title: "Cloud & Deployment",
      skills: ["AWS", "Vercel", "Netlify"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Technical Skills
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass rounded-xl p-6 hover:border-blue-400 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition-colors duration-300 cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
