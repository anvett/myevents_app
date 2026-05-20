"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function Ceremony({ config = {}, theme }) {
  const {
    title,
    place,
    address,
    reference,
    time,
    mapsLink,
    textStyles = {},
    textSizes = {},
  } = config;

  const { fonts, colors } = theme || {};

  const titleColor = colors?.[textStyles.title] || colors?.primary;
  const iconsColor = colors?.[textStyles.icons] || colors?.accent;
  const labelsColor = colors?.[textStyles.labels] || colors?.primary;
  const bodyColor = colors?.[textStyles.body] || colors?.dark;
  const referenceColor = colors?.[textStyles.reference] || colors?.dark;
  const dividerColor = colors?.[textStyles.dividers] || colors?.secondary;

  const titleSize = textSizes.title || "typo-h1";
  const bodySize = textSizes.body || "typo-body";
  const referenceSize = textSizes.reference || "typo-body-sm";
  const buttonSize = textSizes.button || "typo-button";

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
      {title && (
        <h2 className={`${titleSize} ${fonts?.accent} ${titleColor} text-center mb-6`}>
          {title}
        </h2>
      )}

      <div className={`h-px bg-current opacity-20 mb-10 max-w-xs mx-auto ${dividerColor}`} />

      <div className="space-y-8">
        {time && (
          <div className="flex items-start gap-4">
            <Clock className={`w-6 h-6 shrink-0 ${iconsColor}`} />
            <p className={`${bodySize} ${fonts?.body} ${bodyColor}`}>
              <span className={`font-semibold ${labelsColor}`}>Hora: </span>
              {time}
            </p>
          </div>
        )}

        <div className={`h-px bg-current opacity-10 ${dividerColor}`} />

        {place && (
          <div className="flex items-start gap-4">
            <MapPin className={`w-6 h-6 shrink-0 ${iconsColor}`} />
            <p className={`${bodySize} ${fonts?.body} ${bodyColor}`}>
              <span className={`font-semibold ${labelsColor}`}>Lugar: </span>
              {place}

              {address && (
                <>
                  <br />
                  <span className={`${referenceSize} ${fonts?.body} ${referenceColor} opacity-80`}>
                    {address}
                  </span>
                </>
              )}

              {reference && (
                <>
                  <br />
                  <span className={`${referenceSize} ${fonts?.body} ${referenceColor} opacity-70`}>
                    {reference}
                  </span>
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {mapsLink && (
        <div className="mt-10 text-center">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonSize} px-8 py-3 rounded-full inline-block transition-all duration-300 ${colors?.buttonPrimary}`}
          >
            Ver ubicación
          </a>
        </div>
      )}
    </motion.div>
  );
}