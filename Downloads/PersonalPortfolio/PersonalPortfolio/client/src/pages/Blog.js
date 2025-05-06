import { motion } from 'framer-motion';
import SectionTransition from '../components/ui/SectionTransition';
import BlogCard from '../components/ui/BlogCard';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Modern React Patterns for Clean and Maintainable Code',
      summary: 'Learn about advanced React patterns that will help you write cleaner, more maintainable code for your web applications.',
      date: 'May 15, 2023',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      tags: ['React', 'JavaScript']
    },
    {
      id: 2,
      title: 'Building Accessible Web Applications: A Complete Guide',
      summary: 'Accessibility is not just a nice-to-have feature. Discover how to make your applications usable by everyone.',
      date: 'April 3, 2023',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1597839219216-a773cb2473e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      tags: ['Accessibility', 'HTML', 'ARIA']
    },
    {
      id: 3,
      title: 'Web Performance Optimization Techniques for 2023',
      summary: 'Explore the latest techniques and best practices for optimizing your web application\'s performance.',
      date: 'March 12, 2023',
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      tags: ['Performance', 'Optimization', 'Web Vitals']
    }
  ];

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
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Blog & Articles</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Sharing my thoughts, experiences, and knowledge about web development and design.
          </p>
        </SectionTransition>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} delay={index + 1} />
          ))}
        </div>
        
        <SectionTransition className="mt-16 text-center" delay={4}>
          <a href="#" className="inline-flex items-center text-primary-accent hover:text-primary-accent/80 font-medium">
            View All Articles <i className="ri-arrow-right-line ml-2"></i>
          </a>
        </SectionTransition>
      </div>
    </motion.section>
  );
};

export default Blog;
