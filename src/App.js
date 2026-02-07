import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function App() {

  useEffect(() => {
    const canvas = document.getElementById("rose-canvas");
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const petals = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 10 + Math.random() * 10,
      speed: 0.5 + Math.random() * 1.2,
      sway: Math.random() * 2,
      angle: Math.random() * Math.PI,
      opacity: 0.7
    }));

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "#ff4d6d";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.r, -p.r, p.r * 2, p.r, 0, p.r * 2);
      ctx.bezierCurveTo(-p.r * 2, p.r, -p.r, -p.r, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01) * p.sway;
        p.angle += 0.01;
        if (p.y > canvas.height) p.y = -30;
        drawPetal(p);
      });
      requestAnimationFrame(animate);
    }

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="container">
      <canvas id="rose-canvas" />

      <motion.div
        className="card"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.h1
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          🌹 Happy Rose Day 🌹
        </motion.h1>

        <p>
          On this Rose Day, I don’t send you just a flower —  
          I send you my heart, my warmth,  
          and every silent promise of forever ❤️
        </p>
      </motion.div>
    </div>
  );
}
