"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Star = {
  angle: number;
  radius: number;
  baseRadius: number; // keep original radius
  speed: number;
  color: string;
  opacity: number;
};

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const stars: Star[] = [];
    const count = 400;
    const colors = ["#60a5fa", "#a78bfa", "#f472b6", "#facc15", "#38bdf8"];

    // Create stars
    for (let i = 0; i < count; i++) {
      const baseRadius =
        Math.random() * (Math.min(window.innerWidth, window.innerHeight) / 2);
      stars.push({
        angle: Math.random() * Math.PI * 2,
        radius: baseRadius,
        baseRadius,
        speed: Math.random() * 0.002 + 0.0005,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random(),
      });
    }

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      center.x = window.innerWidth / 2;
      center.y = window.innerHeight / 2;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animate loop
    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.25)"; // trailing background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.angle += star.speed;

        const x = center.x + Math.cos(star.angle) * star.radius;
        const y = center.y + Math.sin(star.angle) * star.radius;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(animate);
    };
    animate();

    // Twinkling stars
    stars.forEach((star) => {
      gsap.to(star, {
        opacity: Math.random(),
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Breathing galaxy (use baseRadius, don’t destroy radius)
    stars.forEach((star) => {
      gsap.to(star, {
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        radius: star.baseRadius * (Math.random() * 0.15 + 1.05),
      });
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center space-y-6">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">Cinematic Galaxy 🌌</h1>
        <p className="text-lg text-gray-300 max-w-lg">
          Stars orbit endlessly with twinkling colors, expanding and contracting like a living galaxy.
        </p>
      </div>
    </div>
  );
}
