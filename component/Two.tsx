"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".cta", { scale: 0.8, opacity: 0, duration: 0.8, ease: "elastic.out(1,0.5)" }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white space-y-6">
      <h1 className="title text-6xl font-bold">GSAP Timeline</h1>
      <p className="subtitle text-lg text-gray-300">Chained animations for smooth sequences</p>
      <button className="cta px-6 py-3 bg-blue-500 rounded-lg font-bold">Get Started</button>
    </div>
  );
}
