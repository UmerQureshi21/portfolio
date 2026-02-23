import { useState, useEffect, useRef } from "react";
import WorkExperience from "./WorkExperience";

interface WorkExperienceData {
  companyImage: string;
  companyName: string;
  companyUrl: string;
  positionTitle: string;
  date: string;
  technologies: string[];
  bullets: string[];
}

const experiences: WorkExperienceData[] = [
  {
    companyImage: "/mcmaster-investments.png",
    companyName: "McMaster Investments Club",
    companyUrl: "https://lexingworth.vercel.app/",
    positionTitle: "Chief Technology Officer",
    date: "Nov 2025 - Present",
    technologies: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    bullets: [
      "Built club website serving 30+ members across 5 sectors",
      "Automating attendance tracking and email reminders for 15+ events",
      "Reducing event coordination effort by 60% with a custom management database",
    ],
  },
  {
    companyImage: "/ayro.png",
    companyName: "Ayro",
    companyUrl: "https://www.ayro.vc/",
    positionTitle: "Software Engineer Intern",
    date: "May 2025 - Aug 2025",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Springboot",
      "PostgreSQL",
    ],
    bullets: [
      "Led 3 engineers to ship the flagship web app in React and TypeScript",
      "Developed investor dashboard surfacing visitor to signup conversion metrics; presented to 5+ investors in pre-seed fundraising and contributed to 30% increase in post-money valuation",
    ],
  },
  {
    companyImage: "/morton-way.png",
    companyName: "Morton Way Public School",
    companyUrl: "https://mortonway.peelschools.org/",
    positionTitle: "Lead Developer, Student Success Initiative",
    date: "Feb 2023 - Aug 2023",
    technologies: ["React", "Python", "MySQL", "NumPy", "MediaPipe", "OpenCV"],
    bullets: [
      "Shipped full-stack student progress portal in React, Python, and MySQL serving 20+ families; reduced teacher grading time by 30%",
      "Developed AI exercise form detection for 100+ PE students using MediaPipe and OpenCV",
    ],
  },
];

function TimelineEntry({
  experience: exp,
  index,
}: {
  experience: WorkExperienceData;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="relative w-full md:flex md:items-center">
      {/* Timeline dot */}
      <div
        style={{ borderColor: "var(--bg-page)" }}
        className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-[20px] md:top-1/2 md:-translate-y-1/2 w-[24px] h-[24px] rounded-full bg-[rgb(231,74,74)] border-[4px] z-10"
      />

      <div
        className={`
          ml-[50px] md:ml-0
          md:flex md:w-full
          ${isLeft ? "md:justify-start" : "md:justify-end"}
        `}
      >
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateX(0)"
              : `translateX(${isLeft ? "-40px" : "40px"})`,
          }}
          className="rounded-[20px] p-5 md:p-6 md:w-[45%] transition-all duration-500"
        >
          <WorkExperience
            companyImage={exp.companyImage}
            companyName={exp.companyName}
            companyUrl={exp.companyUrl}
            positionTitle={exp.positionTitle}
            date={exp.date}
            technologies={exp.technologies}
            bullets={exp.bullets}
          />
        </div>
      </div>
    </div>
  );
}

export default function WorkExperienceTimeline() {
  return (
    <div className="flex flex-col items-center w-full px-4 md:px-0">
      <h1 className="w-[95%] text-[40px] md:text-[60px] text-[rgb(231,74,74)] font-bold">
        Work Experience
      </h1>
      <div className="w-[95%] relative mt-[30px] md:mt-[50px]">
        {/* Timeline vertical line - centered on desktop, left on mobile */}
        <div
          style={{ backgroundColor: "rgb(231,74,74)" }}
          className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px]"
        />

        <div className="flex flex-col gap-8 md:gap-12">
          {experiences.map((exp, index) => (
            <TimelineEntry key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
