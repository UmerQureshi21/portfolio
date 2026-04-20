import { useEffect, useState } from "react";

interface IntroProps {
  name: string;
  role: string;
  about: string;
}

export default function Intro({ name, role, about }: IntroProps) {
  const [displayed, setDisplayed] = useState("");
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(name.slice(0, i));
      if (i >= name.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, [name]);

  useEffect(() => {
    const blink = setInterval(() => setShowCaret((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <section className="relative w-full h-svh p-8 text-[var(--fg)] text-center content-center">
      <div className="flex flex-col items-center gap-4">
        <h1
          className="text-[6rem] max-[1000px]:text-[2.5rem] font-medium leading-none w-[90%] max-[1000px]:w-full mx-auto name-glow"
        >
          {displayed}
          <span
            className="inline-block w-[3px] h-[0.85em] bg-[var(--fg)] ml-1 align-baseline translate-y-[0.05em]"
            style={{ opacity: showCaret ? 1 : 0 }}
          />
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
