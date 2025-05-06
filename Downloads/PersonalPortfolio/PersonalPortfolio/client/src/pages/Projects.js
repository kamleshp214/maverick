import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTransition from '../components/ui/SectionTransition';
import ProjectCard from '../components/ui/ProjectCard';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  
  const filters = ['All Projects', 'Web Apps', 'Mobile Apps', 'UI/UX Design'];
  
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'Web App',
      description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/ecommerce',
      githubLink: 'https://github.com/johndoe/ecommerce'
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'Mobile App',
      description: 'A productivity app to help users manage tasks, set deadlines, and track progress with intuitive UI.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/taskmanager',
      githubLink: 'https://github.com/johndoe/taskmanager'
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      category: 'Web App',
      description: 'A comprehensive dashboard with real-time data visualization and reporting capabilities.',
      technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/analytics',
      githubLink: 'https://github.com/johndoe/analytics'
    },
    {
      id: 4,
      title: 'Fitness Tracker App',
      category: 'Mobile App',
      description: 'A fitness tracking application with workout plans, progress monitoring, and social features.',
      technologies: ['React Native', 'GraphQL', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/fitness',
      githubLink: 'https://github.com/johndoe/fitness'
    },
    {
      id: 5,
      title: 'Social Media Platform',
      category: 'Web App',
      description: 'A niche social media platform for creative professionals to showcase work and connect.',
      technologies: ['React', 'Socket.io', 'Express', 'AWS'],
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/social',
      githubLink: 'https://github.com/johndoe/social'
    },
    {
      id: 6,
      title: 'UI/UX Design System',
      category: 'UI/UX Design',
      description: 'A comprehensive design system with reusable components for consistent, scalable interfaces.',
      technologies: ['Figma', 'React', 'Storybook'],
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      demoLink: 'https://example.com/designsystem',
      githubLink: 'https://github.com/johndoe/designsystem'
    }
  ];

  const filteredProjects = activeFilter === 'All Projects' 
    ? projects 
    : projects.filter(project => {
        const category = project.category;
        // Map filter names to actual categories in the data
        if (activeFilter === 'Web Apps' && category === 'Web App') return true;
        if (activeFilter === 'Mobile Apps' && category === 'Mobile App') return true;
        if (activeFilter === 'UI/UX Design' && category === 'UI/UX Design') return true;
        return false;
      });

  return (
    <motion.section 
      className="pt-24 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTransition className="text-center mb-16" delay={0}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">My Projects</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Showcasing some of my best work - from web applications to mobile apps and more.
          </p>
        </SectionTransition>
        
        <SectionTransition className="flex flex-wrap justify-center gap-4 mb-12" delay={1}>
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
        </SectionTransition>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              delay={index + 2} 
            />
          ))}
        </div>
        
        <SectionTransition className="mt-16 text-center" delay={8}>
          <a href="#" className="inline-flex items-center text-primary-accent hover:text-primary-accent/80 font-medium">
            View All Projects <i className="ri-arrow-right-line ml-2"></i>
          </a>
        </SectionTransition>
      </div>
    </motion.section>
  );
};

export default Projects;
