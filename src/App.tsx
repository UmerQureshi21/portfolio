import { useRef } from "react";
import { About } from "./components/About";
import PortfolioHero from "./components/PortfolioHero";
import Projects from "./components/Projects";
import { Education } from "./components/Education";
import ThemeToggle from "./components/ThemeToggle";
import WorkExperienceTimeline from "./components/WorkExperienceTimeline";

function App() {
  const projectsRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{ backgroundColor: "var(--bg-page)" }}
      className="min-h-screen poppins-font flex flex-col items-center transition-colors duration-300"
    >
      <ThemeToggle />
      <PortfolioHero onViewWork={scrollToProjects} />
      <div className="mt-[50px]"></div>
      <About />
      <div className="mt-[50px]"></div>
      <WorkExperienceTimeline />

      <div ref={projectsRef} className="mt-[50px]"></div>
      <Projects />
      <div className="mt-[50px]"></div>
      <div className="w-full">
        <Education />
      </div>
      <div className="mt-[50px]"></div>
    </div>
  );
}

export default App;
