"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const words = [
  "Next.js",
  "GSAP",
  "React",
  "Tailwind",
  "Design",
  "Node.js",
  "MongoDB",
  "Animation",
  "JavaScript",
  "TypeScript",
  "API",
  "GraphQL",
];

export default function TextSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const texts = containerRef.current.querySelectorAll(".sphere-text");

    // Arrange texts in a circle
    texts.forEach((text, i) => {
      const angle = (i / texts.length) * Math.PI * 2;
      const x = Math.cos(angle) * 200;
      const y = Math.sin(angle) * 200;
      gsap.set(text, { x, y, z: 0 });
    });

    // Continuous rotation
    gsap.to(containerRef.current, {
      rotationY: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-[500px] h-[500px] text-white [transform-style:preserve-3d]"
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="sphere-text absolute text-xl font-bold"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
