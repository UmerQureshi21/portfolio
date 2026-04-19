import { type DetailEntry } from "./Card";

interface OutroLink {
  label: string;
  href: string;
}

interface MobileViewProps {
  name: string;
  subtitle: string;
  workDetails: DetailEntry[];
  educationDetails: DetailEntry[];
  projectDetails: DetailEntry[];
  outroLinks: OutroLink[];
}

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Email: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

export default function MobileView({
  name,
  subtitle,
  workDetails,
  educationDetails,
  projectDetails,
  outroLinks,
}: MobileViewProps) {
  return (
    <div className="min-h-svh w-full bg-[var(--bg)] text-[var(--fg)] font-[Poppins,sans-serif] px-8 pt-16 pb-10 flex flex-col justify-between gap-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-[2rem] font-medium leading-tight">{name}</h1>
        <p className="text-[0.75rem] opacity-50 tracking-[0.15em] uppercase mt-1">
          {subtitle}
        </p>
      </div>

      {/* Work Experience */}
      <div>
        <h2 className="text-[0.65rem] opacity-40 tracking-[0.2em] uppercase mb-2">
          Experience
        </h2>
        <div className="flex flex-col gap-2.5">
          {workDetails.map((entry, i) => (
            <div key={i} className="flex items-center gap-3">
              {entry.logo && (
                <img
                  src={entry.logo}
                  alt=""
                  className="w-7 h-7 rounded-md object-contain bg-white/10 p-0.5 shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-[0.8rem] font-medium leading-tight">
                    {entry.title}
                  </p>
                  {entry.website && (
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-40 hover:opacity-100 transition-opacity shrink-0"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                  {entry.linkedin && (
                    <a
                      href={entry.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-40 hover:opacity-100 transition-opacity shrink-0"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-[0.6rem] opacity-50">{entry.meta}</p>
              </div>
              {entry.period && (
                <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-white/10 opacity-60 shrink-0">
                  {entry.period}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-[0.65rem] opacity-40 tracking-[0.2em] uppercase mb-2">
          Education
        </h2>
        <div className="flex flex-col gap-2.5">
          {educationDetails.map((entry, i) => (
            <div key={i} className="flex items-center gap-3">
              {entry.logo && (
                <img
                  src={entry.logo}
                  alt=""
                  className="w-7 h-7 rounded-md object-contain bg-white/10 p-0.5 shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[0.8rem] font-medium leading-tight">
                  {entry.title}
                </p>
                <p className="text-[0.6rem] opacity-50">{entry.meta}</p>
              </div>
              {entry.period && (
                <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-white/10 opacity-60 shrink-0">
                  {entry.period}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-[0.65rem] opacity-40 tracking-[0.2em] uppercase mb-2">
          Projects
        </h2>
        <div className="flex flex-col gap-2">
          {projectDetails.map((entry, i) => (
            <div key={i}>
            <div className="flex items-center gap-2">
              <p className="text-[0.8rem] font-medium">{entry.title}</p>
              {entry.github && (
                <a
                  href={entry.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-40 hover:opacity-100 transition-opacity"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              )}
              {entry.deployedLink && (
                <a
                  href={entry.deployedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-40 hover:opacity-100 transition-opacity"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
            {entry.description && (
              <p className="text-[0.65rem] opacity-50 mt-0.5">{entry.description}</p>
            )}
            </div>
          ))}
        </div>
      </div>

      {/* Connect */}
      <div className="flex justify-center gap-8">
        {outroLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            {socialIcons[link.label]}
          </a>
        ))}
      </div>
    </div>
  );
}
