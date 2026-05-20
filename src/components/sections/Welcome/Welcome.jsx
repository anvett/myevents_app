"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function Welcome({
  config = {},
  variant = "default",
  theme,
}) {
  const { title, showDivider, message, signature } = config;
  const { fonts, colors } = theme;

  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? { initial: false, whileInView: false }
    : {
        variants: fadeUp,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
      };

  return (
    <motion.div
      className="flex flex-col items-center text-center mx-auto max-w-2xl px-6"
      {...motionProps}
    >
      {/* TITLE */}
      {title && (
        <h2 className={`typo-h1 ${fonts.accent} ${colors.primary} mb-4`}>
          {title}
        </h2>
      )}

      {/* DIVIDER */}
      {showDivider && (
        <div
          className={`w-20 h-px bg-current opacity-60 my-4 ${colors.secondary}`}
        />
      )}

      {/* MESSAGE */}
      {message && (
        <p className={`typo-body-xl text-start pr-20 ${fonts.body} leading-relaxed`}>
          {message}
        </p>
      )}

      {/* SIGNATURE */}
      {signature && signature.trim() !== "" && (
        <p className={`typo-body italic text-start ${colors.accent} ${fonts.heading} mt-6`}>
          {signature}
        </p>
      )}
    </motion.div>
  );
}