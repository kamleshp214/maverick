import { Link } from 'wouter';
import SocialLinks from '../ui/SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-secondary-bg border-t border-gray-800 py-10 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-heading font-bold text-text-primary flex items-center gap-2">
              <span className="text-primary-accent">J</span>ohn
              <span className="text-primary-accent">D</span>oe
            </Link>
            <p className="text-text-secondary mt-2">Full-Stack Developer & Designer</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="text-text-secondary hover:text-primary-accent transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-text-secondary hover:text-primary-accent transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-text-secondary hover:text-primary-accent transition-colors">
              Projects
            </Link>
            <Link href="/blog" className="text-text-secondary hover:text-primary-accent transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-text-secondary hover:text-primary-accent transition-colors">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} John Doe. All rights reserved.
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
