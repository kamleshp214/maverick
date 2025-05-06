import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '../../context/PageContext';

const MobileMenu = ({ isOpen, onClose }) => {
  const { currentPage } = usePage();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="md:hidden bg-secondary-bg border-t border-gray-800 absolute w-full z-50"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-2 space-y-1">
            <Link 
              href="/" 
              onClick={onClose}
              className={`block py-3 px-4 text-base font-medium rounded-lg 
                ${currentPage === 'home' 
                  ? 'text-text-primary bg-gray-700' 
                  : 'text-text-secondary hover:bg-gray-700'}`}
            >
              Home
            </Link>
            
            <Link 
              href="/about" 
              onClick={onClose}
              className={`block py-3 px-4 text-base font-medium rounded-lg 
                ${currentPage === 'about' 
                  ? 'text-text-primary bg-gray-700' 
                  : 'text-text-secondary hover:bg-gray-700'}`}
            >
              About
            </Link>
            
            <Link 
              href="/projects" 
              onClick={onClose}
              className={`block py-3 px-4 text-base font-medium rounded-lg 
                ${currentPage === 'projects' 
                  ? 'text-text-primary bg-gray-700' 
                  : 'text-text-secondary hover:bg-gray-700'}`}
            >
              Projects
            </Link>
            
            <Link 
              href="/blog" 
              onClick={onClose}
              className={`block py-3 px-4 text-base font-medium rounded-lg 
                ${currentPage === 'blog' 
                  ? 'text-text-primary bg-gray-700' 
                  : 'text-text-secondary hover:bg-gray-700'}`}
            >
              Blog
            </Link>
            
            <Link 
              href="/contact" 
              onClick={onClose}
              className={`block py-3 px-4 text-base font-medium rounded-lg 
                ${currentPage === 'contact' 
                  ? 'text-text-primary bg-gray-700' 
                  : 'text-text-secondary hover:bg-gray-700'}`}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
