"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Accommodation({ config = {}, theme }) {

  const {
    title = "Hospedaje Sugerido",
    description,
    places = []
  } = config;

  const { fonts, colors } = theme;

  const shouldReduceMotion = useReducedMotion();

  if (!places.length) return null;

  return (
    <div className="max-w-6xl mx-auto px-6">

      {/* Título */}
      <div className="text-center mb-16">
        <h2 className={`typo-h1 ${fonts.accent} ${colors.primary} mb-6`}>
          {title}
        </h2>

        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-20 bg-current opacity-40"></span>
          <span className="text-xl opacity-60">✦</span>
          <span className="h-px w-20 bg-current opacity-40"></span>
        </div>

        {description && (
          <p className={`typo-body ${fonts.body} mt-8 max-w-3xl mx-auto`}>
            {description}
          </p>
        )}
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {places.map((place, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className={`w-5 h-5 ${colors.primary}`} />
              <h3 className={`typo-h3 ${fonts.accent}`}>
                {place.name}
              </h3>
            </div>

            {place.distance && (
              <p className={`typo-body ${fonts.body} mb-4`}>
                {place.distance}
              </p>
            )}

            {place.link && (
              <a
                href={place.link}
                target="_blank"
                className={`${colors.primary} underline`}
              >
                Ver ubicación
              </a>
            )}
          </div>
        ))}
      </motion.div>

    </div>
  );
}