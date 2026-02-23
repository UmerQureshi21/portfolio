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
      "Automated attendance tracking and email reminders for 15+ events",
      "Reduced event coordination effort by 60% with a custom management database",
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

export default function WorkExperienceTimeline() {
  return (
    <div className="flex flex-col items-center w-full px-4 md:px-0">
      <h1 className="w-[95%] text-[40px] md:text-[60px] text-[rgb(231,74,74)] font-bold">
        Work Experience
      </h1>
      <div
        style={{
          backgroundColor: "var(--bg-card)",
        }}
        className="w-[95%] rounded-[20px] flex flex-col p-6 md:p-8 mt-[30px] md:mt-[50px]"
      >
        <div className="relative ml-4 md:ml-8">
          {/* Timeline vertical line */}
          <div
            style={{
              backgroundColor: "rgb(231,74,74)",
            }}
            className="absolute left-[24px] top-0 bottom-0 w-[2px]"
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline dot */}
                <div
                  style={{
                    borderColor: "var(--bg-card)",
                  }}
                  className="absolute left-[17px] top-[14px] w-[16px] h-[16px] rounded-full bg-[rgb(231,74,74)] border-[3px] z-10"
                />

                {/* Content */}
                <div className="ml-[50px] w-full pr-4">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
