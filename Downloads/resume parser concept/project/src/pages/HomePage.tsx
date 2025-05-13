import { useNavigate } from 'react-router-dom';
import { Users, User, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import { useResumeContext } from '../context/ResumeContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { setUserRole, clearAll } = useResumeContext();

  const handleRoleSelect = (role: 'recruiter' | 'student') => {
    clearAll();
    setUserRole(role);
    navigate(`/upload/${role}`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-charcoal">
          AI-Powered Resume Analysis
        </h1>
        <p className="text-xl text-charcoal-light mb-8 leading-relaxed">
          Transform the way you evaluate resumes with our advanced AI analysis tool.
          Choose your path below to get started.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
      >
        <motion.div variants={item}>
          <Card className="h-full flex flex-col p-8">
            <div className="bg-coral/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
              <Users size={32} className="text-coral" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-charcoal">I'm a Recruiter</h2>
            <p className="text-charcoal-light mb-6 flex-grow">
              Upload multiple resumes, analyze candidates side-by-side, and match them to job
              descriptions. Export structured data to streamline your hiring process.
            </p>
            <ul className="mb-8 space-y-2">
              <li className="flex items-start">
                <div className="mr-2 text-olive mt-0.5">
                  <ArrowRight size={16} />
                </div>
                <span>Upload up to 10 resumes at once</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-olive mt-0.5">
                  <ArrowRight size={16} />
                </div>
                <span>Compare candidates side-by-side</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-olive mt-0.5">
                  <ArrowRight size={16} />
                </div>
                <span>Match to job descriptions</span>
              </li>
            </ul>
            <Button 
              onClick={() => handleRoleSelect('recruiter')}
              className="w-full"
              icon={<ArrowRight size={18} />}
            >
              Continue as Recruiter
            </Button>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full flex flex-col p-8">
            <div className="bg-olive/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
              <User size={32} className="text-olive" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-charcoal">I'm a Student</h2>
            <p className="text-charcoal-light mb-6 flex-grow">
              Upload your resume to receive detailed feedback, optimization tips, and personalized
              suggestions to improve your chances of landing your dream job.
            </p>
            <ul className="mb-8 space-y-2">
              <li className="flex items-start">
                <div className="mr-2 text-coral mt-0.5">
                  <ArrowRight size={16} />
                </div>
                <span>Get a detailed resume score</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-coral mt-0.5">
                  <ArrowRight size={16} />
                </div>
                <span>Receive actionable feedback</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-coral mt-0.5">
                  <ArrowRight size={16} />
                </div>
                <span>Get ATS-friendly keyword suggestions</span>
              </li>
            </ul>
            <Button 
              onClick={() => handleRoleSelect('student')}
              variant="secondary"
              className="w-full"
              icon={<ArrowRight size={18} />}
            >
              Continue as Student
            </Button>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="max-w-3xl mx-auto mt-16 p-4 border border-gray-200 rounded-lg bg-white/50 shadow-sm"
      >
        <div className="flex items-center text-charcoal-light">
          <Shield size={20} className="mr-2" />
          <p className="text-sm">
            <strong>Privacy First:</strong> Your resume data is never stored on our servers. All processing happens in memory and is deleted after your session.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;