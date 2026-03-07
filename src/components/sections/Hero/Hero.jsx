


"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";


export default function Hero({
  config = {},
  variant = "centered",
  theme,
  styles = {},
}) {
  const { names, date, city, ctaText } = config;
  const { colors, fonts } = theme;
  const mobileImage = styles?.backgroundImageMobile;

  const shouldReduceMotion = useReducedMotion();

  // Motion control (no cambia estructura, solo comportamiento)
  const containerMotionProps = shouldReduceMotion
    ? { initial: false, animate: false }
    : { variants: staggerContainer, initial: "hidden", animate: "visible" };

  const itemMotionProps = shouldReduceMotion ? {} : { variants: fadeUp };

  const layoutVariants = {
    centered:
      "flex flex-col min-h-screen md:min-h-screen md:justify-end text-center",

    "split-left":
      "flex flex-col text-center lg:text-left pt-0 pb-5 md:pt-10 md:pb-10  lg:pt-50 lg:pb-82",

    "split-right":
      "flex flex-col min-h-screen md:min-h-[85vh] md:justify-end text-center",

    minimal:
      "flex flex-col min-h-screen md:min-h-screen md:justify-end text-center",

    framed:
      "flex flex-col min-h-screen md:min-h-screen md:justify-end text-center",
  };

  const layoutClass = layoutVariants[variant] || layoutVariants.centered;

  const innerContainer =
    variant === "framed"
      ? "bg-white/80 backdrop-blur-md px-10 py-5 rounded-2xl shadow-xl max-w-2xl mx-auto"
      : variant === "split-left"
        ? "max-w-3xl md:ml-24"
        : "max-w-3xl mx-auto";

  return (
    <section className={layoutClass}>
      {/* IMAGEN MOBILE FLEXIBLE */}
      {mobileImage && (
        <div className="relative w-full  lg:hidden">
          <img
            src={mobileImage}
            alt=""
            className="w-full min-h-[60vh] max-h-[80vh]  object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-4 md:h-1 bg-gradient-to-b from-transparent via-[#F5F1EE]/70 to-[#F5F1EE]" />
        </div>
      )}

      {/* CONTENIDO */}
      <motion.div
        className="flex flex-col  px-6 py-10 md:py-18 lg:py-0"
        {...containerMotionProps}
      >
        <div className={innerContainer}>
          {names && (
            <motion.h1
              className={`typo-h1 ${fonts.accent} ${colors.primary} mb-8 md:mb-10`}
              {...itemMotionProps}
            >
              {names}
            </motion.h1>
          )}

          <motion.div
            className="flex justify-center lg:justify-start my-4"
            {...itemMotionProps}
          >
            <svg
              width="120"
              height="20"
              viewBox="0 0 120 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${colors.secondary}`}
            >
              <path
                d="M10 10 Q30 0 60 10 T110 10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </motion.div>

          {date && (
            <motion.p
              className={`typo-body ${fonts.body} ${colors.dark} opacity-90 mb-4`}
              {...itemMotionProps}
            >
              {date}
            </motion.p>
          )}

          <motion.div
            className={`w-20 md:w-40 h-px mx-auto my-6 ${colors.secondary} bg-current`}
            {...itemMotionProps}
          />

          {city && (
            <motion.p
              className={`typo-h3 ${fonts.accent} ${colors.secondary} font-semibold mt-2 mb-12`}
              {...itemMotionProps}
            >
              {city}
            </motion.p>
          )}

          {ctaText && (
            <motion.a
              href="#finalCTA"
              className={`typo-button px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 ${colors.buttonPrimary}`}
              {...itemMotionProps}
            >
              {ctaText}
            </motion.a>
          )}

          <motion.div
            className="mt-10 md:mt-10 block lg:hidden"
            {...itemMotionProps}
          >
            <img
              src="/images/flores-hero2.png"
              alt=""
              className="w-full max-w-[320px] mx-auto h-auto opacity-90"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}