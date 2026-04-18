import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

function App() {
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
      // Only allow expanding when cards are fully centered on screen
      if (scrollProgressRef.current > 0.99) return;

      setExpandedCard(cardId);
      expandedCardRef.current = cardId;
      expandTimestampRef.current = Date.now();

      const otherCards = ["#card-1", "#card-2", "#card-3"].filter(
        (id) => id !== `#${cardId}`
      );

      otherCards.forEach((id) => {
        gsap.to(`${id} .card-front, ${id} .card-back`, {
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.set(id, { pointerEvents: "none" });
      });

      // Hide the sticky header
      gsap.to(".sticky-header", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // Calculate offsets to center the card in the viewport
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
    [expandedCard]
  );

  const handleClose = useCallback(() => {
    if (!expandedCard) return;

    const cardId = expandedCard;
    const otherCards = ["#card-1", "#card-2", "#card-3"].filter(
      (id) => id !== `#${cardId}`
    );

    gsap.to(`#${cardId} .close-btn`, {
      opacity: 0,
      duration: 0.2,
    });

    gsap.to(`#${cardId} .card-detail`, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(`#${cardId} .card-label`, {
      opacity: 1,
      delay: 0.2,
      duration: 0.3,
      ease: "power2.out",
    });

    // Show the sticky header again
    gsap.to(".sticky-header", {
      opacity: 1,
      delay: 0.3,
      duration: 0.4,
      ease: "power2.out",
    });

    // Restore original tilt and position
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

  // Keep the ref in sync so the scroll handler can call it
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
            ".card, .card-container, .sticky-header h1"
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

            // --- Auto-close expanded card on scroll (with 600ms guard) ---
            if (
              expandedCardRef.current &&
              self.direction === -1 &&
              Date.now() - expandTimestampRef.current > 600
            ) {
              handleCloseRef.current();
            }

            // --- Header slide-in (10% - 25%) ---
            if (progress >= 0.1 && progress <= 0.25) {
              const headerProgress = gsap.utils.mapRange(
                0.1,
                0.25,
                0,
                1,
                progress
              );
              const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
              const opacityValue = gsap.utils.mapRange(
                0,
                1,
                0,
                1,
                headerProgress
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

            // --- Card container width (0% - 25%) ---
            if (progress <= 0.25) {
              const widthPercentage = gsap.utils.mapRange(
                0,
                0.25,
                90,
                75,
                progress
              );
              gsap.set(cardContainer, { width: `${widthPercentage}%` });
            } else {
              gsap.set(cardContainer, { width: "75%" });
            }

            // --- Gap + border-radius at 35% ---
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

            // --- Reverse gap below 35% ---
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

            // --- Card flip at 70% ---
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

            // --- Reverse flip below 70% ---
            if (progress < 0.7 && isFlipAnimationCompleted) {
              gsap.to(".card", {
                rotateY: 0,
                duration: 1,
                ease: "power3.out",
                stagger: -0.15,
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

  return (
    <div className="font-[Poppins,sans-serif]">
      {/* --- Progress bar --- */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-white origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      {/* --- Intro --- */}
      <section className="relative w-full h-svh p-8 bg-[var(--bg)] text-[var(--fg)] text-center content-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[4rem] max-[1000px]:text-[2.5rem] font-medium leading-none w-[30%] max-[1000px]:w-full mx-auto">
            Your Name
          </h1>
          <p className="text-[1.2rem] font-light opacity-60 tracking-[0.2em] uppercase">
            Software Developer
          </p>
          <p className="text-[1.1rem] font-light opacity-70 max-w-[500px] max-[1000px]:max-w-full leading-relaxed">
            Building thoughtful digital experiences with clean code and creative
            problem solving.
          </p>
        </div>
      </section>

      {/* --- Sticky card section --- */}
      <section className="sticky relative w-full h-svh max-[1000px]:h-auto p-8 max-[1000px]:py-16 bg-[var(--bg)] text-[var(--fg)] flex justify-center items-center max-[1000px]:flex-col overflow-visible">
        <div className="sticky-header absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-[1000px]:relative max-[1000px]:top-0 max-[1000px]:left-0 max-[1000px]:translate-x-0 max-[1000px]:translate-y-0 max-[1000px]:mb-16">
          <h1 className="relative text-center text-[4rem] max-[1000px]:text-[3rem] font-medium leading-none [will-change:transform,opacity] translate-y-[40px] opacity-0 min-[1000px]:translate-y-[40px] min-[1000px]:opacity-0 max-[1000px]:!opacity-100 max-[1000px]:!translate-y-0">
            what I bring to the table
          </h1>
        </div>

        <div className="card-container relative w-[90%] max-[1000px]:w-full flex max-[1000px]:flex-col max-[1000px]:gap-8 [perspective:1000px] translate-y-[40px] [will-change:width] overflow-visible">
          {/* Card 1 — Work Experience */}
          <div
            className="card relative flex-1 aspect-[400/521] [transform-style:preserve-3d] origin-top cursor-pointer rounded-l-[20px] max-[1000px]:w-full max-[1000px]:max-w-[400px] max-[1000px]:mx-auto max-[1000px]:!rounded-[20px]"
            id="card-1"
            onClick={() => handleCardClick("card-1")}
          >
            <div className="card-front absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden">
              <img className="w-full h-full object-cover" src="/thirds/1.jpg" alt="" />
            </div>
            <div className="card-back absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden flex justify-center items-center text-center [transform:rotateY(180deg)] p-8 bg-[var(--card-1)] text-[var(--bg)]">
              <span className="absolute top-8 left-8 opacity-40">( 01 )</span>
              <div className="card-label">
                <p className="text-[1.8rem] font-medium leading-none">Work Experience</p>
              </div>
              <button
                className="close-btn absolute top-5 right-5 bg-transparent border-2 border-current text-inherit w-8 h-8 rounded-full text-sm cursor-pointer opacity-0 z-20 flex items-center justify-center hover:bg-white/15"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                ✕
              </button>
              <div className="card-detail absolute inset-0 pt-14 px-8 pb-8 opacity-0 pointer-events-none overflow-y-auto text-left flex flex-col gap-6">
                <div className="detail-entry border-b border-black/15 pb-5 last:border-b-0">
                  <h3 className="text-base font-semibold mb-1">Software Engineer</h3>
                  <span className="text-[0.7rem] opacity-50 block mb-2 tracking-wide">
                    Company Name — 2024-Present
                  </span>
                  <p className="text-[0.75rem] font-light leading-relaxed opacity-85">
                    Built and maintained full-stack web applications. Collaborated
                    with cross-functional teams to deliver features on tight
                    deadlines.
                  </p>
                </div>
                <div className="detail-entry border-b border-black/15 pb-5 last:border-b-0">
                  <h3 className="text-base font-semibold mb-1">Frontend Developer Intern</h3>
                  <span className="text-[0.7rem] opacity-50 block mb-2 tracking-wide">
                    Another Company — 2023
                  </span>
                  <p className="text-[0.75rem] font-light leading-relaxed opacity-85">
                    Developed responsive UI components and improved page load
                    performance by 40%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Education */}
          <div
            className="card relative flex-1 aspect-[400/521] [transform-style:preserve-3d] origin-top max-[1000px]:w-full max-[1000px]:max-w-[400px] max-[1000px]:mx-auto max-[1000px]:!rounded-[20px]"
            id="card-2"
          >
            <div className="card-front absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden">
              <img className="w-full h-full object-cover" src="/thirds/2.jpg" alt="" />
            </div>
            <div className="card-back absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden flex justify-center items-center text-center [transform:rotateY(180deg)] p-8 bg-[var(--card-2)]">
              <span className="absolute top-8 left-8 opacity-40">( 02 )</span>
              <div className="card-label">
                <p className="text-[1.8rem] font-medium leading-none">Education</p>
              </div>
              <div className="absolute bottom-8 left-8 right-8 text-left">
                <h3 className="text-[1.1rem] max-[1000px]:text-[1rem] font-semibold mb-1">
                  B.S. Computer Science
                </h3>
                <span className="text-[0.75rem] opacity-60 block mb-2">
                  Your University — 2024
                </span>
                <p className="text-[0.7rem] font-light leading-relaxed opacity-80">
                  Data Structures &middot; Algorithms &middot; Operating Systems
                  &middot; Databases &middot; Software Engineering &middot; Web
                  Development
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 — Projects */}
          <div
            className="card relative flex-1 aspect-[400/521] [transform-style:preserve-3d] origin-top cursor-pointer rounded-r-[20px] max-[1000px]:w-full max-[1000px]:max-w-[400px] max-[1000px]:mx-auto max-[1000px]:!rounded-[20px]"
            id="card-3"
            onClick={() => handleCardClick("card-3")}
          >
            <div className="card-front absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden">
              <img className="w-full h-full object-cover" src="/thirds/3.jpg" alt="" />
            </div>
            <div className="card-back absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden flex justify-center items-center text-center [transform:rotateY(180deg)] p-8 bg-[var(--card-3)]">
              <span className="absolute top-8 left-8 opacity-40">( 03 )</span>
              <div className="card-label">
                <p className="text-[1.8rem] font-medium leading-none">Projects</p>
              </div>
              <button
                className="close-btn absolute top-5 right-5 bg-transparent border-2 border-current text-inherit w-8 h-8 rounded-full text-sm cursor-pointer opacity-0 z-20 flex items-center justify-center hover:bg-white/15"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                ✕
              </button>
              <div className="card-detail absolute inset-0 pt-14 px-8 pb-8 opacity-0 pointer-events-none overflow-y-auto text-left flex flex-col gap-6">
                <div className="detail-entry border-b border-white/15 pb-5 last:border-b-0">
                  <h3 className="text-base font-semibold mb-1">Project One</h3>
                  <span className="text-[0.7rem] opacity-50 block mb-2 tracking-wide">
                    React &middot; Node.js &middot; PostgreSQL
                  </span>
                  <p className="text-[0.75rem] font-light leading-relaxed opacity-85">
                    A full-stack application for managing tasks with real-time
                    collaboration features.
                  </p>
                </div>
                <div className="detail-entry border-b border-white/15 pb-5 last:border-b-0">
                  <h3 className="text-base font-semibold mb-1">Project Two</h3>
                  <span className="text-[0.7rem] opacity-50 block mb-2 tracking-wide">
                    TypeScript &middot; GSAP &middot; Three.js
                  </span>
                  <p className="text-[0.75rem] font-light leading-relaxed opacity-85">
                    An interactive 3D portfolio site with scroll-driven
                    animations and immersive transitions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Outro --- */}
      <section className="relative w-full h-svh p-8 bg-[var(--bg)] text-[var(--fg)] text-center content-center">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-[4rem] max-[1000px]:text-[3rem] font-medium leading-none w-[30%] max-[1000px]:w-full mx-auto">
            let's connect
          </h1>
          <div className="flex max-[1000px]:flex-col max-[1000px]:items-center gap-10 max-[1000px]:gap-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--fg)] no-underline text-[1.1rem] font-normal opacity-70 tracking-widest uppercase transition-opacity duration-300 hover:opacity-100"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--fg)] no-underline text-[1.1rem] font-normal opacity-70 tracking-widest uppercase transition-opacity duration-300 hover:opacity-100"
            >
              LinkedIn
            </a>
            <a
              href="mailto:your@email.com"
              className="text-[var(--fg)] no-underline text-[1.1rem] font-normal opacity-70 tracking-widest uppercase transition-opacity duration-300 hover:opacity-100"
            >
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
