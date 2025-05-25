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
      videoId: "VIDEO_ID_SYNAPSHARE"
    },
    {
      title: "TruthScan",
      description: "An advanced fake news detection platform. Analyzes news articles for credibility using text analysis and pattern recognition, with URL content extraction.",
      technologies: ["Flask", "BeautifulSoup4", "Bootstrap", "JavaScript"],
      videoId: "VIDEO_ID_TRUTHSCAN"
    },
    {
      title: "Aptify",
      description: "A professional aptitude test platform for BTech students. Features dynamic question generation, detailed results analysis, and downloadable PDF reports.",
      technologies: ["Flask", "Google Gemini API", "Chart.js", "jsPDF", "html2canvas"],
      videoId: "VIDEO_ID_APTIFY"
    },
    {
      title: "Second Brain",
      description: "A study planning and tracking application. Helps users organize learning materials, track progress, and maintain focus with a Pomodoro timer.",
      technologies: ["React.js", "TypeScript", "Vite", "TailwindCSS", "Dexie.js", "Express.js"],
      videoId: "VIDEO_ID_SECONDBRAIN"
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
              className="glass rounded-xl p-6 hover:border-blue-400 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
              <div className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                View Demo
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
