import { useState, useEffect, useRef } from "react";
import {
  EmailButton,
  GitHubButton,
  LinkedInButton,
  PinDropIcon,
} from "./Icons";

export default function PortfolioHero() {
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
          backgroundColor: "var(--bg-card)",
          color: "var(--text-primary)",
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
              color: "var(--text-primary)",
            }}
            className="relative md:left-[50px] w-[90%] md:w-[80%] text-[16px] md:text-[20px] font-thin text-center md:text-left mt-4"
          >
            2nd year Computer Science @ McMaster
          </h1>
          <div className="relative md:left-[50px] w-[90%] md:w-[80%] flex-col md:flex-row flex items-center gap-2 mt-4">
            <PinDropIcon size={20} />
            <h1
              style={{
                color: "var(--text-primary)",
              }}
              className="text-[16px] md:text-[20px] font-thin"
            >
              Toronto, ON
            </h1>
          </div>
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
    </div>
  );
}
