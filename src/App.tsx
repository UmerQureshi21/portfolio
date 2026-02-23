import { About } from "./components/About";
import PortfolioHero from "./components/PortfolioHero";
import Projects from "./components/Projects";
import { Education } from "./components/Education";
import ThemeToggle from "./components/ThemeToggle";
import WorkExperienceTimeline from "./components/WorkExperienceTimeline";

function App() {
  return (
    <div
      style={{ backgroundColor: "var(--bg-page)" }}
      className="min-h-screen poppins-font flex flex-col items-center transition-colors duration-300"
    >
      <ThemeToggle />
      <PortfolioHero />
      <div className="mt-[50px]"></div>
      <About />
      <div className="mt-[50px]"></div>
      <WorkExperienceTimeline />

      <div className="mt-[50px]"></div>
      <Projects />
      <div className="mt-[50px]"></div>
      <div className="w-full flex justify-center">
        <Education />
      </div>
      <div className="mt-[50px]"></div>
    </div>
  );
}

export default App;
