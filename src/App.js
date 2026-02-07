import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

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
      speed: 0.6 + Math.random(),
      sway: Math.random() * 2,
      angle: Math.random() * Math.PI,
      opacity: 0.75
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
        if (p.y > canvas.height) p.y = -40;
        drawPetal(p);
      });
      requestAnimationFrame(animate);
    }

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play();
    }
    setStarted(true);
  };

  return (
    <div className="container">
      <canvas id="rose-canvas" />

      <audio ref={audioRef} loop>
        <source src="/romantic.mp3" type="audio/mpeg" />
      </audio>

      {!started && (
        <div className="overlay">
          <motion.button
            onClick={startExperience}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            💖 Tap to Begin 💖
          </motion.button>
        </div>
      )}

      {started && (
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
            🌹 Happy Rose Day Jotu 🌹
          </motion.h1>

          <p>
            Hi Jotu,<br /><br />
            It’s our second Rose Day together, and it still feels just as special
            as the first—maybe even more. 🌹<br /><br />
            Every rose reminds me of you: your warmth, your smile, and the way you
            quietly make my world brighter.<br /><br />
            Thank you for choosing me again, for growing with me, and for turning
            ordinary days into something beautiful.<br /><br />
            Here’s to us—still blooming, still choosing each other, today and
            always. ❤️
          </p>
        </motion.div>
      )}
    </div>
  );
}
