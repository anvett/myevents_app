"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function ConfettiEffect() {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let pieces = [];
    let animationFrameId;

    const isMobile = window.innerWidth < 768;
    const PIECES_COUNT = isMobile ? 35 : 70;

    const colors = [
      "#FFD500",
      "#005BBB",
      "#F51B1B",
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createPiece = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      width: 8 + Math.random() * 8,
      height: 12 + Math.random() * 14,
      speedY: 1 + Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 1.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6,
      opacity: 0.5 + Math.random() * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const init = () => {
      pieces = [];

      for (let i = 0; i < PIECES_COUNT; i++) {
        pieces.push(createPiece());
      }
    };

    const drawPiece = (piece) => {
      ctx.save();

      ctx.translate(piece.x, piece.y);
      ctx.rotate((piece.rotation * Math.PI) / 180);

      ctx.globalAlpha = piece.opacity;
      ctx.fillStyle = piece.color;

      ctx.fillRect(
        -piece.width / 2,
        -piece.height / 2,
        piece.width,
        piece.height,
      );

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((piece) => {
        piece.y += piece.speedY;
        piece.x += piece.speedX;
        piece.rotation += piece.rotationSpeed;

        if (piece.y > canvas.height + 30) {
          Object.assign(piece, createPiece(), {
            y: -20,
          });
        }

        drawPiece(piece);
      });

      animationFrameId = requestAnimationFrame(update);
    };

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