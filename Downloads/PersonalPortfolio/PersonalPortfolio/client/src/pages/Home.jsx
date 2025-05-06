import { Link } from 'wouter';
import { motion } from 'framer-motion';
import SectionTransition from '../components/ui/SectionTransition';
import SocialLinks from '../components/ui/SocialLinks';

const featuredTechnologies = [
  { icon: "ri-reactjs-line", color: "text-blue-400", name: "React" },
  { icon: "ri-javascript-line", color: "text-yellow-400", name: "JavaScript" },
  { icon: "ri-html5-line", color: "text-orange-500", name: "HTML5" },
  { icon: "ri-css3-line", color: "text-blue-500", name: "CSS3" },
  { icon: "ri-database-2-line", color: "text-green-500", name: "Node.js" },
  { icon: "ri-gatsby-line", color: "text-purple-500", name: "Tailwind CSS" }
];

const Home = () => {
  return (
    <motion.section 
      className="pt-24 min-h-screen flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <SectionTransition className="lg:col-span-3" delay={0}>
            <div className="inline-block px-3 py-1 rounded-full bg-primary-accent/10 text-primary-accent text-sm font-medium mb-6">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary-accent mr-2 animate-pulse"></span>
                Available for Work
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              Hi, I'm <span className="text-primary-accent">John Doe</span><br />
              <span className="text-gradient">
                Full-Stack Developer
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl">
              I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Let's turn your vision into reality.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" className="px-6 py-3 bg-primary-accent hover:bg-primary-accent/90 text-white font-medium rounded-lg transition-all duration-200 flex items-center">
                View My Work
                <i className="ri-arrow-right-line ml-2"></i>
              </Link>
              
              <Link href="/contact" className="px-6 py-3 bg-transparent border border-gray-700 hover:border-primary-accent text-text-primary font-medium rounded-lg transition-all duration-200">
                Contact Me
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
                <i className="ri-github-fill text-2xl"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
                <i className="ri-linkedin-fill text-2xl"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
                <i className="ri-twitter-fill text-2xl"></i>
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
                <i className="ri-dribbble-fill text-2xl"></i>
              </a>
            </div>
          </SectionTransition>
          
          <SectionTransition className="lg:col-span-2" delay={2}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="John Doe, Full-Stack Developer" 
                className="w-full h-auto rounded-2xl object-cover shadow-xl border border-gray-800" 
              />
              <div className="absolute -bottom-5 -right-5 bg-secondary-bg p-4 rounded-xl border border-gray-800 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">JS</div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">R</div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">TS</div>
                  </div>
                  <span className="text-sm font-medium">Tech Stack</span>
                </div>
              </div>
            </div>
          </SectionTransition>
        </div>
        
        <SectionTransition className="mt-24 pt-12 border-t border-gray-800" delay={3}>
          <h3 className="text-xl font-heading font-bold mb-8 text-text-primary">Featured Technologies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {featuredTechnologies.map((tech, index) => (
              <div key={index} className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
                <i className={`${tech.icon} text-4xl ${tech.color} mb-2`}></i>
                <span className="text-sm text-text-secondary">{tech.name}</span>
              </div>
            ))}
          </div>
        </SectionTransition>
      </div>
    </motion.section>
  );
};

export default Home;