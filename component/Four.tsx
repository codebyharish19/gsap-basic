"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".card").forEach((card, i) => {
        // Floating animation
        gsap.to(card, {
          y: -20,
          duration: 2 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Subtle rotation
        gsap.to(card, {
          rotate: i % 2 === 0 ? 3 : -3,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Pulse effect
        gsap.to(card, {
          scale: 1.05,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: i * 0.5,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 space-x-8"
    >
      <div className="card w-48 h-64 bg-gradient-to-tr from-pink-500 to-red-500 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-xl">
        Card 1
      </div>
      <div className="card w-48 h-64 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-xl">
        Card 2
      </div>
      <div className="card w-48 h-64 bg-gradient-to-tr from-green-500 to-emerald-500 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-xl">
        Card 3
      </div>
    </div>
  );
}
