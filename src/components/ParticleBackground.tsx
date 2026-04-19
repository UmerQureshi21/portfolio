import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const darkOptions: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 0 },
  particles: {
    number: { value: 80, density: { enable: true, width: 800, height: 800 } },
    color: { value: "#ffffff" },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
    },
    opacity: { value: 0.4 },
    size: { value: { min: 1, max: 3 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
    },
    modes: {
      grab: { distance: 200, links: { opacity: 0.4 } },
    },
  },
  detectRetina: true,
};

const lightOptions: ISourceOptions = {
  ...darkOptions,
  particles: {
    ...darkOptions.particles,
    color: { value: "#000000" },
    links: {
      enable: true,
      distance: 150,
      color: "#000000",
      opacity: 0.1,
      width: 1,
    },
    opacity: { value: 0.3 },
  },
};

export default function ParticleBackground() {
  const [ready, setReady] = useState(false);
  const [isLight, setIsLight] = useState(
    () => document.documentElement.classList.contains("light"),
  );

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!ready) return null;

  return (
    <Particles
      key={isLight ? "light" : "dark"}
      id="tsparticles"
      options={isLight ? lightOptions : darkOptions}
    />
  );
}
