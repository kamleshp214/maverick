import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { usePage } from '../../context/PageContext';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentPage } = usePage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <header className={`fixed top-0 w-full z-50 border-b border-gray-800 transition-all duration-300 
      ${isScrolled ? 'bg-primary-bg/90 backdrop-blur' : 'bg-primary-bg'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-heading font-bold text-text-primary flex items-center gap-2">
            <span className="text-primary-accent">J</span>ohn
            <span className="text-primary-accent">D</span>oe
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" 
                  className={`nav-link text-sm font-medium 
                  ${currentPage === 'home' ? 'active' : 'text-text-secondary hover:text-text-primary'}`}>
              Home
            </Link>
            
            <Link href="/about" 
                  className={`nav-link text-sm font-medium 
                  ${currentPage === 'about' ? 'active' : 'text-text-secondary hover:text-text-primary'}`}>
              About
            </Link>
            
            <Link href="/projects" 
                  className={`nav-link text-sm font-medium 
                  ${currentPage === 'projects' ? 'active' : 'text-text-secondary hover:text-text-primary'}`}>
              Projects
            </Link>
            
            <Link href="/blog" 
                  className={`nav-link text-sm font-medium 
                  ${currentPage === 'blog' ? 'active' : 'text-text-secondary hover:text-text-primary'}`}>
              Blog
            </Link>
            
            <Link href="/contact" 
                  className={`nav-link text-sm font-medium 
                  ${currentPage === 'contact' ? 'active' : 'text-text-secondary hover:text-text-primary'}`}>
              Contact
            </Link>
          </nav>
          
          <button 
            id="mobile-menu-button" 
            className="md:hidden text-text-primary"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>
        </div>
      </div>
      
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </header>
  );
};

export default Header;
