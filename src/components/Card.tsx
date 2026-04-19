export interface DetailEntry {
  title: string;
  meta: string;
  description: string;
  logo?: string;
  logoLink?: string;
  github?: string;
  deployedLink?: string;
  website?: string;
  linkedin?: string;
  tags?: string[];
  period?: string;
}

interface CardProps {
  id: string;
  label: string;
  bgColor: string;
  darkText?: boolean;
  icon?: React.ReactNode;
  details: DetailEntry[];
  onCardClick: (cardId: string) => void;
  onClose: () => void;
}

function DetailList({
  details,
  detailBorderClass,
}: {
  details: DetailEntry[];
  detailBorderClass: string;
}) {
  return (
    <>
      {details.map((entry, i) => (
        <div
          key={i}
          className={`detail-entry border-b ${detailBorderClass} pb-3 last:border-b-0`}
        >
          <div className="flex items-center gap-4">
            {entry.logo && (
              entry.logoLink ? (
                <a href={entry.logoLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="shrink-0">
                  <img src={entry.logo} alt="" className="w-9 h-9 rounded-lg object-contain bg-white/10 p-1 hover:bg-white/20 transition-colors" />
                </a>
              ) : (
                <img src={entry.logo} alt="" className="w-9 h-9 rounded-lg object-contain bg-white/10 p-1 shrink-0" />
              )
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[0.85rem] font-semibold leading-tight">{entry.title}</h3>
                {(entry.github || entry.deployedLink || entry.website || entry.linkedin) && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {entry.github && (
                      <a href={entry.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="opacity-50 hover:opacity-100 transition-opacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {entry.deployedLink && (
                      <a href={entry.deployedLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="opacity-50 hover:opacity-100 transition-opacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {entry.website && (
                      <a href={entry.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="opacity-50 hover:opacity-100 transition-opacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {entry.linkedin && (
                      <a href={entry.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="opacity-50 hover:opacity-100 transition-opacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
              <span className="text-[0.65rem] opacity-50 block tracking-wide">
                {entry.meta}
              </span>
              {entry.description && (
                <p className="text-[0.7rem] font-light leading-relaxed opacity-85 mt-1">
                  {entry.description}
                </p>
              )}
            </div>
          </div>
          {(entry.period || entry.tags) && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {entry.period && (
                <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-white/10 opacity-70 tracking-wide">
                  {entry.period}
                </span>
              )}
            </div>
          )}
          {entry.tags && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.65rem] px-2.5 py-1 rounded-full bg-white/10 opacity-70 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default function Card({
  id,
  label,
  bgColor,
  darkText,
  icon,
  details,
  onCardClick,
  onClose,
}: CardProps) {
  const detailBorderClass = darkText
    ? "border-black/15"
    : "border-white/15";

  return (
    <div
      className="card relative flex-1 aspect-[5/6] [transform-style:preserve-3d] origin-top cursor-pointer rounded-[20px]"
      id={id}
      onClick={() => onCardClick(id)}
    >
      {/* --- FRONT --- */}
      <div
        className="card-front absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden flex justify-center items-center text-center p-8"
        style={{ backgroundColor: `var(--${bgColor})` }}
      >
        <div
          className="absolute inset-0 rounded-[inherit] backdrop-blur-[2px] border border-white/10"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.04) 100%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-[inherit] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
        <div className="front-label relative z-10 flex flex-col items-center gap-4">
          {icon && <div className="opacity-40">{icon}</div>}
          <p className="text-[1.8rem] font-medium leading-none">{label}</p>
        </div>
        <div data-lenis-prevent className="front-detail absolute inset-0 z-10 pt-5 px-8 pb-8 opacity-0 pointer-events-none overflow-y-auto text-left flex flex-col gap-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[1rem] font-semibold">{label}</h2>
            <button
              className="close-btn-inner bg-transparent border-2 border-current text-inherit w-8 h-8 rounded-full text-sm cursor-pointer flex items-center justify-center hover:bg-white/15 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              ✕
            </button>
          </div>
          <DetailList details={details} detailBorderClass={detailBorderClass} />
        </div>
      </div>

      {/* --- BACK (always shows details) --- */}
      <div
        className={`card-back absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden [transform:rotateY(180deg)] p-8 ${darkText ? "text-[var(--bg)]" : ""}`}
        style={{ backgroundColor: `var(--${bgColor})` }}
      >
        <div
          className="absolute inset-0 rounded-[inherit] backdrop-blur-[2px] border border-white/10"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.04) 100%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-[inherit] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
        <div data-lenis-prevent className="absolute inset-0 z-10 pt-6 px-8 pb-8 overflow-y-auto text-left flex flex-col gap-3">
          <DetailList details={details} detailBorderClass={detailBorderClass} />
        </div>
      </div>
    </div>
  );
}
