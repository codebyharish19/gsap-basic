"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // ✅ TypeScript safe

    let particles: Particle[] = [];
    const count = 120;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse handler
    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    // Create particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8"; // Tailwind cyan-400
        ctx.fill();

        // Connection to mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "rgba(56,189,248,0.3)";
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Subtle GSAP floating
    gsap.to(particles, {
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      vx: "+=0.2",
      vy: "+=0.2",
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center space-y-6">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">
          Particle Magic ✨
        </h1>
        <p className="text-lg text-gray-300 max-w-lg">
          A futuristic GSAP-powered particle field that reacts to your mouse.
        </p>
      </div>
    </div>
  );
}
