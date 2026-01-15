import { useState, useEffect, useRef } from "react";
import { EmailButton, GitHubButton, LinkedInButton } from "./Icons";

interface PortfolioHeroProps {
  onViewWork: () => void;
  isDark: boolean;
}

export default function PortfolioHero({
  onViewWork,
  isDark,
}: PortfolioHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      setIsVisible(isInView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[95%] flex flex-col items-center md:mt-0 mt-[55px]"
    >
      <div
        style={{
          backgroundColor: isDark ? "rgb(20,20,20)" : "rgb(240,240,240)",
          color: isDark ? "white" : "black",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
        }}
        className="relative w-full mt-[30px] md:mt-[100px] rounded-[20px] flex flex-col md:flex-row h-auto md:h-[600px] sm:pb-0 pb-[30px] transition-all duration-500"
      >
        <div className="w-full md:w-[50%] flex flex-col items-center justify-center p-6 md:p-0">
          <h1 className="relative md:left-[50px] w-[90%] md:w-[80%] text-[60px] md:text-[120px] font-thin text-center md:text-left leading-tight">
            Hi, I'm <span className="text-[rgb(231,74,74)]">Umer</span>!
          </h1>
          <h1
            style={{
              color: isDark ? "white" : "black",
            }}
            className="relative md:left-[50px] w-[90%] md:w-[80%] text-[16px] md:text-[20px] font-thin text-center md:text-left mt-4"
          >
            2nd year Computer Science @ McMaster
          </h1>
          <div className="relative gap-[10px] flex md:flex-row flex-row md:left-[50px] w-[90%] md:w-[80%] py-[15px] justify-center md:justify-start mt-4">
            <GitHubButton url="https://github.com/UmerQureshi21" />
            <LinkedInButton url="https://www.linkedin.com/in/umer-qureshi06/" />
            <EmailButton email="umerqis21@gmail.com" />
          </div>
        </div>
        <div className="w-full md:w-[50%] flex items-center justify-center p-6 md:p-0">
          <img
            src="/headshot.jpg"
            alt=""
            className="w-[95%] md:w-[50%] border-[rgb(231,74,74)] border-[1px] rounded-[20px]"
          />
        </div>
      </div>
      <button
        onClick={onViewWork}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
        }}
        className="sm:bottom-0 bottom-[40px] sm:top-[25px] text-white relative rounded-[20px] bottom-[15px] w-[90%] md:w-[20%] py-[5px] text-[16px] md:text-[20px] bg-[rgb(231,74,74)] hover:bg-[rgb(211,54,54)] transition-all duration-500"
      >
        View My Work!
      </button>
    </div>
  );
}