import { motion } from 'framer-motion';

const BlogCard = ({ post, delay = 0 }) => {
  const { image, date, readTime, title, summary, tags } = post;

  return (
    <motion.div 
      className="blog-post bg-secondary-bg rounded-xl overflow-hidden border border-gray-800 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <img 
        src={image} 
        alt={`${title} Article`} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-4 text-sm text-text-secondary">
          <span className="flex items-center">
            <i className="ri-calendar-line mr-1"></i>
            {date}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <i className="ri-time-line mr-1"></i>
            {readTime} min read
          </span>
        </div>
        
        <h3 className="font-heading font-bold text-xl mb-3 blog-title transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-text-secondary text-sm mb-4">{summary}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <a href="#" className="text-primary-accent hover:text-primary-accent/80 font-medium flex items-center text-sm">
          Read Article <i className="ri-arrow-right-line ml-1"></i>
        </a>
      </div>
    </motion.div>
  );
};

export default BlogCard;