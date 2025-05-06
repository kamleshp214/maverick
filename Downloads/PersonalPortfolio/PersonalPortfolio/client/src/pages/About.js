import { motion } from 'framer-motion';
import SectionTransition from '../components/ui/SectionTransition';
import SkillBar from '../components/ui/SkillBar';

const About = () => {
  const skills = [
    { name: "React & React Native", percentage: 95 },
    { name: "JavaScript / TypeScript", percentage: 90 },
    { name: "Node.js & Express", percentage: 85 },
    { name: "HTML & CSS", percentage: 95 },
    { name: "UI/UX Design", percentage: 80 },
    { name: "MongoDB & PostgreSQL", percentage: 85 }
  ];

  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Stanford University",
      period: "2018 - 2020"
    },
    {
      degree: "Bachelor of Science in Web Development",
      institution: "MIT",
      period: "2014 - 2018"
    }
  ];

  const experience = [
    {
      position: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "2020 - Present",
      description: "Led development of multiple web applications using React, Node.js, and GraphQL. Improved site performance by 40% and implemented CI/CD pipelines."
    },
    {
      position: "Frontend Developer",
      company: "WebSolutions Co.",
      period: "2018 - 2020",
      description: "Developed responsive UIs for client projects using React and Redux. Collaborated with designers to implement pixel-perfect designs."
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
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">About Me</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Get to know me better - my background, skills, and what drives me as a developer.
          </p>
        </SectionTransition>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <SectionTransition delay={1}>
            <h3 className="text-2xl font-heading font-bold mb-6 flex items-center">
              <span className="w-10 h-10 rounded-lg bg-primary-accent/20 flex items-center justify-center mr-3">
                <i className="ri-user-line text-primary-accent"></i>
              </span>
              Biography
            </h3>
            
            <div className="space-y-4 text-text-secondary">
              <p>
                I'm a full-stack developer with over 5 years of experience building web applications that are both functional and beautiful. My journey began when I discovered my passion for turning ideas into reality through code.
              </p>
              <p>
                I specialize in React, Node.js, and modern JavaScript frameworks, with a focus on creating responsive, accessible, and performant web applications. I love solving complex problems and continuously learning new technologies.
              </p>
              <p>
                When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new recipes in the kitchen. I believe in maintaining a healthy work-life balance to fuel creativity and productivity.
              </p>
            </div>
            
            <div className="mt-10">
              <h3 className="text-2xl font-heading font-bold mb-6 flex items-center">
                <span className="w-10 h-10 rounded-lg bg-primary-accent/20 flex items-center justify-center mr-3">
                  <i className="ri-graduation-cap-line text-primary-accent"></i>
                </span>
                Education
              </h3>
              
              <div className="space-y-6">
                {education.map((item, index) => (
                  <div key={index} className="p-6 bg-secondary-bg rounded-xl border border-gray-800">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-heading font-bold text-lg">{item.degree}</h4>
                        <p className="text-text-secondary">{item.institution}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-primary-accent/10 text-primary-accent text-sm rounded-full">
                          {item.period}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionTransition>
          
          <SectionTransition delay={2}>
            <h3 className="text-2xl font-heading font-bold mb-6 flex items-center">
              <span className="w-10 h-10 rounded-lg bg-primary-accent/20 flex items-center justify-center mr-3">
                <i className="ri-code-s-slash-line text-primary-accent"></i>
              </span>
              Skills
            </h3>
            
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <SkillBar key={index} name={skill.name} percentage={skill.percentage} />
              ))}
            </div>
            
            <div className="mt-10">
              <h3 className="text-2xl font-heading font-bold mb-6 flex items-center">
                <span className="w-10 h-10 rounded-lg bg-primary-accent/20 flex items-center justify-center mr-3">
                  <i className="ri-briefcase-line text-primary-accent"></i>
                </span>
                Experience
              </h3>
              
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="p-6 bg-secondary-bg rounded-xl border border-gray-800">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-heading font-bold text-lg">{job.position}</h4>
                      <span className="inline-block px-3 py-1 bg-primary-accent/10 text-primary-accent text-sm rounded-full">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-text-secondary mb-2">{job.company}</p>
                    <p className="text-sm text-text-secondary">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionTransition>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
