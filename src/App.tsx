import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const cardContainer = document.querySelector<HTMLElement>(".card-container");
    const stickyHeader = document.querySelector<HTMLElement>(".sticky-header h1");

    let isGapAnimationCompleted = false;
    let isFlipAnimationCompleted = false;

    function initAnimations() {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const mm = gsap.matchMedia();

      mm.add("(max-width: 999px)", () => {
        document
          .querySelectorAll<HTMLElement>(".card, .card-container, .sticky-header h1")
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

            // --- Header slide-in (10% - 25%) ---
            if (progress >= 0.1 && progress <= 0.25) {
              const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
              const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
              const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);

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
              const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
              gsap.set(cardContainer, { width: `${widthPercentage}%` });
            } else {
              gsap.set(cardContainer, { width: "60%" });
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
      <section className="intro">
        <h1>every idea begins as a simple image</h1>
      </section>
      <section className="sticky">
        <div className="sticky-header">
          <h1>three pillars with one purpose</h1>
        </div>

        <div className="card-container">
          <div className="card" id="card-1">
            <div className="card-front">
              <img src="/thirds/1.jpg" alt="" />
            </div>
            <div className="card-back">
              <span>( 01 )</span>
              <p>Interactive Web Experience</p>
            </div>
          </div>

          <div className="card" id="card-2">
            <div className="card-front">
              <img src="/thirds/2.jpg" alt="" />
            </div>
            <div className="card-back">
              <span>( 02 )</span>
              <p>Interactive Web Experience</p>
            </div>
          </div>

          <div className="card" id="card-3">
            <div className="card-front">
              <img src="/thirds/3.jpg" alt="" />
            </div>
            <div className="card-back">
              <span>( 03 )</span>
              <p>Interactive Web Experience</p>
            </div>
          </div>
        </div>
      </section>
      <section className="outro">
        <h1>every transition leaves a trace</h1>
      </section>
    </div>
  );
}

export default App;
