import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("projects");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const projects = [
    {
      title: "SynapShare",
      description: "A collaborative content sharing platform for students. Features include sharing notes, discussions, and code snippets with a secure file upload system supporting multiple formats.",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "TailwindCSS", "JWT Authentication"],
      videoId: "VIDEO_ID_SYNAPSHARE",
      githubUrl: "https://github.com/kamleshp214/synapshare",
      liveUrl: "#"
    },
    {
      title: "TruthScan",
      description: "An advanced fake news detection platform. Analyzes news articles for credibility using text analysis and pattern recognition, with URL content extraction.",
      technologies: ["Flask", "BeautifulSoup4", "Bootstrap", "JavaScript"],
      videoId: "VIDEO_ID_TRUTHSCAN",
      githubUrl: "https://github.com/kamleshp214/truthscan",
      liveUrl: "#"
    },
    {
      title: "Aptify",
      description: "A professional aptitude test platform for BTech students. Features dynamic question generation, detailed results analysis, and downloadable PDF reports.",
      technologies: ["Flask", "Google Gemini API", "Chart.js", "jsPDF", "html2canvas"],
      videoId: "VIDEO_ID_APTIFY",
      githubUrl: "https://github.com/kamleshp214/aptify",
      liveUrl: "#"
    },
    {
      title: "Second Brain",
      description: "A study planning and tracking application. Helps users organize learning materials, track progress, and maintain focus with a Pomodoro timer.",
      technologies: ["React.js", "TypeScript", "Vite", "TailwindCSS", "Dexie.js", "Express.js"],
      videoId: "VIDEO_ID_SECONDBRAIN",
      githubUrl: "https://github.com/kamleshp214/second-brain",
      liveUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glass glass-hover rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold gradient-text">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 text-gray-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-700/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-300 border border-gray-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="bg-gray-700/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-300 border border-gray-600/50">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="glass max-w-4xl max-h-[90vh] overflow-y-auto border-gray-700 bg-gray-900/95">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-400">
                {selectedProject?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-6">
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedProject.videoId}`}
                    title={`${selectedProject.title} Demo`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                
                <div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
