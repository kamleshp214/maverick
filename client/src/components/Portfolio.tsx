import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2024 Kamlesh Porwal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
