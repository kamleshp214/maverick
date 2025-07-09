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
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-light sf-pro-display text-center mb-16"
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
              className="apple-card rounded-2xl p-6 lg:p-8 group"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl lg:text-2xl font-semibold sf-pro-display">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors touch-target"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>
                  <motion.button
                    onClick={() => setSelectedProject(project)}
                    className="p-3 bg-black text-white hover:bg-gray-800 rounded-xl transition-colors touch-target"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-6 h-6"
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
              
              <p className="text-gray-600 mb-6 leading-relaxed sf-pro-text">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-100 px-3 py-1 rounded-lg text-sm sf-pro-text text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm sf-pro-text text-gray-700">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold sf-pro-display">
                {selectedProject?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-6">
                <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedProject.videoId}`}
                    title={`${selectedProject.title} Demo`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl"
                  />
                </div>
                
                <div>
                  <p className="text-gray-600 mb-6 leading-relaxed sf-pro-text">
                    {selectedProject.description}
                  </p>
                  
                  <div>
                    <h4 className="text-lg font-semibold sf-pro-display mb-3">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="bg-gray-100 px-3 py-2 rounded-lg text-sm sf-pro-text"
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
