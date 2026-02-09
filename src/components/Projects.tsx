import ProjectCard from "./ProjectCard";

interface props {
  isDark: boolean;
}

let projectsData = [
  {
    name: "TripSlice",
    description: "AI powered vacation montage maker.",
    technologies: [
      "Java Springboot",
      "React.js",
      "PostgreSQL",
      "TailwindCSS",
      "AWS S3",
      "Docker",
    ],
    image: "/trip-slice.png",
    githubUrl: "https://github.com/UmerQureshi21/Tidier",
  },
  {
    name: "MacNotes",
    description:
      "A course-specific notes marketplace where McMaster students can upload, search, rate, and download study materials.",
    technologies: ["Java Springboot", "MySQL", "HTML", "CSS", "Javascript"],
    image: "/mac-notes.png",
    githubUrl: "https://github.com/UmerQureshi21/MacNotes",
  },
  {
    name: "From The Sidelines",
    description:
      "AI powered and personalized commentary with crowd noises for your trickshots, giving them the hype that they deserve.",
    technologies: ["Fast API", "React.js", "Gemini"],
    image: "/from-the-sidelines.png",
    githubUrl: "https://github.com/UmerQureshi21/FromTheSidelines",
  },
  {
    name: "TrailSense",
    description:
      "An AI search platform for mountain bike trails using natural-language queries and real ride footage.",
    technologies: ["Python", "Flask", "React.js", "Gemini", "MongoDB"],
    image: "/trail-sense.png",
    githubUrl: "https://github.com/UmerQureshi21/trailsense",
  },
];

export default function Projects({ isDark }: props) {
  return (
    <div className="flex flex-col items-center w-full px-4 md:px-0">
      <h1 className="w-[95%] text-[40px] md:text-[60px] text-[rgb(231,74,74)] font-bold">
        Projects
      </h1>
      <div className="w-full flex flex-col gap-[15px] md:gap-[20px] items-center mt-[30px] md:mt-[50px]">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index}
            name={project.name}
            description={project.description}
            technologies={project.technologies}
            image={project.image}
            githubUrl={project.githubUrl}
            isDark={isDark}
            slideDirection={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </div>
  );
}
