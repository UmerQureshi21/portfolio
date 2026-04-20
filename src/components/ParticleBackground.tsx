import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const PARTICLE_COUNT = 50;

function createParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.2,
    radius: 1 + Math.random() * 1.5,
    opacity: 0.08 + Math.random() * 0.12,
  }));
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId = 0;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();

    const particles = createParticles(w, h);

    // Read particle color from CSS variable, update on theme toggle
    let color = getComputedStyle(document.documentElement)
      .getPropertyValue("--fg")
      .trim();
    let isDark = !document.documentElement.classList.contains("light");
    canvas!.style.display = isDark ? "block" : "none";

    const observer = new MutationObserver(() => {
      color = getComputedStyle(document.documentElement)
        .getPropertyValue("--fg")
        .trim();
      isDark = !document.documentElement.classList.contains("light");
      canvas!.style.display = isDark ? "block" : "none";
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Debounced resize
    let resizeTimer: number;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        // Redistribute particles that ended up off-screen
        for (const p of particles) {
          if (p.x > w) p.x = Math.random() * w;
          if (p.y > h) p.y = Math.random() * h;
        }
      }, 200);
    }
    window.addEventListener("resize", onResize);

    // Respect reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      // Draw once, static
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", onResize);
      };
    }

    const cardIds = ["card-1", "card-2", "card-3"];

    function animate() {
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.globalAlpha = p.opacity;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      // Clear pixels where cards are so particles don't show through
      for (const id of cardIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        ctx!.clearRect(rect.left, rect.top, rect.width, rect.height);
      }

      animFrameId = requestAnimationFrame(animate);
    }
    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
