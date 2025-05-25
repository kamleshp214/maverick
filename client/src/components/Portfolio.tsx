import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 sf-pro-text">&copy; 2024 Kamlesh Porwal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
