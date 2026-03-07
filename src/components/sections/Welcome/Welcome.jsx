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
  const { fonts } = theme;

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
        <h2 className={`typo-h1 ${fonts.accent} text-[#A04C3A] mb-4`}>
          {title}
        </h2>
      )}

      {/* DIVIDER */}
      {showDivider && (
        <div className="w-20 h-px bg-current opacity-60 my-4 text-[#A04C3A]" />
      )}

      {/* MESSAGE */}
      {message && (
        <p className={`typo-body-sm ${fonts.body} leading-relaxed`}>
          {message}
        </p>
      )}

      {/* SIGNATURE */}
      {signature && signature.trim() !== "" && (
        <p className={`typo-body-xs italic text-[#A04C3A] ${fonts.heading} mt-6 `}>
          {signature}
        </p>
      )}
    </motion.div>
  );
}