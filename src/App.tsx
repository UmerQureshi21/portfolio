import { useRef, useState } from "react";
import { About } from "./components/About";
import PortfolioHero from "./components/PortfolioHero";
import Projects from "./components/Projects";
import { Education } from "./components/Education";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`${
        isDark ? "bg-black" : "bg-white"
      } min-h-screen poppins-font flex flex-col items-center transition-colors duration-300`}
    >
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <PortfolioHero onViewWork={scrollToProjects} isDark={isDark} />
      <div className="mt-[50px]"></div>
      <About isDark={isDark} />
      <div className="mt-[50px]"></div>
      <Education isDark={isDark} />
      <div className="mt-[50px]"></div>
      <div ref={projectsRef} className="w-full">
        <Projects isDark={isDark} />
      </div>
      <div className="mt-[50px]"></div>
    </div>
  );
}

export default App;