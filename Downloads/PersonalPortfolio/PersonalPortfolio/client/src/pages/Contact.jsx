import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTransition from '../components/ui/SectionTransition';
import SocialLinks from '../components/ui/SocialLinks';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to your backend or a form service
    console.log('Form submitted:', formData);
    
    // Simulate successful form submission
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Thank you for your message! I will get back to you soon.'
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Get In Touch</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you!
          </p>
        </SectionTransition>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <SectionTransition className="bg-secondary-bg p-8 rounded-xl border border-gray-800" delay={1}>
            <h3 className="text-2xl font-heading font-bold mb-6">Send Me a Message</h3>
            
            {formStatus.submitted && (
              <div className={`p-4 mb-6 rounded-lg ${formStatus.error ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                {formStatus.message}
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-colors" 
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-colors" 
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-colors" 
                  placeholder="What is this regarding?"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  rows="6" 
                  className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-colors resize-none" 
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-3 px-6 bg-primary-accent hover:bg-primary-accent/90 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Send Message
                <i className="ri-send-plane-fill ml-2"></i>
              </button>
            </form>
          </SectionTransition>
          
          <SectionTransition delay={2}>
            <div className="bg-secondary-bg p-8 rounded-xl border border-gray-800 mb-8">
              <h3 className="text-2xl font-heading font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary-accent/20 flex items-center justify-center mr-4">
                    <i className="ri-mail-line text-primary-accent"></i>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Email</p>
                    <a href="mailto:hello@johndoe.com" className="text-text-primary hover:text-primary-accent transition-colors">hello@johndoe.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary-accent/20 flex items-center justify-center mr-4">
                    <i className="ri-phone-line text-primary-accent"></i>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Phone</p>
                    <a href="tel:+11234567890" className="text-text-primary hover:text-primary-accent transition-colors">+1 (123) 456-7890</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary-accent/20 flex items-center justify-center mr-4">
                    <i className="ri-map-pin-line text-primary-accent"></i>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Location</p>
                    <p className="text-text-primary">San Francisco, California</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-heading font-medium mb-4">Follow Me</h4>
                <SocialLinks vertical={true} />
              </div>
            </div>
            
            <div className="bg-secondary-bg p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-heading font-bold mb-6">Availability</h3>
              <p className="text-text-secondary mb-4">I'm currently available for freelance work and open to discussing new opportunities.</p>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-secondary-accent mr-2"></div>
                <span className="text-secondary-accent text-sm">Available for new projects</span>
              </div>
              <a 
                href="/john-doe-resume.pdf" 
                className="inline-block px-6 py-3 border border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-white font-medium rounded-lg transition-all duration-200 mt-2"
              >
                Download Resume
              </a>
            </div>
          </SectionTransition>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;