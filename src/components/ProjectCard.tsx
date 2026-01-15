interface ProjectCardProps {
  name: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  isDark: boolean;
}

export default function ProjectCard({
  name,
  description,
  technologies,
  image,
  githubUrl,
  isDark,
}: ProjectCardProps) {
  return (
    <div
      style={{
        backgroundColor: isDark ? "rgb(20,20,20)" : "rgb(240,240,240)",
        color: isDark ? "white" : "black",
      }}
      className="w-[95%] h-auto md:h-[400px] rounded-[20px]  flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8"
    >
      {/* Left Section */}
      <div className="w-full md:w-[50%] flex flex-col justify-between">
        <div>
          <h2 className="text-[24px] md:text-[30px] font-bold mb-4">{name}</h2>
          <p
            style={{
              color: isDark ? "white" : "black",
            }}
            className="text-[16px] md:text-[18px] font-light  mb-8"
          >
            {description}
          </p>

          {/* Technology Cards */}
          <div className="flex flex-wrap gap-3 mb-8">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="bg-[rgb(231,74,74)] px-4 py-2 rounded-[10px] text-[12px] md:text-[14px] font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Button */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-fit bg-[rgb(231,74,74)] hover:bg-[rgb(211,54,54)] transition-colors rounded-[10px] px-6 py-3 font-medium text-[14px] md:text-[16px]"
        >
          View on GitHub
        </a>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-[50%] flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-[90%] md:w-[80%] object-cover rounded-[15px] border-[rgb(231,74,74)] border-[1px]"
        />
      </div>
    </div>
  );
}
