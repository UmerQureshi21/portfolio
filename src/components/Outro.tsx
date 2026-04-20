import IconWithPopupLabel from "./IconWithPopupLabel";

interface OutroLink {
  label: string;
  href: string;
}

interface OutroProps {
  heading: string;
  links: OutroLink[];
}

const labelToType: Record<string, "github" | "linkedin" | "email"> = {
  GitHub: "github",
  LinkedIn: "linkedin",
  Email: "email",
};

export default function Outro({ heading, links }: OutroProps) {
  const iconLinks = links.map((link) => ({
    label: link.label,
    href: link.href,
    type: labelToType[link.label] || "email" as const,
  }));

  return (
    <section className="relative w-full h-svh p-8 text-[var(--fg)] text-center content-center">
      <div className="flex flex-col items-center gap-14">
        <h1 className="text-[4rem] max-[1000px]:text-[3rem] font-medium leading-none w-[30%] max-[1000px]:w-full mx-auto">
          {heading}
        </h1>
        <IconWithPopupLabel links={iconLinks} />
      </div>
    </section>
  );
}
