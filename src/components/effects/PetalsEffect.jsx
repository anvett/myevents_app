"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function PetalsEffect() {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let petals = [];
    let animationFrameId;

    const isMobile = window.innerWidth < 768;
    const PETAL_COUNT = isMobile ? 10 : 18;

    const petalImage = new Image();
    petalImage.src = "/images/petal.png";

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createPetal = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 18 + Math.random() * 22,
      speedY: 0.5 + Math.random() * 1,
      speedX: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
      opacity: 0.6 + Math.random() * 0.2,
    });

    const init = () => {
      petals = [];
      for (let i = 0; i < PETAL_COUNT; i++) {
        petals.push(createPetal());
      }
    };

    const drawPetal = (petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);
      ctx.globalAlpha = petal.opacity;

      ctx.drawImage(
        petalImage,
        -petal.size / 5,
        -petal.size / 5,
        petal.size,
        petal.size,
      );

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal) => {
        petal.y += petal.speedY;
        petal.x += petal.speedX;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height) {
          Object.assign(petal, createPetal(), { y: -20 });
        }

        drawPetal(petal);
      });

      animationFrameId = requestAnimationFrame(update);
    };

    console.log("PetalsEffect running");

    resizeCanvas();
    init();
    update();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
