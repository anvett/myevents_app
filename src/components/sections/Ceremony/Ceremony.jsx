"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function Ceremony({ config = {}, theme }) {
  const { place, address, time, mapsLink } = config;
  const { fonts, colors } = theme;

  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion ? {} : { variants: fadeUp };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      {...motionProps}
    >
      {/* Title */}
      <h2
        className={`typo-h1 ${fonts.accent} ${colors.primary} text-center mb-6`}
      >
        Ceremonia Religiosa
      </h2>

      {/* Divider */}
      <div className="h-px bg-current opacity-20 mb-10 max-w-xs mx-auto" />

      {/* Content */}
      <div className="space-y-8">

        {/* Fecha */}
        <div className="flex items-start gap-4">
          <Calendar className={`w-6 h-6 ${colors.primary}`} />
          <p className={`typo-body ${fonts.body}`}>
            <span className="font-semibold">Fecha:</span> 1 de mayo de 2026
          </p>
        </div>

        <div className="h-px bg-current opacity-10" />

        {/* Lugar */}
        <div className="flex items-start gap-4">
          <MapPin className={`w-6 h-6 ${colors.primary}`} />
          <p className={`typo-body ${fonts.body}`}>
            <span className="font-semibold">Lugar:</span> {place}
            <br />
            <span className="text-sm opacity-70">{address}</span>
          </p>
        </div>

        <div className="h-px bg-current opacity-10" />

        {/* Hora */}
        <div className="flex items-start gap-4">
          <Clock className={`w-6 h-6 ${colors.primary}`} />
          <p className={`typo-body ${fonts.body}`}>
            <span className="font-semibold">Hora:</span> {time}
          </p>
        </div>
      </div>

      {/* Maps Button */}
      {mapsLink && (
        <div className="mt-10 text-center">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`typo-button px-8 py-3 rounded-full ${colors.buttonPrimary}`}
          >
            Ver ubicación
          </a>
        </div>
      )}
    </motion.div>
  );
}