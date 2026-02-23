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
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={companyImage}
            alt={companyName}
            className="w-[50px] h-[50px] rounded-full object-cover border-[1px] border-[rgb(231,74,74)]"
          />
          <div>
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-primary)" }}
              className="text-[18px] md:text-[22px] font-semibold hover:text-[rgb(231,74,74)] transition-colors"
            >
              {companyName}
            </a>
            <p
              style={{ color: "var(--text-secondary)" }}
              className="text-[14px] md:text-[16px] font-light"
            >
              {positionTitle}
            </p>
          </div>
        </div>
        <p
          style={{ color: "var(--text-secondary)" }}
          className="text-[12px] md:text-[14px] font-light whitespace-nowrap"
        >
          {date}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <div
            key={tech}
            className="bg-[rgb(231,74,74)] px-3 py-1 text-white rounded-[10px] text-[11px] md:text-[13px] font-medium"
          >
            {tech}
          </div>
        ))}
      </div>
      <ul className="ml-4 flex flex-col gap-2">
        {bullets.map((bullet, index) => (
          <li
            key={index}
            style={{ color: "var(--text-secondary)" }}
            className="text-[13px] md:text-[15px] font-light list-disc"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
