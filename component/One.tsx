"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div
      ref={heroRef}
      className="h-screen flex items-center justify-center bg-gray-900 text-white"
    >
      <h1 className="hero-title text-5xl font-bold">
        Welcome to GSAP + Next.js 🚀
      </h1>
    </div>
  );
}
