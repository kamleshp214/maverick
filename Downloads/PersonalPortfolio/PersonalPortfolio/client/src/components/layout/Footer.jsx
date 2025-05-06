import { Link } from 'wouter';
import SocialLinks from '../ui/SocialLinks';

/**
 * Footer component for the portfolio website
 * 
 * This component displays site navigation, contact information,
 * and copyright details in the page footer.
 * 
 * CUSTOMIZATION GUIDE:
 * - Change the logo/name in the first column
 * - Update contact information (email, phone, location)
 * - Modify the copyright text and links at the bottom
 * - Add any additional sections in the grid structure
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-bg border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer grid - adjust the grid-cols value to match the number of columns you want */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Social Links */}
          <div className="md:col-span-1">
            <Link href="/">
              <a className="font-heading font-bold text-2xl text-primary-accent mb-4 inline-block">
                John<span className="text-text-primary">Doe</span>
              </a>
            </Link>
            <p className="text-text-secondary text-sm mb-6">
              Creating exceptional digital experiences through code and design.
            </p>
            <SocialLinks />
          </div>
          
          {/* Column 2: Quick Links Navigation */}
          <div className="md:col-span-1">
            <h4 className="font-heading font-bold text-lg mb-4 text-text-primary">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-text-secondary hover:text-primary-accent transition-colors text-sm">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-text-secondary hover:text-primary-accent transition-colors text-sm">About</a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-text-secondary hover:text-primary-accent transition-colors text-sm">Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-text-secondary hover:text-primary-accent transition-colors text-sm">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-text-secondary hover:text-primary-accent transition-colors text-sm">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact Information */}
          <div className="md:col-span-1">
            <h4 className="font-heading font-bold text-lg mb-4 text-text-primary">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-text-secondary text-sm">
                <i className="ri-mail-line mr-3 text-primary-accent"></i>
                <a href="mailto:hello@johndoe.com" className="hover:text-primary-accent transition-colors">
                  hello@johndoe.com
                </a>
              </li>
              <li className="flex items-center text-text-secondary text-sm">
                <i className="ri-phone-line mr-3 text-primary-accent"></i>
                <a href="tel:+11234567890" className="hover:text-primary-accent transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-start text-text-secondary text-sm">
                <i className="ri-map-pin-line mr-3 text-primary-accent mt-1"></i>
                <span>San Francisco, California</span>
              </li>
            </ul>
          </div>
          
          {/* Add additional columns here if needed 
          <div className="md:col-span-1">
            <h4 className="font-heading font-bold text-lg mb-4 text-text-primary">Custom Section</h4>
            <p className="text-text-secondary text-sm">
              You can add additional content here.
            </p>
          </div>
          */}
        </div>
        
        {/* Footer Bottom: Copyright and Legal Links */}
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

export default Footer;