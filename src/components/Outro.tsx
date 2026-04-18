interface OutroLink {
  label: string;
  href: string;
}

interface OutroProps {
  heading: string;
  links: OutroLink[];
}

export default function Outro({ heading, links }: OutroProps) {
  return (
    <section className="relative w-full h-svh p-8 bg-[var(--bg)] text-[var(--fg)] text-center content-center">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-[4rem] max-[1000px]:text-[3rem] font-medium leading-none w-[30%] max-[1000px]:w-full mx-auto">
          {heading}
        </h1>
        <div className="flex max-[1000px]:flex-col max-[1000px]:items-center gap-10 max-[1000px]:gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="text-[var(--fg)] no-underline text-[1.1rem] font-normal opacity-70 tracking-widest uppercase transition-opacity duration-300 hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
