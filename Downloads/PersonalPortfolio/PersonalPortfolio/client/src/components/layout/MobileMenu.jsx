import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

const MobileMenu = ({ isOpen, onClose }) => {
  const [location] = useLocation();
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ];

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/70 z-50 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="fixed right-0 top-0 bottom-0 w-4/5 bg-secondary-bg p-6 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <a className="font-heading font-bold text-xl text-primary-accent">
              John<span className="text-text-primary">Doe</span>
            </a>
          </Link>
          
          <button 
            className="text-text-secondary hover:text-primary-accent transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        
        <nav className="mb-8">
          <ul className="space-y-6">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <a 
                    className={`text-lg hover:text-primary-accent transition-colors block ${
                      location === item.href ? 'text-primary-accent' : 'text-text-secondary'
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <a 
          href="mailto:hello@johndoe.com" 
          className="flex items-center justify-center w-full px-4 py-3 bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90 transition-colors"
        >
          <i className="ri-mail-line mr-2"></i>
          Get In Touch
        </a>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-text-secondary mb-4">Follow me on</p>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
              <i className="ri-github-fill text-xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
              <i className="ri-linkedin-fill text-xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
              <i className="ri-twitter-fill text-xl"></i>
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
              <i className="ri-dribbble-fill text-xl"></i>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;