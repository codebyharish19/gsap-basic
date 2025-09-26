"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

export default function WaveBackground() {
  const waveRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    if (!waveRef.current) return;

    const wave = waveRef.current;

    gsap.to(wave, {
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      morphSVG:
        "M0,160 C150,200 350,100 600,180 C850,260 1100,120 1440,200 L1440,320 L0,320 Z",
    });

    // Floating bubbles
    gsap.utils.toArray<HTMLElement>(".bubble").forEach((bubble, i) => {
      gsap.to(bubble, {
        y: -200,
        opacity: 0,
        x: `random(-50, 50)`,
        duration: `random(5, 10)`,
        repeat: -1,
        delay: i * 2,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-black">
      {/* SVG Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={waveRef}
          fill="#3b82f6"
          fillOpacity="0.6"
          d="M0,160 C180,260 420,60 720,160 C1020,260 1260,60 1440,160 L1440,320 L0,320 Z"
        />
      </svg>

      {/* Floating Bubbles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bubble absolute bottom-0 left-1/2 w-6 h-6 rounded-full bg-blue-400 opacity-50"
          style={{ transform: `translateX(${i * 60}px)` }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white space-y-6">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">Immersive Waves</h1>
        <p className="text-lg text-gray-300">A GSAP-powered ocean effect 🌊</p>
      </div>
    </div>
  );
}
