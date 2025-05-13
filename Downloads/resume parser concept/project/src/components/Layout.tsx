import { Outlet, Link, useLocation } from 'react-router-dom';
import { useResumeContext } from '../context/ResumeContext';
import { FileText, Users, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = () => {
  const { userRole } = useResumeContext();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-charcoal text-ivory p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FileText size={28} className="text-coral" />
            </motion.div>
            <h1 className="text-xl font-bold">AI Resume Parser</h1>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-coral transition-colors duration-200 flex items-center space-x-1">
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            {userRole === 'recruiter' && (
              <>
                <Link 
                  to="/recruiter/dashboard" 
                  className={`${isActive('/recruiter/dashboard') ? 'text-coral' : 'hover:text-coral'} transition-colors duration-200 flex items-center space-x-1`}
                >
                  <Users size={18} />
                  <span>Candidates</span>
                </Link>
                <Link 
                  to="/recruiter/compare" 
                  className={`${isActive('/recruiter/compare') ? 'text-coral' : 'hover:text-coral'} transition-colors duration-200`}
                >
                  Compare
                </Link>
              </>
            )}
            
            {userRole === 'student' && (
              <Link 
                to="/student/feedback" 
                className={`${isActive('/student/feedback') ? 'text-coral' : 'hover:text-coral'} transition-colors duration-200`}
              >
                Feedback
              </Link>
            )}
          </nav>
          
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="bg-charcoal text-ivory p-4 mt-auto">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AI Resume Parser | Privacy First - Your data is never stored</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;