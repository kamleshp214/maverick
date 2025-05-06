import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const { 
    image, 
    title, 
    category, 
    description, 
    technologies, 
    demoLink, 
    githubLink,
    delay = 0
  } = project;

  return (
    <motion.div 
      className="project-card bg-secondary-bg rounded-xl overflow-hidden border border-gray-800 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <img 
        src={image} 
        alt={`${title} Project`} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-heading font-bold text-xl">{title}</h3>
          <span className={`text-xs px-2 py-1 bg-${getCategoryColor(category)}-500/20 text-${getCategoryColor(category)}-400 rounded-full`}>
            {category}
          </span>
        </div>
        <p className="text-text-secondary text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-secondary-accent/10 text-secondary-accent rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between">
          <a 
            href={demoLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-accent hover:text-primary-accent/80 font-medium flex items-center text-sm"
          >
            {category === 'Mobile App' ? 'App Store' : 'Live Demo'} 
            <i className={`${category === 'Mobile App' ? 'ri-apple-fill' : 'ri-external-link-line'} ml-1`}></i>
          </a>
          
          <a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary font-medium flex items-center text-sm"
          >
            GitHub <i className="ri-github-line ml-1"></i>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to determine color based on category
const getCategoryColor = (category) => {
  switch(category) {
    case 'Web App':
      return 'blue';
    case 'Mobile App':
      return 'purple';
    case 'UI/UX Design':
      return 'pink';
    default:
      return 'blue';
  }
};

export default ProjectCard;