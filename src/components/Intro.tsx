interface IntroProps {
  name: string;
  role: string;
  about: string;
}

export default function Intro({ name, role, about }: IntroProps) {
  return (
    <section className="relative w-full h-svh p-8 bg-[var(--bg)] text-[var(--fg)] text-center content-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-[4rem] max-[1000px]:text-[2.5rem] font-medium leading-none w-[30%] max-[1000px]:w-full mx-auto">
          {name}
        </h1>
        <p className="text-[1.2rem] font-light opacity-60 tracking-[0.2em] uppercase">
          {role}
        </p>
        <p className="text-[1.1rem] font-light opacity-70 max-w-[500px] max-[1000px]:max-w-full leading-relaxed">
          {about}
        </p>
      </div>
    </section>
  );
}
