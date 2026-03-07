"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

export default function ImportantInfo({ config = {}, theme }) {

  const {
    title = "Información Importante",
    notes = [],
    extraMessage
  } = config;

  const { fonts, colors } = theme;

  const shouldReduceMotion = useReducedMotion();

  if (!notes.length && !extraMessage) return null;

  return (
    <div className="max-w-5xl mx-auto px-6">

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >

        {/* TÍTULO */}

        <div className="text-center mb-16">
          <h2 className={`typo-h1 ${fonts.accent} ${colors.primary} mb-6`}>
            {title}
          </h2>

          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-current opacity-40"></span>
            <span className="text-xl opacity-60">✦</span>
            <span className="h-px w-20 bg-current opacity-40"></span>
          </div>
        </div>

        {/* LISTA */}

        <div className="space-y-8 max-w-3xl mx-auto">

          {notes.map((note, index) => (
            <div key={index} className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <Check className={`w-5 h-5 ${colors.primary}`} />
              </div>

              <p className={`typo-body ${fonts.body}`}>
                {note}
              </p>

            </div>
          ))}

        </div>

        {/* MENSAJE EXTRA */}

        {extraMessage && (
          <p className={`typo-body ${fonts.body} mt-12 max-w-3xl mx-auto text-center`}>
            {extraMessage}
          </p>
        )}

      </motion.div>

    </div>
  );
}