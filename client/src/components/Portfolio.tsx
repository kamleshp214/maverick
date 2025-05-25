import { motion } from "framer-motion";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      {/* Footer - Mobile-Optimized */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          {/* Mobile-First Layout */}
          <div className="text-center lg:text-left mb-8">
            {/* Brand Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold sf-pro-display mb-4">Maverick</h3>
              <p className="text-gray-400 sf-pro-text leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
                Crafting exceptional digital experiences with clean code and innovative solutions.
              </p>
              
              {/* Social Links - Centered on mobile */}
              <div className="flex justify-center lg:justify-start space-x-4 mb-8">
                <motion.a
                  href="mailto:porwalkamlesh5@gmail.com"
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors touch-target"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/kamlesh-porwal-2b1a2a1a6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors touch-target"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://github.com/kamleshp214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors touch-target"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
              </div>
            </div>

            {/* Navigation & Resources - Side by side on mobile, better spaced */}
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-3 lg:gap-12 max-w-lg mx-auto lg:max-w-none">
              <div>
                <h4 className="font-semibold sf-pro-display mb-4">Navigation</h4>
                <ul className="space-y-3">
                  <li><a href="#home" className="text-gray-400 hover:text-white transition-colors sf-pro-text text-sm lg:text-base">Home</a></li>
                  <li><a href="#about" className="text-gray-400 hover:text-white transition-colors sf-pro-text text-sm lg:text-base">About</a></li>
                  <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors sf-pro-text text-sm lg:text-base">Skills</a></li>
                  <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors sf-pro-text text-sm lg:text-base">Projects</a></li>
                  <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors sf-pro-text text-sm lg:text-base">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold sf-pro-display mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li><a href="/resume.pdf" download className="text-gray-400 hover:text-white transition-colors sf-pro-text text-sm lg:text-base">Resume</a></li>
                  <li><a href="https://github.com/kamleshp214" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors sf-pro-text text-sm lg:text-base">GitHub</a></li>
                  <li><a href="https://www.linkedin.com/in/kamlesh-porwal-2b1a2a1a6/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors sf-pro-text text-sm lg:text-base">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Better mobile spacing */}
          <div className="pt-6 border-t border-gray-800 text-center lg:flex lg:justify-between lg:items-center">
            <p className="text-gray-400 sf-pro-text text-sm mb-3 lg:mb-0">
              &copy; 2025 Kamlesh Porwal. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs lg:text-sm sf-pro-text">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
