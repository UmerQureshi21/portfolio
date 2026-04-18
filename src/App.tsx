import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

function App() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const expandedCardRef = useRef<string | null>(null);
  const flipCompleteRef = useRef(false);
  const handleCloseRef = useRef<() => void>(() => {});

  const handleCardClick = useCallback(
    (cardId: string) => {
      if (!flipCompleteRef.current || expandedCard) return;

      setExpandedCard(cardId);
      expandedCardRef.current = cardId;

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

      // Calculate X offset to center the card in the container
      const cardEl = document.getElementById(cardId);
      const container = document.querySelector(".card-container");
      if (cardEl && container) {
        const cardRect = cardEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const xOffset = containerCenter - cardCenter;

        gsap.to(`#${cardId}`, {
          scale: 1.6,
          x: xOffset,
          y: 0,
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

    // Restore original tilt and position
    const originalY = 20;
    const originalRotateZ = cardId === "card-1" ? -3 : cardId === "card-3" ? 3 : 0;

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

            // --- Auto-close expanded card on scroll ---
            if (expandedCardRef.current && self.direction === -1) {
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
    <div className="poppins-font">
      {/* --- Intro --- */}
      <section className="intro">
        <div className="intro-content">
          <h1>Your Name</h1>
          <p className="intro-role">Software Developer</p>
          <p className="intro-about">
            Building thoughtful digital experiences with clean code and creative
            problem solving.
          </p>
        </div>
      </section>

      {/* --- Sticky card section --- */}
      <section className="sticky">
        <div className="sticky-header">
          <h1>what I bring to the table</h1>
        </div>

        <div className="card-container">
          {/* Card 1 — Work Experience */}
          <div
            className="card"
            id="card-1"
            onClick={() => handleCardClick("card-1")}
          >
            <div className="card-front">
              <img src="/thirds/1.jpg" alt="" />
            </div>
            <div className="card-back">
              <span>( 01 )</span>
              <div className="card-label">
                <p>Work Experience</p>
              </div>
              <button
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                ✕
              </button>
              <div className="card-detail">
                <div className="detail-entry">
                  <h3>Software Engineer</h3>
                  <span className="detail-meta">Company Name — 2024-Present</span>
                  <p>
                    Built and maintained full-stack web applications. Collaborated
                    with cross-functional teams to deliver features on tight
                    deadlines.
                  </p>
                </div>
                <div className="detail-entry">
                  <h3>Frontend Developer Intern</h3>
                  <span className="detail-meta">Another Company — 2023</span>
                  <p>
                    Developed responsive UI components and improved page load
                    performance by 40%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Education */}
          <div className="card" id="card-2">
            <div className="card-front">
              <img src="/thirds/2.jpg" alt="" />
            </div>
            <div className="card-back">
              <span>( 02 )</span>
              <div className="card-label">
                <p>Education</p>
              </div>
              <div className="edu-content">
                <h3>B.S. Computer Science</h3>
                <span className="detail-meta">Your University — 2024</span>
                <p className="coursework">
                  Data Structures &middot; Algorithms &middot; Operating Systems
                  &middot; Databases &middot; Software Engineering &middot; Web
                  Development
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 — Projects */}
          <div
            className="card"
            id="card-3"
            onClick={() => handleCardClick("card-3")}
          >
            <div className="card-front">
              <img src="/thirds/3.jpg" alt="" />
            </div>
            <div className="card-back">
              <span>( 03 )</span>
              <div className="card-label">
                <p>Projects</p>
              </div>
              <button
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                ✕
              </button>
              <div className="card-detail">
                <div className="detail-entry">
                  <h3>Project One</h3>
                  <span className="detail-meta">React &middot; Node.js &middot; PostgreSQL</span>
                  <p>
                    A full-stack application for managing tasks with real-time
                    collaboration features.
                  </p>
                </div>
                <div className="detail-entry">
                  <h3>Project Two</h3>
                  <span className="detail-meta">TypeScript &middot; GSAP &middot; Three.js</span>
                  <p>
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
      <section className="outro">
        <div className="outro-content">
          <h1>let's connect</h1>
          <div className="outro-links">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:your@email.com">Email</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
