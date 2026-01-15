import ProjectCard from "./ProjectCard";

interface props {
  isDark: boolean;
}

export default function Projects({ isDark }: props) {
  return (
    <div className="flex flex-col items-center w-full px-4 md:px-0">
      <h1 className="w-[95%] text-[40px] md:text-[60px] text-[rgb(231,74,74)] font-bold">
        Projects
      </h1>
      <div className="w-full flex flex-col gap-[15px] md:gap-[20px] items-center mt-[30px] md:mt-[50px]">
        <ProjectCard
          name="TripSlice"
          description="AI powered vacation montage maker."
          technologies={[
            "Java Springboot",
            "React.js",
            "PostgreSQL",
            "TailwindCSS",
            "AWS S3",
            "Docker",
          ]}
          image="/trip-slice.png"
          githubUrl=""
          isDark={isDark}
        />
        <ProjectCard
          name="MacNotes"
          description="A course-specific notes marketplace where McMaster students can upload, search, rate, and download study materials."
          technologies={[
            "Java Springboot",
            "MySQL",
            "HTML",
            "CSS",
            "Javascript",
          ]}
          image="/mac-notes.png"
          githubUrl=""
          isDark={isDark}
        />
        <ProjectCard
          name="TrailSense"
          description="An AI search platform for mountain bike trails using natural-language queries and real ride footage."
          technologies={["Python", "Flask", "React.js", "Gemini", "MongoDB"]}
          image="/trail-sense.png"
          githubUrl=""
          isDark={isDark}
        />
      </div>
    </div>
  );
}
