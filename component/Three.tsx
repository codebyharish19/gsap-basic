"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Staggered text reveal
      gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((section) => {
        const chars = section.innerText.split("");
        section.innerHTML = chars
          .map((c) => `<span class="inline-block opacity-0">${c}</span>`)
          .join("");

        gsap.to(section.querySelectorAll("span"), {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-black text-white overflow-hidden"
    >
      <div className="h-[150vh] flex flex-col items-center justify-center space-y-32">
        {/* Section 1 */}
        <div className="relative w-2/3 text-center">
          <img
            src="https://picsum.photos/1200/800?random=1"
            alt="demo"
            className="parallax-img w-full rounded-2xl shadow-lg"
          />
          <h1 className="reveal-text absolute bottom-10 left-1/2 -translate-x-1/2 text-5xl font-extrabold drop-shadow-lg">
            Elevate Your Brand
          </h1>
        </div>

        {/* Section 2 */}
        <div className="relative w-2/3 text-center">
          <img
            src="https://picsum.photos/1200/800?random=2"
            alt="demo"
            className="parallax-img w-full rounded-2xl shadow-lg"
          />
          <h1 className="reveal-text absolute top-10 left-1/2 -translate-x-1/2 text-5xl font-extrabold drop-shadow-lg">
            Scroll With Style
          </h1>
        </div>
      </div>
    </div>
  );
}
