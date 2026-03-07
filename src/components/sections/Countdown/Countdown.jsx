"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function Countdown({ config = {}, theme }) {
  const { dateTime } = config;
  const { fonts, colors } = theme;

  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion ? {} : { variants: fadeUp };

  const calculateTimeLeft = () => {
    const difference = new Date(dateTime) - new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      {...motionProps}
    >
      {/* Título */}
      <h2 className={`typo-h1 ${fonts.accent} ${colors.primary} mb-6`}>
        Faltan tan solo unos días
      </h2>

      <p className={`typo-body ${fonts.body} ${colors.accent} mb-10`}>
        para celebrar nuestro gran día
      </p>

      {/* Card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-8 md:px-12 md:py-10 border border-white/30">
        <div className="grid grid-cols-4 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#A04C3A]/20">
          {[
            { label: "Días", value: timeLeft.days },
            { label: "Horas", value: timeLeft.hours },
            { label: "Minutos", value: timeLeft.minutes },
            { label: "Segundos", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-6 md:py-8"
            >
              <span className={`typo-h2 ${fonts.heading} ${colors.primary}`}>
                {item.value}
              </span>

              <span className={`typo-body-xs ${fonts.body} ${colors.secondary}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
