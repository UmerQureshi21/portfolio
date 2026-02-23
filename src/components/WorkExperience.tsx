interface WorkExperienceProps {
  companyImage: string;
  companyName: string;
  companyUrl: string;
  positionTitle: string;
  date: string;
  technologies: string[];
  bullets: string[];
}

export default function WorkExperience({
  companyImage,
  companyName,
  companyUrl,
  positionTitle,
  date,
  technologies,
  bullets,
}: WorkExperienceProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Header: company info + date */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src={companyImage}
            alt={companyName}
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full object-cover border-[1px] border-[rgb(231,74,74)] flex-shrink-0"
          />
          <div className="min-w-0">
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-primary)" }}
              className="text-[15px] md:text-[22px] font-semibold hover:text-[rgb(231,74,74)] transition-colors block truncate"
            >
              {companyName}
            </a>
            <p
              style={{ color: "var(--text-secondary)" }}
              className="text-[12px] md:text-[16px] font-light truncate"
            >
              {positionTitle}
            </p>
          </div>
        </div>
        <p
          style={{ color: "var(--text-secondary)" }}
          className="text-[11px] md:text-[14px] font-light whitespace-nowrap ml-[52px] md:ml-0"
        >
          {date}
        </p>
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {technologies.map((tech) => (
          <div
            key={tech}
            className="bg-[rgb(231,74,74)] px-2 md:px-3 py-0.5 md:py-1 text-white rounded-[10px] text-[10px] md:text-[13px] font-medium"
          >
            {tech}
          </div>
        ))}
      </div>

      {/* Bullet points */}
      <ul className="ml-4 flex flex-col gap-1.5 md:gap-2">
        {bullets.map((bullet, index) => (
          <li
            key={index}
            style={{ color: "var(--text-secondary)" }}
            className="text-[12px] md:text-[15px] font-light list-disc"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
