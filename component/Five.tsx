"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".mag-card");

      // Floating animation
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -15 : -25,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Magnetic hover effect
      cards.forEach((card) => {
        const bounds = card.getBoundingClientRect();

        card.addEventListener("mousemove", (e) => {
          const x = e.offsetX - bounds.width / 2;
          const y = e.offsetY - bounds.height / 2;

          gsap.to(card, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power3.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
    >
      {/* Glowing Background */}
      <div className="absolute w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-[200px] animate-pulse -z-10" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[200px] animate-ping -z-10" />

      {/* Cards */}
      <div className="flex space-x-12">
        <div className="mag-card w-52 h-72 rounded-2xl bg-gradient-to-tr from-pink-500 to-red-500 shadow-2xl flex items-center justify-center text-white font-bold text-xl cursor-pointer">
          Creative
        </div>
        <div className="mag-card w-52 h-72 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-500 shadow-2xl flex items-center justify-center text-white font-bold text-xl cursor-pointer">
          Modern
        </div>
        <div className="mag-card w-52 h-72 rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-500 shadow-2xl flex items-center justify-center text-white font-bold text-xl cursor-pointer">
          Interactive
        </div>
      </div>
    </div>
  );
}
