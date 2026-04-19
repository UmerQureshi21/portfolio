import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Intro from "./components/Intro";
import Outro from "./components/Outro";
import Card, { type DetailEntry } from "./components/Card";
import ThemeToggle from "./components/ThemeToggle";
import MobileView from "./components/MobileView";

const workDetails: DetailEntry[] = [
  {
    title: "Software Engineering Intern",
    meta: "Municipal Property Assessment Corporation",
    description: "",
    logo: "/logos/mpac_logo.jpeg",
    period: "May 2026 to Present",
  },
  {
    title: "Research Assistant",
    meta: "McMaster University",
    description: "",
    logo: "/logos/maclogo.png",
    period: "Jan 2026 to May 2026",
  },
  {
    title: "Chief Technology Officer",
    meta: "Lexingworth Capital",
    description: "",
    logo: "/logos/mcmaster-investments.png",
    period: "Sep 2025 to Present",
  },
  {
    title: "Software Engineering Intern",
    meta: "Ayro",
    description: "",
    logo: "/logos/ayro.png",
    period: "May 2025 to Aug 2025",
  },
];

const educationDetails: DetailEntry[] = [
  {
    title: "B.Sc. Computer Science",
    meta: "McMaster University, Expected April 2028",
    description: "",
    logo: "/logos/maclogo.png",
    tags: [
      "Data Structures & Algorithms",
      "Computer Architecture",
      "Linux/Unix/C",
      "Java/Python",
      "Software Development",
    ],
  },
];

const projectDetails: DetailEntry[] = [
  {
    title: "KarahiHub",
    meta: "",
    description: "South Asian recipe platform with RAG-powered AI assistant.",
    github: "https://github.com/UmerQureshi21",
    deployedLink: "https://karahi-hub.vercel.app/",
    tags: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL"],
  },
  {
    title: "TripSlice",
    meta: "",
    description:
      "AI vacation montage generator for trimming and combining videos.",
    github: "https://github.com/UmerQureshi21",
    deployedLink: "https://tidier-azure.vercel.app/",
    tags: ["Java", "Spring Boot", "React", "TypeScript", "AWS", "Docker"],
  },
  {
    title: "TrailSense",
    meta: "",
    description: "Mountain biking trail finder with semantic search and maps.",
    github: "https://github.com/UmerQureshi21",
    tags: ["Flask", "React", "TypeScript", "AWS", "MongoDB"],
  },
];

const outroLinks = [
  { label: "GitHub", href: "https://github.com/UmerQureshi21" },
  { label: "LinkedIn", href: "https://linkedin.com/in/umerqureshi-m" },
  { label: "Email", href: "mailto:umerqis21@gmail.com" },
];

function App() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 999px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 999px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const expandedCardRef = useRef<string | null>(null);
  const expandTimestampRef = useRef(0);
  const flipCompleteRef = useRef(false);
  const scrollProgressRef = useRef(0);
  const handleCloseRef = useRef<() => void>(() => {});

  const handleCardClick = useCallback(
    (cardId: string) => {
      if (!flipCompleteRef.current || expandedCard) return;
      if (scrollProgressRef.current > 0.99) return;

      setExpandedCard(cardId);
      expandedCardRef.current = cardId;
      expandTimestampRef.current = Date.now();

      const otherCards = ["#card-1", "#card-2", "#card-3"].filter(
        (id) => id !== `#${cardId}`,
      );

      otherCards.forEach((id) => {
        gsap.to(`${id} .card-front, ${id} .card-back`, {
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.set(id, { pointerEvents: "none" });
      });

      gsap.to(".sticky-header", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      const cardEl = document.getElementById(cardId);
      const container = document.querySelector(".card-container");
      if (cardEl && container) {
        const cardRect = cardEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const xOffset = containerCenter - cardCenter;

        const scale = 1.4;
        const currentY = Number(gsap.getProperty(cardEl, "y")) || 0;
        const naturalTop = cardRect.top - currentY;
        const scaledHeight = cardRect.height * scale;
        const yOffset = (window.innerHeight - scaledHeight) / 2 - naturalTop;

        gsap.to(`#${cardId}`, {
          scale,
          x: xOffset,
          y: yOffset,
          rotateZ: 0,
          duration: 0.6,
          ease: "power3.out",
          zIndex: 10,
        });
      }

      gsap.to(`#${cardId} .card-detail`, {
        opacity: 1,
        pointerEvents: "auto",
        delay: 0.3,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(`#${cardId} .card-label`, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.to(`#${cardId} .close-btn`, {
        opacity: 1,
        delay: 0.4,
        duration: 0.3,
      });
    },
    [expandedCard],
  );

  const handleClose = useCallback(() => {
    if (!expandedCard) return;

    const cardId = expandedCard;
    const otherCards = ["#card-1", "#card-2", "#card-3"].filter(
      (id) => id !== `#${cardId}`,
    );

    gsap.to(`#${cardId} .close-btn`, {
      opacity: 0,
      duration: 0.2,
    });

    gsap.to(`#${cardId} .card-detail`, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(`#${cardId} .card-label`, {
      opacity: 1,
      delay: 0.2,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(".sticky-header", {
      opacity: 1,
      delay: 0.3,
      duration: 0.4,
      ease: "power2.out",
    });

    const originalY = 20;
    const originalRotateZ =
      cardId === "card-1" ? -3 : cardId === "card-3" ? 3 : 0;

    gsap.to(`#${cardId}`, {
      scale: 1,
      x: 0,
      y: originalY,
      rotateZ: originalRotateZ,
      duration: 0.5,
      delay: 0.2,
      ease: "power3.out",
      zIndex: 0,
      overwrite: true,
    });

    otherCards.forEach((id) => {
      gsap.to(`${id} .card-front, ${id} .card-back`, {
        opacity: 1,
        duration: 0.5,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.set(id, { pointerEvents: "auto", delay: 0.8 });
    });

    setExpandedCard(null);
    expandedCardRef.current = null;
  }, [expandedCard]);

  handleCloseRef.current = handleClose;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", ({ progress }: { progress: number }) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    });
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const cardContainer =
      document.querySelector<HTMLElement>(".card-container");
    const stickyHeader =
      document.querySelector<HTMLElement>(".sticky-header h1");

    let isGapAnimationCompleted = false;
    let isFlipAnimationCompleted = false;

    function initAnimations() {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const mm = gsap.matchMedia();

      mm.add("(max-width: 999px)", () => {
        document
          .querySelectorAll<HTMLElement>(
            ".card, .card-container, .sticky-header h1",
          )
          .forEach((el) => {
            el.removeAttribute("style");
          });
        return () => {};
      });

      mm.add("(min-width: 1000px)", () => {
        ScrollTrigger.create({
          trigger: ".sticky",
          start: "top top",
          end: `+=${window.innerHeight * 4}px`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;
            scrollProgressRef.current = progress;

            if (
              expandedCardRef.current &&
              self.direction === -1 &&
              Date.now() - expandTimestampRef.current > 600
            ) {
              handleCloseRef.current();
            }

            if (progress >= 0.1 && progress <= 0.25) {
              const headerProgress = gsap.utils.mapRange(
                0.1,
                0.25,
                0,
                1,
                progress,
              );
              const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
              const opacityValue = gsap.utils.mapRange(
                0,
                1,
                0,
                1,
                headerProgress,
              );

              gsap.set(stickyHeader, {
                y: yValue,
                opacity: opacityValue,
              });
            } else if (progress < 0.1) {
              gsap.set(stickyHeader, {
                y: 40,
                opacity: 0,
              });
            } else if (progress > 0.25) {
              gsap.set(stickyHeader, {
                y: 0,
                opacity: 1,
              });
            }

            if (progress <= 0.25) {
              const widthPercentage = gsap.utils.mapRange(
                0,
                0.25,
                90,
                75,
                progress,
              );
              gsap.set(cardContainer, { width: `${widthPercentage}%` });
            } else {
              gsap.set(cardContainer, { width: "75%" });
            }

            if (progress >= 0.35 && !isGapAnimationCompleted) {
              gsap.to(cardContainer, {
                gap: "20px",
                duration: 0.5,
                ease: "power3.out",
              });

              gsap.to(["#card-1", "#card-2", "#card-3"], {
                borderRadius: "20px",
                duration: 0.5,
                ease: "power3.out",
              });

              isGapAnimationCompleted = true;
            }

            if (progress < 0.35 && isGapAnimationCompleted) {
              gsap.to(cardContainer, {
                gap: "0px",
                duration: 0.5,
                ease: "power3.out",
              });

              gsap.to("#card-1", {
                borderRadius: "20px 0 0 20px",
                duration: 0.5,
                ease: "power3.out",
              });

              gsap.to("#card-2", {
                borderRadius: "0px",
                duration: 0.5,
                ease: "power3.out",
              });

              gsap.to("#card-3", {
                borderRadius: "0 20px 20px 0",
                duration: 0.5,
                ease: "power3.out",
              });

              isGapAnimationCompleted = false;
            }

            if (progress >= 0.7 && !isFlipAnimationCompleted) {
              gsap.to(".card", {
                rotateY: 180,
                duration: 1,
                ease: "power3.out",
                stagger: 0.15,
              });

              gsap.to("#card-1", {
                y: 20,
                rotateZ: -3,
                duration: 1,
                ease: "power3.out",
              });

              gsap.to("#card-3", {
                y: 20,
                rotateZ: 3,
                duration: 1,
                ease: "power3.out",
              });

              isFlipAnimationCompleted = true;
              flipCompleteRef.current = true;
            }

            if (progress < 0.7 && isFlipAnimationCompleted) {
              gsap.to(".card", {
                rotateY: 0,
                duration: 1,
                ease: "power3.out",
                stagger: -0.15,
                overwrite: "auto",
              });

              gsap.to("#card-1", {
                y: 0,
                rotateZ: 0,
                duration: 1,
                ease: "power3.out",
              });

              gsap.to("#card-3", {
                y: 0,
                rotateZ: 0,
                duration: 1,
                ease: "power3.out",
              });

              isFlipAnimationCompleted = false;
              flipCompleteRef.current = false;
            }
          },
        });

        return () => {};
      });
    }

    initAnimations();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initAnimations();
      }, 250);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <ThemeToggle />
        <MobileView
          name="Hi, I'm Umer Qureshi"
          subtitle="Computer Science @ McMaster University"
          workDetails={workDetails}
          educationDetails={educationDetails}
          projectDetails={projectDetails}
          outroLinks={outroLinks}
        />
      </>
    );
  }

  return (
    <div className="bg-[var(--bg)] font-[Poppins,sans-serif]">
      <ThemeToggle />

      {/* --- Progress bar --- */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-[var(--fg)] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <Intro
        name="Hi, I'm Umer Qureshi!"
        role="Computer Science @ McMaster University"
        about=""
      />

      {/* --- Sticky card section --- */}
      <section className="sticky relative w-full h-svh p-8 bg-[var(--bg)] text-[var(--fg)] flex justify-center items-center overflow-visible">
        <div className="sticky-header absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]">
          <h1 className="mb-[40px] relative text-center text-[3rem] font-medium leading-none [will-change:transform,opacity] translate-y-[40px] opacity-0">
            Background & Experiences
          </h1>
        </div>

        <div className="card-container relative w-[90%] flex gap-0 [perspective:1000px] translate-y-[40px] [will-change:width] overflow-visible">
          <Card
            id="card-1"
            label="Work Experience"
            bgColor="card-1"
            roundedSide="left"
            details={workDetails}
            onCardClick={handleCardClick}
            onClose={handleClose}
          />
          <Card
            id="card-2"
            label="Education"
            bgColor="card-2"
            details={educationDetails}
            onCardClick={handleCardClick}
            onClose={handleClose}
          />
          <Card
            id="card-3"
            label="Projects"
            bgColor="card-3"
            roundedSide="right"
            details={projectDetails}
            onCardClick={handleCardClick}
            onClose={handleClose}
          />
        </div>
      </section>

      <Outro heading="Let's Connect!" links={outroLinks} />
    </div>
  );
}

export default App;
