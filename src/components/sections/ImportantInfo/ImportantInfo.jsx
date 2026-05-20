"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

export default function ImportantInfo({ config = {}, theme }) {
  const {
    title = "Información Importante",
    notes = [],
    extraMessage,
    textStyles = {},
    textSizes = {},
    boxStyles = {},
  } = config;

  const { fonts, colors } = theme || {};

  const titleColor = colors?.[textStyles.title] || colors?.primary;
  const dividerColor = colors?.[textStyles.divider] || colors?.secondary;
  const iconColor = colors?.[textStyles.icon] || colors?.primary;
  const bodyColor = colors?.[textStyles.body] || colors?.dark;
  const extraMessageColor =
    colors?.[textStyles.extraMessage] || colors?.dark;

  const titleSize = textSizes.title || "typo-h1";
  const bodySize = textSizes.body || "typo-body";
  const extraMessageSize = textSizes.extraMessage || "typo-body";

  const iconBackground = boxStyles.iconBackground || "bg-white/80";

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
        <div className="text-center mb-16">
          {title && (
            <h2
              className={`${titleSize} ${fonts?.accent} ${titleColor} mb-6`}
            >
              {title}
            </h2>
          )}

          <div className={`flex items-center justify-center gap-4 ${dividerColor}`}>
            <span className="h-px w-20 bg-current opacity-40"></span>
            <span className="text-xl opacity-60">✦</span>
            <span className="h-px w-20 bg-current opacity-40"></span>
          </div>
        </div>

        <div className="space-y-8 max-w-3xl mx-auto">
          {notes.map((note, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full ${iconBackground} backdrop-blur-sm flex items-center justify-center shadow-sm`}
              >
                <Check className={`w-5 h-5 ${iconColor}`} />
              </div>

              <p className={`${bodySize} ${fonts?.body} ${bodyColor}`}>
                {note}
              </p>
            </div>
          ))}
        </div>

        {extraMessage && (
          <p
            className={`${extraMessageSize} ${fonts?.body} ${extraMessageColor} mt-12 max-w-3xl mx-auto text-center`}
          >
            {extraMessage}
          </p>
        )}
      </motion.div>
    </div>
  );
}