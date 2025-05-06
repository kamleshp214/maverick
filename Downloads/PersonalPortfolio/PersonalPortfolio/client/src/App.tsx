import React, { useEffect, useState, createContext, useContext } from "react";
import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";

// Import components with relative paths to avoid extension issues
// Create a theme context
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Add or remove the "dark" class from the HTML element
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store the theme preference in localStorage
    localStorage.setItem('theme', newTheme);
  };
  
  useEffect(() => {
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(savedTheme);
    
    // Apply the theme
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${isScrolled ? 'py-3 bg-primary-bg/95 backdrop-blur-sm shadow-lg' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <a href="/" className="text-primary-accent font-heading font-bold text-2xl">
            John<span className="text-text-primary">Doe</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className={`text-sm transition-colors duration-200 py-2 ${
                  location === item.href
                    ? 'text-primary-accent border-b-2 border-primary-accent'
                    : 'text-text-secondary hover:text-primary-accent'
                }`}
              >
                {item.label}
              </a>
            ))}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="text-text-secondary hover:text-primary-accent transition-colors p-2"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <a 
              href="/contact" 
              className="ml-4 px-4 py-2 bg-primary-accent hover:bg-primary-accent/90 text-white rounded-lg transition-colors"
            >
              Hire Me
            </a>
          </div>
          
          {/* Mobile menu button and theme toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <button 
              onClick={toggleTheme}
              className="text-text-secondary hover:text-primary-accent transition-colors p-2"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-primary hover:text-primary-accent"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 bg-secondary-bg shadow-lg' : 'max-h-0'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className={`text-base py-2 ${
                  location === item.href
                    ? 'text-primary-accent'
                    : 'text-text-secondary hover:text-primary-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="/contact" 
              className="mt-4 px-4 py-2 bg-primary-accent hover:bg-primary-accent/90 text-white rounded-lg transition-colors text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-bg border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <a href="/" className="font-heading font-bold text-2xl text-primary-accent mb-4 inline-block">
              John<span className="text-text-primary">Doe</span>
            </a>
            <p className="text-text-secondary text-sm mb-6">
              Creating exceptional digital experiences through code and design.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://github.com" className="text-text-secondary hover:text-primary-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-text-secondary hover:text-primary-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="text-text-secondary hover:text-primary-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://dribbble.com" className="text-text-secondary hover:text-primary-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-heading font-bold text-lg mb-4 text-text-primary">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-text-secondary hover:text-primary-accent transition-colors text-sm">Home</a>
              </li>
              <li>
                <a href="/about" className="text-text-secondary hover:text-primary-accent transition-colors text-sm">About</a>
              </li>
              <li>
                <a href="/projects" className="text-text-secondary hover:text-primary-accent transition-colors text-sm">Projects</a>
              </li>
              <li>
                <a href="/blog" className="text-text-secondary hover:text-primary-accent transition-colors text-sm">Blog</a>
              </li>
              <li>
                <a href="/contact" className="text-text-secondary hover:text-primary-accent transition-colors text-sm">Contact</a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-heading font-bold text-lg mb-4 text-text-primary">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-text-secondary text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:hello@johndoe.com" className="hover:text-primary-accent transition-colors">
                  hello@johndoe.com
                </a>
              </li>
              <li className="flex items-center text-text-secondary text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+11234567890" className="hover:text-primary-accent transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-start text-text-secondary text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-1 text-primary-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>San Francisco, California</span>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-heading font-bold text-lg mb-4 text-text-primary">Newsletter</h4>
            <p className="text-text-secondary text-sm mb-4">
              Subscribe to my newsletter for the latest articles and updates.
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="your.email@example.com" 
                className="w-full px-4 py-2 bg-primary-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary-accent transition-colors text-sm" 
                required
              />
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-primary-accent hover:bg-primary-accent/90 text-white font-medium rounded-lg transition-all duration-200 text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            &copy; {currentYear} John Doe. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy-policy" className="text-text-secondary hover:text-primary-accent transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-text-secondary hover:text-primary-accent transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Home: React.FC = () => {
  const skills = [
    { name: "React", icon: "react", color: "text-blue-400" },
    { name: "JavaScript", icon: "js", color: "text-yellow-400" },
    { name: "TypeScript", icon: "typescript", color: "text-blue-500" },
    { name: "Node.js", icon: "node", color: "text-green-500" },
    { name: "Tailwind CSS", icon: "tailwind", color: "text-cyan-400" },
    { name: "PostgreSQL", icon: "postgres", color: "text-blue-600" },
  ];

  interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
  }

  const projects: Project[] = [
    {
      title: "E-commerce Platform",
      description: "A full-featured online store with shopping cart and payment processing",
      image: "https://images.unsplash.com/photo-1571430765894-21a42b88c8a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      title: "Task Management App",
      description: "A productivity app for managing tasks and deadlines",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      technologies: ["React", "Redux", "Firebase", "Material UI"]
    },
    {
      title: "Portfolio Website",
      description: "A professional portfolio for showcasing design and development work",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Netlify"]
    }
  ];
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-3 py-1 rounded-full bg-primary-accent/10 text-primary-accent text-sm font-medium mb-6 animate-fade-in">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary-accent mr-2 animate-pulse-soft"></span>
                  Available for Freelance
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                <div className="animate-slide-right overflow-hidden">
                  <span>Hi, I'm <span className="text-primary-accent animate-pulse-soft">John Doe</span></span>
                </div>
                <div className="animate-slide-left delay-200 overflow-hidden">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-accent to-secondary-accent inline-block">
                    Full-Stack Developer
                  </span>
                </div>
              </h1>
              
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl animate-fade-in delay-300">
                I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Let's turn your vision into reality.
              </p>
              
              <div className="flex flex-wrap gap-4 animate-fade-in delay-400">
                <a href="/projects" className="px-6 py-3 bg-primary-accent hover:bg-primary-accent/90 text-white font-medium rounded-lg transition-all duration-200 flex items-center hover:translate-y-[-2px] hover:shadow-lg">
                  View My Work
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 animate-bounce-subtle" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <a href="/contact" className="px-6 py-3 bg-transparent border border-gray-700 hover:border-primary-accent text-text-primary font-medium rounded-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg">
                  Contact Me
                </a>
              </div>
              
              {/* Social links section - Update with your actual profile URLs */}
              <div className="mt-12 flex items-center space-x-5 animate-fade-in delay-500">
                <span className="text-text-secondary text-sm">Follow me on:</span>
                <div className="flex space-x-4">
                  {/* GitHub profile link */}
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors hover:scale-110 transform duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  {/* LinkedIn profile link */}
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors hover:scale-110 transform duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  {/* Add more social media links here as needed */}
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative animate-fade-in delay-100">
              <div className="rounded-2xl border border-gray-800 p-6 bg-secondary-bg/80 h-full shadow-xl animate-float relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-accent/10 rounded-full filter blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-accent/10 rounded-full filter blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="text-xs font-mono text-text-secondary animate-fade-in delay-200 mb-4 border-b border-gray-800 pb-4 opacity-75">
                    <pre className="whitespace-pre-wrap break-all">
                      <code>
{`// Full-stack Developer
{
  skills: ["React", "Node.js", "TypeScript"],
  experience: "5+ years",
  projects: "50+",
  available: true
}`}
                      </code>
                    </pre>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-secondary-bg/80 p-4 rounded-lg border border-gray-800 animate-slide-up delay-300">
                      <h3 className="text-sm font-medium text-primary-accent mb-1">Frontend</h3>
                      <div className="text-xs text-text-secondary space-y-1">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-primary-accent mr-2"></div>
                          <span>React</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-primary-accent mr-2"></div>
                          <span>TypeScript</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-primary-accent mr-2"></div>
                          <span>Tailwind CSS</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary-bg/80 p-4 rounded-lg border border-gray-800 animate-slide-up delay-400">
                      <h3 className="text-sm font-medium text-secondary-accent mb-1">Backend</h3>
                      <div className="text-xs text-text-secondary space-y-1">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-secondary-accent mr-2"></div>
                          <span>Node.js</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-secondary-accent mr-2"></div>
                          <span>Express</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-secondary-accent mr-2"></div>
                          <span>PostgreSQL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary-bg/80 p-4 rounded-lg border border-gray-800 animate-slide-up delay-500">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Project Status</h3>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary-accent animate-pulse-soft mr-1"></div>
                        <span className="text-xs text-primary-accent">Available for Work</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Current Projects</span>
                          <span>3/5</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-primary-accent h-1.5 rounded-full w-3/5"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Availability</span>
                          <span>70%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-secondary-accent h-1.5 rounded-full w-[70%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-16 bg-secondary-bg/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 animate-fade-in">
            My Tech <span className="text-primary-accent">Stack</span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity animate-fade-in hover:scale-105 transform transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-xl bg-secondary-bg border border-gray-800 flex items-center justify-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {skill.icon === "react" && (
                    <svg className={`w-10 h-10 ${skill.color} animate-spin-slow`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5Z" fill="currentColor"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" fill="currentColor"/>
                    </svg>
                  )}
                  {skill.icon === "js" && (
                    <svg className={`w-10 h-10 ${skill.color} group-hover:animate-pulse-soft`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3H21V21H3V3ZM19 19V5H5V19H19ZM12 16C12.5523 16 13 15.5523 13 15V10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10V15C11 15.5523 11.4477 16 12 16ZM15 16C15.5523 16 16 15.5523 16 15V10C16 9.44772 15.5523 9 15 9C14.4477 9 14 9.44772 14 10V15C14 15.5523 14.4477 16 15 16ZM9 16C9.55228 16 10 15.5523 10 15V10C10 9.44772 9.55228 9 9 9C8.44772 9 8 9.44772 8 10V15C8 15.5523 8.44772 16 9 16Z" fill="currentColor"/>
                    </svg>
                  )}
                  {skill.icon === "typescript" && (
                    <svg className={`w-10 h-10 ${skill.color} group-hover:animate-pulse-soft`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3H21V21H3V3ZM13.1 17.2H15.8V10.6H8.5V12.4H13.1V17.2ZM14.5 8.3C14.5 7.7 14 7.2 13.4 7.2H10.6C10 7.2 9.5 7.7 9.5 8.3C9.5 8.9 10 9.4 10.6 9.4H13.4C14 9.4 14.5 8.9 14.5 8.3Z" fill="currentColor"/>
                    </svg>
                  )}
                  {skill.icon === "node" && (
                    <svg className={`w-10 h-10 ${skill.color} group-hover:animate-pulse-soft`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.5C11.4 21.5 10.8 21.3 10.4 21L8.5 19.9C8.1 19.7 8.2 19.6 8.3 19.5C8.8 19.3 8.8 19.3 9.4 19C9.5 19 9.6 19 9.7 19.1L11.1 20C11.2 20.1 11.4 20.1 11.6 20L18.5 16.1C18.7 16 18.8 15.8 18.8 15.6V7.8C18.8 7.6 18.7 7.4 18.5 7.3L11.6 3.4C11.4 3.3 11.2 3.3 11 3.4L4.1 7.3C3.9 7.4 3.8 7.6 3.8 7.8V15.6C3.8 15.8 3.9 16 4.1 16.1L6 17.2C7.1 17.8 7.8 17.2 7.8 16.6V8.5C7.8 8.4 7.9 8.2 8.1 8.2H9.1C9.2 8.2 9.4 8.3 9.4 8.5V16.6C9.4 18 8.5 18.8 7.1 18.8C6.7 18.8 6.3 18.8 5.4 18.3L3.6 17.3C3 17 2.6 16.3 2.6 15.6V7.8C2.6 7.1 3 6.4 3.6 6L10.5 2.1C11.1 1.8 11.9 1.8 12.5 2.1L19.4 6C20 6.3 20.4 7 20.4 7.8V15.6C20.4 16.3 20 17 19.4 17.3L12.5 21.2C12.1 21.3 11.5 21.5 11 21.5H12ZM14.9 13.1C14.9 11.5 13.9 11.1 11.7 10.8C9.5 10.5 9.2 10.3 9.2 9.7C9.2 9.2 9.4 8.8 11 8.8C12.4 8.8 13 9.1 13.3 10.1C13.3 10.2 13.4 10.3 13.6 10.3H14.6C14.7 10.3 14.7 10.2 14.7 10.2C14.5 8.6 13.5 7.8 11 7.8C8.7 7.8 7.5 8.6 7.5 9.8C7.5 11.5 8.7 11.9 10.6 12.1C12.9 12.4 13.2 12.7 13.2 13.2C13.2 13.9 12.6 14.2 11.2 14.2C9.4 14.2 9 13.7 8.8 12.8C8.8 12.7 8.7 12.6 8.6 12.6H7.6C7.5 12.6 7.4 12.7 7.4 12.8C7.4 13.9 8 14.9 11.2 14.9C13.7 15 14.9 14.2 14.9 13.1Z" fill="currentColor"/>
                    </svg>
                  )}
                  {skill.icon === "tailwind" && (
                    <svg className={`w-10 h-10 ${skill.color} group-hover:animate-float`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.69 11.81 9.24 12.41 9.85C13.39 10.85 14.5 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.31 17.19 8.76 16.59 8.15C15.61 7.15 14.5 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.69 6.81 15.24 7.41 15.85C8.39 16.85 9.5 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.31 12.19 14.76 11.59 14.15C10.61 13.15 9.5 12 7 12Z" fill="currentColor"/>
                    </svg>
                  )}
                  {skill.icon === "postgres" && (
                    <svg className={`w-10 h-10 ${skill.color} group-hover:animate-pulse-soft`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.8955 11.8967C19.775 11.8967 18.9983 11.7436 18.4793 11.2076C19.2373 10.1696 20.4716 9.87638 21.3809 9.70373C21.8619 9.61591 22.4431 9.49799 22.8818 9.31192C23.1307 8.54504 23.2622 7.7242 23.2504 6.89831C23.2504 6.22663 23.1648 5.40531 23.1156 4.84289L23.0735 4.39318C22.8059 2.15305 21.7115 0.85784 19.8783 0.246751C18.8356 -0.0900615 17.7372 -0.0190374 16.7415 0.0731991C15.5771 0.183081 14.4056 0.39294 13.2554 0.70038C11.0436 1.30641 9.74945 2.49582 9.29823 4.28481C8.95444 5.64954 9.23945 7.05823 9.85997 7.7017C10.9593 8.8487 12.2323 8.89221 13.1204 8.92321C14.0295 8.95422 14.7796 8.98041 15.397 9.85768L15.402 9.86621C15.4867 9.9915 15.6125 10.2049 15.6263 10.4935C15.6546 11.0796 15.1788 11.485 14.3143 11.7373C12.9619 12.1276 11.5658 12.3333 10.1529 12.347C8.80997 12.347 7.71848 12.0676 6.85972 11.2118C5.37824 9.76407 5.66324 6.86247 5.69776 6.44804C5.70511 6.35851 5.74322 6.27501 5.80449 6.2121C5.86576 6.14918 5.94609 6.11077 6.03334 6.1037L8.39943 5.98326C8.49101 5.97613 8.58259 5.99775 8.66157 6.04478C8.74055 6.09182 8.80304 6.16223 8.83933 6.2461C9.1553 7.10285 9.72431 7.86973 10.5072 8.49382C10.5968 8.567 10.7051 8.60998 10.8163 8.61667C10.9274 8.62335 11.0393 8.59344 11.1375 8.53158C11.2357 8.46972 11.3153 8.37889 11.3655 8.2716C11.4157 8.16431 11.4341 8.04571 11.4183 7.92924C11.3014 6.84398 11.0329 5.77728 10.6186 4.75949C10.3825 4.16044 10.1003 3.5839 9.77503 3.03589L9.72799 2.95264C9.70955 2.92195 9.7144 2.88484 9.73127 2.85845C9.74814 2.83205 9.77492 2.81976 9.80412 2.82623C9.96075 2.85724 10.196 2.89306 10.4451 2.92888C11.7599 3.11737 13.0492 3.42856 14.2946 3.85509C15.5183 4.29099 16.4345 4.76118 17.041 5.27265C17.1794 5.39207 17.3408 5.48134 17.5148 5.5353C17.6887 5.58927 17.8715 5.60683 18.0518 5.58673C18.232 5.56663 18.4061 5.50932 18.5633 5.41909C18.7204 5.32887 18.8571 5.20781 18.9643 5.06421C19.1726 4.79371 19.2849 4.46006 19.2831 4.11765V4.09147C19.2831 3.58525 18.9943 3.17082 18.7016 2.88002C17.7058 1.92357 16.1396 1.63276 15.3079 1.47936C15.2538 1.46939 15.2016 1.45339 15.1536 1.4319C15.1277 1.41957 15.1072 1.40054 15.0947 1.37732C15.0822 1.3541 15.0784 1.32793 15.0839 1.30266C15.0893 1.2774 15.1036 1.25443 15.1246 1.23728C15.1456 1.22013 15.1723 1.20975 15.201 1.20778C15.6453 1.18643 16.0906 1.19041 16.534 1.2196C17.3937 1.26311 18.0487 1.48259 18.4989 1.60304C19.6723 1.91758 20.3262 2.52842 20.5662 2.80198C20.6196 2.86106 20.6901 2.90255 20.7687 2.92138C20.8473 2.9402 20.9301 2.93546 21.0058 2.90783C21.0816 2.88021 21.1468 2.83112 21.193 2.76712C21.2391 2.70313 21.2641 2.6274 21.2651 2.54949V2.54949C21.2625 1.5806 20.8567 0.960465 20.0886 0.621087C18.8086 0.0602517 17.0246 -0.0941986 16.0975 0.0510043L15.9947 0.0662091C14.5658 0.217092 13.0769 0.584705 11.5985 1.15474C10.3214 1.65042 8.8611 2.21284 7.89715 3.19738C7.0908 4.01027 6.67534 5.19968 6.54255 6.0772L6.43809 6.2517C6.38623 6.34124 6.30241 6.4051 6.20351 6.42805C6.10461 6.45101 6.00065 6.43122 5.92162 6.37426C5.33017 5.94078 4.85704 5.37865 4.53954 4.73232C4.25453 4.1618 4.158 3.68679 4.158 3.15246C4.16053 2.88821 4.21178 2.62673 4.30857 2.38224L4.34308 2.29898C4.36083 2.2552 4.36083 2.20765 4.34308 2.16387C4.3254 2.1201 4.29156 2.08406 4.24781 2.06213C4.20407 2.0402 4.15398 2.03405 4.10692 2.04474C4.05985 2.05543 4.01919 2.08228 3.99161 2.12111C3.87025 2.29755 3.71777 2.59317 3.53871 2.96405C3.28277 3.4941 3.2142 3.90853 3.2142 4.37873C3.2142 5.73864 3.89337 7.16685 5.03094 7.90813C4.96098 8.32965 4.92399 8.75575 4.92048 9.18262C4.92048 10.0934 5.11207 11.2828 5.8881 12.302C6.91408 13.6325 8.48124 14.3042 10.553 14.3042C12.0626 14.3042 13.5529 14.0899 14.9872 13.6749C16.4512 13.249 17.2052 12.5285 17.2614 11.5025C17.2821 11.1356 17.1761 10.7739 16.9618 10.4797C16.7475 10.1855 16.4372 9.97515 16.0857 9.88543C17.3552 9.97868 19.4078 9.92565 20.607 10.2003C21.2903 10.3599 22.4596 10.7317 22.9457 11.5025C23.0522 11.6702 23.1081 11.8669 23.105 12.0672C23.1018 12.2675 23.0399 12.4623 22.9282 12.6262C22.2793 13.5551 21.0133 13.8839 19.742 13.8839H19.5791C19.4893 13.8838 19.403 13.9175 19.3347 13.9786C19.2665 14.0398 19.2209 14.1243 19.2066 14.2179C19.1924 14.3116 19.2104 14.4073 19.2573 14.4873C19.3041 14.5673 19.3767 14.6261 19.4613 14.6534C20.0527 14.8273 20.8663 14.8653 21.4304 14.8653C22.7643 14.8653 23.7965 14.2369 24.1416 13.1809C24.348 12.5397 24.3322 11.83 24.0977 11.197C23.7455 10.2995 22.9006 9.09057 20.8955 9.09057V11.8967ZM11.9047 2.8007C12.3328 2.8007 12.7437 2.9666 13.0474 3.26165C13.351 3.55669 13.5224 3.95564 13.5224 4.37204C13.5224 4.78843 13.351 5.18738 13.0474 5.48242C12.7437 5.77747 12.3328 5.94337 11.9047 5.94337C11.4765 5.94337 11.0657 5.77747 10.762 5.48242C10.4583 5.18738 10.2869 4.78843 10.2869 4.37204C10.2869 3.95564 10.4583 3.55669 10.762 3.26165C11.0657 2.9666 11.4765 2.8007 11.9047 2.8007ZM13.9364 7.50166C13.9364 7.91805 13.765 8.317 13.4613 8.61205C13.1577 8.90709 12.7468 9.073 12.3186 9.073C11.8905 9.073 11.4796 8.90709 11.176 8.61205C10.8723 8.317 10.7009 7.91805 10.7009 7.50166C10.7009 7.08526 10.8723 6.68631 11.176 6.39127C11.4796 6.09622 11.8905 5.93032 12.3186 5.93032C12.7468 5.93032 13.1577 6.09622 13.4613 6.39127C13.765 6.68631 13.9364 7.08526 13.9364 7.50166ZM9.62871 4.37204C9.62871 4.78843 9.45734 5.18738 9.15367 5.48242C8.85 5.77747 8.43913 5.94337 8.01097 5.94337C7.58282 5.94337 7.17195 5.77747 6.86827 5.48242C6.5646 5.18738 6.39323 4.78843 6.39323 4.37204C6.39323 3.95564 6.5646 3.55669 6.86827 3.26165C7.17195 2.9666 7.58282 2.8007 8.01097 2.8007C8.43913 2.8007 8.85 2.9666 9.15367 3.26165C9.45734 3.55669 9.62871 3.95564 9.62871 4.37204ZM15.8039 4.37204C15.8039 4.78843 15.6326 5.18738 15.3289 5.48242C15.0252 5.77747 14.6144 5.94337 14.1862 5.94337C13.7581 5.94337 13.3472 5.77747 13.0435 5.48242C12.7398 5.18738 12.5685 4.78843 12.5685 4.37204C12.5685 3.95564 12.7398 3.55669 13.0435 3.26165C13.3472 2.9666 13.7581 2.8007 14.1862 2.8007C14.6144 2.8007 15.0252 2.9666 15.3289 3.26165C15.6326 3.55669 15.8039 3.95564 15.8039 4.37204ZM16.3384 7.50166C16.3384 7.91805 16.167 8.317 15.8633 8.61205C15.5597 8.90709 15.1488 9.073 14.7206 9.073C14.2925 9.073 13.8816 8.90709 13.5779 8.61205C13.2743 8.317 13.1029 7.91805 13.1029 7.50166C13.1029 7.08526 13.2743 6.68631 13.5779 6.39127C13.8816 6.09622 14.2925 5.93032 14.7206 5.93032C15.1488 5.93032 15.5597 6.09622 15.8633 6.39127C16.167 6.68631 16.3384 7.08526 16.3384 7.50166ZM11.5344 7.50166C11.5344 7.91805 11.363 8.317 11.0594 8.61205C10.7557 8.90709 10.3448 9.073 9.9167 9.073C9.48854 9.073 9.07767 8.90709 8.774 8.61205C8.47033 8.317 8.29896 7.91805 8.29896 7.50166C8.29896 7.08526 8.47033 6.68631 8.774 6.39127C9.07767 6.09622 9.48854 5.93032 9.9167 5.93032C10.3448 5.93032 10.7557 6.09622 11.0594 6.39127C11.363 6.68631 11.5344 7.08526 11.5344 7.50166Z" fill="currentColor"/>
                    </svg>
                  )}
                </div>
                <span className="text-sm text-text-secondary transition-colors group-hover:text-primary-accent">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 animate-fade-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                Featured <span className="text-primary-accent">Projects</span>
              </h2>
              <p className="text-text-secondary">Some of my recent work</p>
            </div>
            <a 
              href="/projects" 
              className="mt-4 md:mt-0 flex items-center text-primary-accent hover:text-primary-accent/80 transition-all duration-300 hover:translate-x-1 group"
            >
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-secondary-bg rounded-xl overflow-hidden border border-gray-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6 relative">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/5 to-secondary-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary-accent transition-colors">{project.title}</h3>
                  <p className="text-text-secondary text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies && project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="inline-block px-2 py-1 text-xs bg-primary-accent/10 text-primary-accent rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href="/projects" 
                    className="text-primary-accent hover:text-primary-accent/80 transition-colors text-sm flex items-center group"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-secondary-bg/50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-accent/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '0s', left: '-5%', top: '20%' }}></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-accent/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s', right: '-5%', bottom: '10%' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-primary-accent/20 to-secondary-accent/20 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-800/30 backdrop-blur-sm animate-fade-in">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 animate-slide-up">Ready to bring your ideas to life?</h2>
              <p className="text-text-secondary mb-8 animate-slide-up delay-100">
                Let's collaborate and create something amazing together. Whether you need a website, web application, or consulting services, I'm here to help.
              </p>
              <div className="animate-slide-up delay-200">
                <a 
                  href="/contact" 
                  className="inline-block px-8 py-4 bg-primary-accent hover:bg-primary-accent/90 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 relative overflow-hidden group"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-accent to-secondary-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
              </div>
              
              {/* Decorative circles */}
              <div className="mt-8 flex justify-center space-x-3 animate-slide-up delay-300">
                {[...Array(5)].map((_, index) => (
                  <div 
                    key={index} 
                    className="w-2 h-2 rounded-full bg-primary-accent animate-pulse-soft"
                    style={{ animationDelay: `${index * 200}ms` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const About: React.FC = () => {
  const skills = [
    { name: "React & React Native", percentage: 95 },
    { name: "JavaScript / TypeScript", percentage: 90 },
    { name: "Node.js & Express", percentage: 85 },
    { name: "HTML & CSS", percentage: 95 },
    { name: "UI/UX Design", percentage: 80 },
    { name: "MongoDB & PostgreSQL", percentage: 85 }
  ];

  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Stanford University",
      period: "2018 - 2020",
      description: "Specialized in web technologies and cloud computing. Thesis on scalable microservices architecture."
    },
    {
      degree: "Bachelor of Science in Web Development",
      institution: "MIT",
      period: "2014 - 2018",
      description: "Foundation in computer science principles with focus on web technologies and user interface design."
    }
  ];

  const experience = [
    {
      position: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "2020 - Present",
      description: "Led development of multiple web applications using React, Node.js, and GraphQL. Improved site performance by 40% and implemented CI/CD pipelines."
    },
    {
      position: "Frontend Developer",
      company: "WebSolutions Co.",
      period: "2018 - 2020",
      description: "Developed responsive UIs for client projects using React and Redux. Collaborated with designers to implement pixel-perfect designs."
    },
    {
      position: "Web Development Intern",
      company: "Digital Innovations",
      period: "2017 - 2018",
      description: "Assisted in developing interactive website features and UI components. Optimized existing code for improved performance."
    }
  ];
  
  // Skill Bar Component
  const SkillBar = ({ name, percentage }: { name: string; percentage: number }) => (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-text-secondary">{percentage}%</span>
      </div>
      <div className="h-[6px] bg-secondary-bg rounded-sm overflow-hidden">
        <div className="h-full rounded-sm bg-primary-accent" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 animate-slide-down">About Me</h1>
            <p className="text-lg text-text-secondary animate-slide-up delay-200">
              Get to know more about me, my skills, experience, and what drives me to create exceptional digital experiences.
            </p>
          </div>
        </div>
      </section>
      
      {/* Biography Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 flex items-center animate-slide-right">
                <span className="w-10 h-10 rounded-lg bg-primary-accent/20 flex items-center justify-center mr-3 animate-pulse-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                My Biography
              </h2>
              
              <div className="space-y-4 text-text-secondary animate-fade-in delay-100">
                <p className="transition-all duration-300 hover:translate-x-1 hover:text-text-primary">
                  I'm a full-stack developer with over 5 years of experience building web applications that are both functional and beautiful. My journey began when I discovered my passion for turning ideas into reality through code.
                </p>
                <p className="transition-all duration-300 hover:translate-x-1 hover:text-text-primary">
                  I specialize in React, Node.js, and modern JavaScript frameworks, with a focus on creating responsive, accessible, and performant web applications. I love solving complex problems and continuously learning new technologies.
                </p>
                <p className="transition-all duration-300 hover:translate-x-1 hover:text-text-primary">
                  My approach to development combines technical excellence with a strong focus on user experience. I believe in writing clean, maintainable code that delivers real value to users and businesses alike.
                </p>
                <p className="transition-all duration-300 hover:translate-x-1 hover:text-text-primary">
                  When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new recipes in the kitchen. I believe in maintaining a healthy work-life balance to fuel creativity and productivity.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-6 animate-fade-in delay-200">
                <div className="transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-lg font-heading font-bold mb-3">Download my CV</h3>
                  <a 
                    href="#" 
                    className="inline-flex items-center px-4 py-2 border border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-white font-medium rounded-lg transition-all duration-300 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:animate-bounce-subtle" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download Resume
                  </a>
                </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-lg font-heading font-bold mb-3">My Availability</h3>
                  <div className="flex items-center group">
                    <div className="w-3 h-3 rounded-full bg-secondary-accent mr-2 animate-pulse-soft"></div>
                    <span className="text-secondary-accent text-sm group-hover:font-medium transition-all duration-300">Available for freelance projects</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in delay-300">
              <div className="rounded-2xl border border-gray-800 bg-secondary-bg/80 shadow-xl p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-accent/10 rounded-full filter blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-accent/10 rounded-full filter blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-secondary-bg/80 p-4 rounded-lg border border-gray-800 animate-slide-right">
                      <div className="mb-4 text-center">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-accent/10 text-primary-accent mx-auto mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-primary-accent mb-1">5+</h3>
                        <div className="text-sm text-text-secondary">Years of Experience</div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Frontend</span>
                          <span className="text-primary-accent">Advanced</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5 mb-3">
                          <div className="bg-primary-accent h-1.5 rounded-full w-[90%]"></div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Backend</span>
                          <span className="text-primary-accent">Advanced</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5 mb-3">
                          <div className="bg-primary-accent h-1.5 rounded-full w-[85%]"></div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>DevOps</span>
                          <span className="text-primary-accent">Intermediate</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-primary-accent h-1.5 rounded-full w-[70%]"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary-bg/80 p-4 rounded-lg border border-gray-800 animate-slide-left">
                      <div className="mb-4 text-center">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-accent/10 text-secondary-accent mx-auto mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-secondary-accent mb-1">50+</h3>
                        <div className="text-sm text-text-secondary">Projects Completed</div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span>Web Applications</span>
                          <span className="text-secondary-accent">28</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5 mb-3">
                          <div className="bg-secondary-accent h-1.5 rounded-full w-[56%]"></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>Mobile Apps</span>
                          <span className="text-secondary-accent">12</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5 mb-3">
                          <div className="bg-secondary-accent h-1.5 rounded-full w-[24%]"></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>UI/UX Design</span>
                          <span className="text-secondary-accent">10</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-secondary-accent h-1.5 rounded-full w-[20%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-secondary-bg/80 p-4 rounded-lg border border-gray-800 animate-slide-up">
                    <div className="text-xs font-mono text-text-secondary animate-fade-in mb-2 opacity-75">
                      <pre className="whitespace-pre-wrap">
                        <code>
{`// Developer Philosophy
function writeCleanCode() {
  return {
    readable: true,
    maintainable: true,
    efficient: true,
    scalable: true,
    testable: true
  };
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-16 bg-secondary-bg/50 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-accent/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-accent/5 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10 animate-fade-in">
            Technical <span className="text-primary-accent">Skills</span>
          </h2>
          
          <div className="max-w-4xl mx-auto bg-secondary-bg/60 rounded-xl border border-gray-800 shadow-lg p-6 backdrop-blur-sm animate-fade-in">
            <div className="mb-6 font-mono text-xs text-text-secondary">
              <pre className="bg-gray-900/50 p-3 rounded overflow-x-auto animate-fade-in">
                <code>
{`// Developer Skill Set - 2023
const skillSet = {
  languages: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
  frameworks: ["React", "Node.js", "Express", "Next.js", "TailwindCSS"],
  databases: ["PostgreSQL", "MongoDB", "Redis"],
  tools: ["Git", "Docker", "AWS", "CI/CD", "Jest"],
  softSkills: ["Problem Solving", "Communication", "Self-Learning"]
};`}
                </code>
              </pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary-accent"></span>
                      {skill.name}
                    </span>
                    <span className="text-text-secondary">{skill.percentage}%</span>
                  </div>
                  <div className="h-[6px] bg-gray-800 rounded-sm overflow-hidden group relative">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-primary-accent to-secondary-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                    <div 
                      className="h-full rounded-sm bg-primary-accent transition-all duration-1000 animate-slide-right" 
                      style={{ 
                        width: `${skill.percentage}%`,
                        animationDelay: `${index * 100 + 300}ms` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute -top-40 left-20 w-80 h-80 bg-primary-accent/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 right-20 w-80 h-80 bg-secondary-accent/5 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-10 text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Career <span className="text-primary-accent">Timeline</span>
            </h2>
          </div>
          
          <div className="mb-10 font-mono text-xs text-text-secondary mx-auto max-w-4xl">
            <pre className="bg-secondary-bg/60 p-4 rounded-xl border border-gray-800 overflow-x-auto animate-fade-in">
              <code>
{`// Professional Journey
const careerPath = {
  experience: [
    {
      company: "TechCorp Inc.",
      position: "Senior Full Stack Developer",
      period: "2020 - Present",
      achievements: [
        "Led development of multiple web applications using React, Node.js, and GraphQL",
        "Improved site performance by 40% and implemented CI/CD pipelines",
        "Mentored junior developers and introduced best practices"
      ]
    },
    // More experiences...
  ],
  education: [
    {
      degree: "Master of Computer Science",
      institution: "Stanford University", 
      period: "2018 - 2020",
      focus: "Web technologies and cloud computing"
    }
    // More education...
  ]
};`}
              </code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="animate-fade-in delay-200">
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-8 flex items-center animate-slide-right">
                <span className="w-10 h-10 rounded-lg bg-primary-accent/20 flex items-center justify-center mr-3 animate-pulse-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </span>
                Work Experience
              </h2>
              
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <div 
                    key={index} 
                    className="relative pl-8 border-l-2 border-gray-700 pb-8 last:pb-0 animate-fade-in"
                    style={{ animationDelay: `${index * 150 + 300}ms` }}
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-accent animate-pulse-soft" style={{ animationDelay: `${index * 300}ms` }}></div>
                    <div className="bg-secondary-bg/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/5 to-secondary-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                          <h3 className="font-heading font-bold text-lg group-hover:text-primary-accent transition-colors">{job.position}</h3>
                          <span className="inline-block px-3 py-1 bg-primary-accent/10 text-primary-accent text-sm rounded-full">
                            {job.period}
                          </span>
                        </div>
                        <p className="text-text-secondary mb-3 font-medium">{job.company}</p>
                        <p className="text-sm text-text-secondary leading-relaxed">{job.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-fade-in delay-300">
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-8 flex items-center animate-slide-left">
                <span className="w-10 h-10 rounded-lg bg-secondary-accent/20 flex items-center justify-center mr-3 animate-pulse-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </span>
                Education
              </h2>
              
              <div className="space-y-8">
                {education.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative pl-8 border-l-2 border-gray-700 pb-8 last:pb-0 animate-fade-in"
                    style={{ animationDelay: `${index * 150 + 400}ms` }}
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary-accent animate-pulse-soft" style={{ animationDelay: `${index * 300 + 100}ms` }}></div>
                    <div className="bg-secondary-bg/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/5 to-secondary-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <h3 className="font-heading font-bold text-lg group-hover:text-secondary-accent transition-colors">{item.degree}</h3>
                          <span className="inline-block px-3 py-1 bg-secondary-accent/10 text-secondary-accent text-sm rounded-full">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-text-secondary mb-3 font-medium">{item.institution}</p>
                        <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-accent/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '0s', left: '-5%', top: '20%' }}></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-accent/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s', right: '-5%', bottom: '10%' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-secondary-bg/60 backdrop-blur-md rounded-2xl border border-gray-800 shadow-xl overflow-hidden relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/5 to-secondary-accent/5 opacity-70"></div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <div className="text-xs font-mono text-text-secondary mb-6 animate-fade-in">
                  <pre className="bg-secondary-bg/80 p-3 rounded overflow-x-auto">
                    <code>
{`function connectAndCollaborate() {
  return {
    status: "Available",
    for: ["Freelance", "Contract", "Full-time"],
    interests: ["Web Development", "Mobile Apps", "UX Engineering"],
    response_time: "< 24 hours"
  };
}`}
                    </code>
                  </pre>
                </div>
                
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 animate-slide-up">Ready to Build Something Amazing?</h2>
                  <p className="text-text-secondary mb-8 animate-slide-up delay-100">I'm currently available for freelance work and open to discussing new opportunities. If you have a project that needs coding expertise, let's have a conversation.</p>
                  
                  <div className="flex flex-wrap justify-center gap-4 animate-slide-up delay-200">
                    <a 
                      href="/contact" 
                      className="px-6 py-3 bg-primary-accent hover:bg-primary-accent/90 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 flex items-center group"
                    >
                      <span>Get in Touch</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                    
                    <a 
                      href="mailto:contact@example.com" 
                      className="px-6 py-3 bg-secondary-bg border border-gray-700 hover:border-primary-accent text-text-primary font-medium rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 flex items-center group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-accent" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>contact@example.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Web Apps', 'Mobile Apps', 'UI/UX'];
  
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'Web Apps',
      description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/ecommerce',
      githubLink: 'https://github.com/johndoe/ecommerce',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'Mobile Apps',
      description: 'A productivity app to help users manage tasks, set deadlines, and track progress with intuitive UI.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/taskmanager',
      githubLink: 'https://github.com/johndoe/taskmanager',
      featured: true
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      category: 'Web Apps',
      description: 'A comprehensive dashboard with real-time data visualization and reporting capabilities.',
      technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/analytics',
      githubLink: 'https://github.com/johndoe/analytics',
      featured: true
    },
    {
      id: 4,
      title: 'Fitness Tracker App',
      category: 'Mobile Apps',
      description: 'A fitness tracking application with workout plans, progress monitoring, and social features.',
      technologies: ['React Native', 'GraphQL', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/fitness',
      githubLink: 'https://github.com/johndoe/fitness',
      featured: false
    },
    {
      id: 5,
      title: 'Social Media Platform',
      category: 'Web Apps',
      description: 'A niche social media platform for creative professionals to showcase work and connect.',
      technologies: ['React', 'Socket.io', 'Express', 'AWS'],
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/social',
      githubLink: 'https://github.com/johndoe/social',
      featured: false
    },
    {
      id: 6,
      title: 'UI/UX Design System',
      category: 'UI/UX',
      description: 'A comprehensive design system with reusable components for consistent, scalable interfaces.',
      technologies: ['Figma', 'React', 'Storybook'],
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/designsystem',
      githubLink: 'https://github.com/johndoe/designsystem',
      featured: false
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  // Project Card Component
  const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <div className="bg-secondary-bg rounded-xl overflow-hidden border border-gray-800 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-56 object-cover"
        />
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-secondary-accent text-white text-xs rounded-full">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 bg-secondary-bg/80 backdrop-blur-sm rounded-full p-2">
          <a href={project.githubLink} className="text-text-secondary hover:text-primary-accent" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-bold text-xl">{project.title}</h3>
          <span className="ml-2 px-2 py-1 bg-primary-accent/10 text-primary-accent text-xs rounded-full">
            {project.category}
          </span>
        </div>
        <p className="text-text-secondary text-sm mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-secondary-accent/10 text-secondary-accent rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <a 
          href={project.demoLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-accent hover:text-primary-accent/80 font-medium text-sm inline-flex items-center"
        >
          View Project
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">My Projects</h1>
            <p className="text-lg text-text-secondary">
              A showcase of my web development and design projects. Browse through my latest work.
            </p>
          </div>
        </div>
      </section>
      
      {/* Projects Filter & Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter, index) => (
              <button 
                key={index} 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === filter 
                    ? 'bg-primary-accent text-white' 
                    : 'bg-secondary-bg hover:bg-gray-700 text-text-secondary'
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-text-secondary">No projects match the selected filter.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="py-16 bg-secondary-bg/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Have a project in mind?</h2>
            <p className="text-text-secondary mb-8">
              I'm always interested in new projects and collaborations. Let's discuss how I can help bring your ideas to life.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-6 py-3 bg-primary-accent hover:bg-primary-accent/90 text-white font-medium rounded-lg transition-colors"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'React', 'JavaScript', 'Web Development', 'UI/UX'];
  
  const blogPosts = [
    {
      id: 1,
      title: 'Modern React Patterns for Clean and Maintainable Code',
      summary: 'Learn about advanced React patterns that will help you write cleaner, more maintainable code for your web applications.',
      date: 'May 15, 2023',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'John Doe',
      categories: ['React', 'JavaScript'],
      featured: true
    },
    {
      id: 2,
      title: 'Building Accessible Web Applications: A Complete Guide',
      summary: 'Accessibility is not just a nice-to-have feature. Discover how to make your applications usable by everyone.',
      date: 'April 3, 2023',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1597839219216-a773cb2473e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'John Doe',
      categories: ['Web Development', 'UI/UX'],
      featured: true
    },
    {
      id: 3,
      title: 'Web Performance Optimization Techniques for 2023',
      summary: 'Explore the latest techniques and best practices for optimizing your web application\'s performance.',
      date: 'March 12, 2023',
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'John Doe',
      categories: ['Web Development', 'JavaScript'],
      featured: false
    },
    {
      id: 4,
      title: 'State Management in React: Context API vs. Redux',
      summary: 'Compare the different approaches to state management in React and learn when to use each one.',
      date: 'February 25, 2023',
      readTime: 7,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'John Doe',
      categories: ['React', 'JavaScript'],
      featured: false
    },
    {
      id: 5,
      title: 'Designing Better User Interfaces: Principles and Practices',
      summary: 'Learn the fundamental principles of good UI design and how to apply them in your projects.',
      date: 'January 18, 2023',
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'John Doe',
      categories: ['UI/UX'],
      featured: false
    },
    {
      id: 6,
      title: 'Getting Started with TypeScript in React Projects',
      summary: 'A beginner-friendly guide to integrating TypeScript into your React applications.',
      date: 'December 10, 2022',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'John Doe',
      categories: ['React', 'JavaScript', 'TypeScript'],
      featured: false
    }
  ];

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.categories.includes(activeCategory));
  
  // Featured post at the top
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);
  
  // Blog Card Component
  const BlogCard = ({ post, featured = false }: { post: typeof blogPosts[0], featured?: boolean }) => (
    <div className={`group bg-secondary-bg rounded-xl overflow-hidden border border-gray-800 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
      featured ? 'md:col-span-2 lg:flex' : ''
    }`}>
      <div className={`relative ${featured ? 'lg:w-1/2' : ''}`}>
        <img 
          src={post.image} 
          alt={post.title} 
          className={`w-full ${featured ? 'h-64 lg:h-full' : 'h-48'} object-cover`}
        />
        {post.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-secondary-accent text-white text-xs rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className={`p-6 ${featured ? 'lg:w-1/2' : ''}`}>
        <div className="flex items-center mb-3 text-sm text-text-secondary">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {post.date}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {post.readTime} min read
          </span>
        </div>
        
        <h3 className={`font-heading font-bold ${featured ? 'text-2xl mb-4' : 'text-xl mb-3'} transition-colors duration-200 group-hover:text-primary-accent`}>
          {post.title}
        </h3>
        
        <p className={`text-text-secondary ${featured ? 'text-base mb-5' : 'text-sm mb-4'}`}>{post.summary}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((category, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-primary-accent/10 text-primary-accent rounded-full cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory(category);
              }}
            >
              {category}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium mr-2">JD</div>
            <span className="text-text-secondary text-sm">{post.author}</span>
          </div>
          
          <a href="#" className="text-primary-accent hover:text-primary-accent/80 transition-colors text-sm inline-flex items-center">
            Read Article
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Blog & Articles</h1>
            <p className="text-lg text-text-secondary">
              Thoughts, insights, and tutorials about web development, design, and technology.
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category, index) => (
              <button 
                key={index} 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category 
                    ? 'bg-primary-accent text-white' 
                    : 'bg-secondary-bg hover:bg-gray-700 text-text-secondary'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* All Posts */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-text-secondary">No articles match the selected category.</p>
              <button 
                className="mt-6 px-4 py-2 bg-primary-accent text-white rounded-lg"
                onClick={() => setActiveCategory('All')}
              >
                View All Articles
              </button>
            </div>
          </div>
        </section>
      )}
      
      {/* You can add additional sections here if needed - e.g., FAQ, testimonials, etc. */}
    </>
  );
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would send the form data to your backend or a form service
    console.log('Form submitted:', formData);
    
    // Simulate successful form submission
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Thank you for your message! I will get back to you soon.'
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // In a real application, you would handle errors too
    // setFormStatus({
    //   submitted: true,
    //   error: true,
    //   message: 'Oops! Something went wrong. Please try again later.'
    // });
  };
  
  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Get In Touch</h1>
            <p className="text-lg text-text-secondary">
              Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you!
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-secondary-bg p-8 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-heading font-bold mb-6">Send Me a Message</h2>
              
              {formStatus.submitted && (
                <div className={`p-4 mb-6 rounded-lg ${formStatus.error ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-colors" 
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-colors" 
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-colors" 
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    rows={6} 
                    className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-colors resize-none" 
                    placeholder="Tell me about your project, ideas, or questions..."
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 px-6 bg-primary-accent hover:bg-primary-accent/90 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-secondary-bg p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-heading font-bold mb-6">Contact Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary-accent/20 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Email</h4>
                      <a href="mailto:hello@johndoe.com" className="text-text-secondary hover:text-primary-accent transition-colors">
                        hello@johndoe.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-accent/20 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Phone</h4>
                      <a href="tel:+11234567890" className="text-text-secondary hover:text-primary-accent transition-colors">
                        +1 (123) 456-7890
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-accent/20 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Location</h4>
                      <p className="text-text-secondary">San Francisco, California</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-secondary-bg p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-heading font-bold mb-6">Connect With Me</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex flex-col items-center p-4 bg-primary-bg rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6 text-text-secondary mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-text-secondary text-sm">GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex flex-col items-center p-4 bg-primary-bg rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6 text-text-secondary mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-text-secondary text-sm">LinkedIn</span>
                  </a>
                  {/* Add more social links here as needed */}
                  {/* 
                    You can add additional social media links here
                    Examples:
                    - Stack Overflow
                    - Medium
                    - CodePen
                    - Dev.to
                  */}
                </div>
              </div>
              
              <div className="bg-secondary-bg p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-heading font-bold mb-4">Availability</h3>
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-secondary-accent mr-2"></div>
                  <span className="text-secondary-accent">Available for new projects</span>
                </div>
                <p className="text-text-secondary text-sm">I'm currently accepting new projects and would love to hear about yours. Let's create something amazing together!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-secondary-bg/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What services do you offer?",
                answer: "I offer a wide range of services including web development, front-end development, back-end development, UI/UX design, responsive design, and performance optimization."
              },
              {
                question: "How much do you charge for a typical project?",
                answer: "Project costs vary depending on scope, complexity, and timeline. I offer both hourly rates and fixed-price quotes. Contact me with your project details for a custom quote."
              },
              {
                question: "What is your typical timeline for completing a project?",
                answer: "Timeline depends on project complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months. I'll provide a detailed timeline during our initial consultation."
              },
              {
                question: "Do you provide ongoing maintenance and support?",
                answer: "Yes, I offer various maintenance packages to keep your site secure, up-to-date, and running smoothly. We can discuss the right option for your needs."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-secondary-bg rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                <p className="text-text-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Simplified context
type PageContextType = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};

function App() {
  const [location] = useLocation();
  const { setCurrentPage } = usePage();

  useEffect(() => {
    // Extract the page from URL path (or set to 'home' if root path)
    const path = location === "/" ? "home" : location.replace("/", "");
    setCurrentPage(path);
    
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  }, [location, setCurrentPage]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <AnimatePresence mode="wait">
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/projects" component={Projects} />
            <Route path="/blog" component={Blog} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </AnimatePresence>
      
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
