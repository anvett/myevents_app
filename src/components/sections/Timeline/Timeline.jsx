"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Church, MapPin, Music } from "lucide-react";

export default function Timeline({ config = {}, theme }) {
  const { items = [] } = config;
  const { fonts, colors } = theme;

  const shouldReduceMotion = useReducedMotion();

  const containerMotion = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
        variants: fadeUp,
      };

  const resolveIcon = (description = "") => {
    const text = description.toLowerCase();
    if (text.includes("misa") || text.includes("ceremonia")) return Church;
    if (text.includes("recepción")) return MapPin;
    return Music;
  };

  return (
    <motion.div className="relative " {...containerMotion}>

      {/* ========================= */}
      {/* OVERLAY */}
      {/* ========================= */}

      {/* <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-white/70 z-0" /> */}

      {/* ========================= */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ========================= */}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        {/* ========================= */}
        {/* TÍTULO DE SECCIÓN */}
        {/* ========================= */}

        <div className="text-center mb-24">
          <h2 className={`typo-h1 ${fonts.accent} ${colors.primary} mb-6`}>
            Itinerario de la Boda
          </h2>

          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-current opacity-40"></span>

            <span className="text-xl opacity-60">✦</span>

            <span className="h-px w-20 bg-current opacity-40"></span>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:block">
          <div className="grid grid-rows-[auto_auto_auto_auto]">
            {/* Row 1 — Iconos */}
            <div className="flex justify-between">
              {items.map((item, index) => {
                const Icon = resolveIcon(item.description);
                return (
                  <div key={index} className="flex-1 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                      <Icon className={`w-8 h-8 ${colors.primary}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Row 2 — Títulos */}
            <div className="flex justify-between mt-6">
              {items.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  <h3 className={`typo-body ${fonts.accent} ${colors.primary}`}>
                    {item.description}
                  </h3>
                </div>
              ))}
            </div>

            {/* Row 3 — Línea + Puntos */}
            <div className="relative flex justify-between items-center mt-10 mb-8">
              {/* Línea global */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
              </div>

              {items.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 flex justify-center relative z-10"
                >
                  <div className="w-4 h-4 rounded-full bg-current shadow-[0_0_0_4px_rgba(255,255,255,0.8)]" />
                </div>
              ))}
            </div>

            {/* Row 4 — Hora */}
            <div className="flex justify-between">
              {items.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  <p className={`typo-body ${fonts.body}`}>{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden relative">
          {/* Línea vertical central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-current opacity-30 -translate-x-1/2" />

          <div className="space-y-16 relative z-10">
            {items.map((item, index) => {
              const Icon = resolveIcon(item.description);

              return (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_auto_1fr] items-center"
                >
                  {/* IZQUIERDA — Icono + Título */}
                  <div className="flex flex-col items-end text-right pr-4">
                    <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm mb-2">
                      <Icon className={`w-6 h-6 ${colors.primary}`} />
                    </div>
                    <h3 className={`typo-subt ${fonts.accent} ${colors.primary}`}>
                      {item.description}
                    </h3>
                  </div>

                  {/* CENTRO — Punto */}
                  <div className="relative flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-current z-20" />
                  </div>

                  {/* DERECHA — Hora */}
                  <div className="pl-4">
                    <p className={`typo-h3 ${fonts.body}`}>{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
