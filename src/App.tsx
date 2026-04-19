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
    logoLink: "https://mpac.ca/",
    website: "https://mpac.ca/",
    linkedin: "https://www.linkedin.com/company/mpac/posts/?feedView=all",
    period: "May 2026 to Present",
  },
  {
    title: "Software Engineering Intern",
    meta: "Ayro",
    description: "",
    logo: "/logos/ayro.png",
    logoLink: "https://www.ayro.vc/",
    website: "https://www.ayro.vc/",
    linkedin: "https://www.linkedin.com/company/ayro1/posts/?feedView=all",
    period: "May 2025 to Aug 2025",
  },
  {
    title: "Teaching Assistant",
    meta: "Morton Way Public School",
    description: "",
    logo: "/logos/morton-way.png",
    logoLink: "https://mortonway.peelschools.org/",
    website: "https://mortonway.peelschools.org/",
    period: "Jan 2023 to Aug 2023",
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
  {
    title: "Research Assistant",
    meta: "McMaster University",
    description: "",
    period: "Jan 2026 to May 2026",
  },
  {
    title: "Chief Technology Officer",
    meta: "McMaster Investments Club",
    description: "",
    website: "https://www.lexingworth.com/",
    linkedin:
      "https://www.linkedin.com/company/lexingworth/posts/?feedView=all",
    period: "Sep 2025 to Present",
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
      if (flipCompleteRef.current || expandedCard) return;

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

      gsap.to(`#${cardId} .front-detail`, {
        opacity: 1,
        pointerEvents: "auto",
        delay: 0.3,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(`#${cardId} .front-label`, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
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

    gsap.to(`#${cardId} .front-detail`, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(`#${cardId} .front-label`, {
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

    const isFlipped = flipCompleteRef.current;
    const originalY = isFlipped ? 20 : 0;
    const originalRotateZ = isFlipped
      ? cardId === "card-1"
        ? -3
        : cardId === "card-3"
          ? 3
          : 0
      : 0;

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

    const stickyHeader =
      document.querySelector<HTMLElement>(".sticky-header h1");

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

            if (progress >= 0.4 && !isFlipAnimationCompleted) {
              // Reset any expanded front-detail before flipping
              gsap.killTweensOf(".front-detail, .front-label");
              gsap.set(".front-detail", { opacity: 0, pointerEvents: "none" });
              gsap.set(".front-label", { opacity: 1 });
              expandedCardRef.current = null;

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

            if (progress < 0.4 && isFlipAnimationCompleted) {
              // Kill stale close-animation tweens and reset overlays
              gsap.killTweensOf(".front-detail, .front-label");
              gsap.set(".front-detail", { opacity: 0, pointerEvents: "none" });
              gsap.set(".front-label", { opacity: 1 });
              expandedCardRef.current = null;

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

        <div className="card-container relative w-[75%] flex gap-5 [perspective:1000px] translate-y-[40px] overflow-visible">
          <Card
            id="card-1"
            label="Work Experience"
            bgColor="card-1"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="cardIcon"
              >
                <path d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 544L432 544L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM480 160L480 544L512 544C547.3 544 576 515.3 576 480L576 224C576 188.7 547.3 160 512 160L480 160zM160 544L160 160L128 160C92.7 160 64 188.7 64 224L64 480C64 515.3 92.7 544 128 544L160 544z" />
              </svg>
            }
            details={workDetails}
            onCardClick={handleCardClick}
            onClose={handleClose}
          />
          <Card
            id="card-2"
            label="Education"
            bgColor="card-2"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="cardIcon"
              >
                <path d="M80 259.8L289.2 345.9C299 349.9 309.4 352 320 352C330.6 352 341 349.9 350.8 345.9L593.2 246.1C602.2 242.4 608 233.7 608 224C608 214.3 602.2 205.6 593.2 201.9L350.8 102.1C341 98.1 330.6 96 320 96C309.4 96 299 98.1 289.2 102.1L46.8 201.9C37.8 205.6 32 214.3 32 224L32 520C32 533.3 42.7 544 56 544C69.3 544 80 533.3 80 520L80 259.8zM128 331.5L128 448C128 501 214 544 320 544C426 544 512 501 512 448L512 331.4L369.1 390.3C353.5 396.7 336.9 400 320 400C303.1 400 286.5 396.7 270.9 390.3L128 331.4z" />
              </svg>
            }
            details={educationDetails}
            onCardClick={handleCardClick}
            onClose={handleClose}
          />
          <Card
            id="card-3"
            label="Projects"
            bgColor="card-3"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="cardIcon"
              >
                <path d="M246.9 82.3L271 67.8C292.6 54.8 317.3 48 342.5 48C379.3 48 414.7 62.6 440.7 88.7L504.6 152.6C519.6 167.6 528 188 528 209.2L528 240.1L547.7 259.8L547.7 259.8C563.3 244.2 588.6 244.2 604.3 259.8C620 275.4 619.9 300.7 604.3 316.4L540.3 380.4C524.7 396 499.4 396 483.7 380.4C468 364.8 468.1 339.5 483.7 323.8L464 304L433.1 304C411.9 304 391.5 295.6 376.5 280.6L327.4 231.5C312.4 216.5 304 196.1 304 174.9L304 162.2C304 151 298.1 140.5 288.5 134.8L246.9 109.8C236.5 103.6 236.5 88.6 246.9 82.4zM50.7 466.7L272.8 244.6L363.3 335.1L141.2 557.2C116.2 582.2 75.7 582.2 50.7 557.2C25.7 532.2 25.7 491.7 50.7 466.7z" />
              </svg>
            }
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
