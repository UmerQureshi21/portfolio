import { useState } from "react";

interface IconLink {
  label: string;
  href: string;
  type: "github" | "linkedin" | "email";
}

const svgIcons: Record<string, React.ReactNode> = {
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

const hoverColors: Record<string, string> = {
  github: "rgb(36, 36, 36)",
  linkedin: "rgb(29, 116, 255)",
  email: "rgb(234, 67, 53)",
};

function IconItem({ link }: { link: IconLink }) {
  const [hovered, setHovered] = useState(false);
  const bg = hovered ? hoverColors[link.type] : "#fff";
  const fg = hovered ? "#fff" : "#000";

  return (
    <li
      className="relative flex flex-col items-center justify-center w-[50px] h-[50px] rounded-full p-[15px] mx-[10px] shadow-[0_10px_10px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-500 [transition-timing-function:cubic-bezier(0.68,-0.55,0.265,1.55)]"
      style={{ backgroundColor: bg, color: fg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <span
        className="absolute font-[Poppins,sans-serif] text-sm px-2 py-1 rounded-[5px] shadow-[0_10px_10px_10px_rgba(0,0,0,0.1)] pointer-events-none transition-all duration-500 [transition-timing-function:cubic-bezier(0.68,-0.55,0.265,1.55)] whitespace-nowrap"
        style={{
          top: hovered ? "-45px" : "0px",
          opacity: hovered ? 1 : 0,
          backgroundColor: bg,
          color: fg,
        }}
      >
        {link.label}
        {/* Arrow */}
        <span
          className="absolute w-2 h-2 left-1/2 -translate-x-1/2 -bottom-1 rotate-45 transition-all duration-500 [transition-timing-function:cubic-bezier(0.68,-0.55,0.265,1.55)]"
          style={{ backgroundColor: bg }}
        />
      </span>

      <a
        href={link.href}
        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className="flex items-center justify-center no-underline"
        style={{ color: "inherit" }}
      >
        {svgIcons[link.type]}
      </a>
    </li>
  );
}

export default function IconWithPopupLabel({ links }: { links: IconLink[] }) {
  return (
    <ul className="inline-flex list-none p-0 m-0">
      {links.map((link) => (
        <IconItem key={link.label} link={link} />
      ))}
    </ul>
  );
}
