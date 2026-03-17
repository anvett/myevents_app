"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer({ config = {}, theme = {} }) {
  const { closingText, copyright } = config;

  const colors = theme?.colors || {};
  const fonts = theme?.fonts || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto"
    >
      {/* SEPARADOR */}

      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="h-px w-16 bg-current opacity-30"></div>

        <Heart className={`w-5 h-5 ${colors?.primary || ""}`} />

        <div className="h-px w-16 bg-current opacity-30"></div>
      </div>

      {/* TEXTO FINAL */}

      {closingText && (
        <p className={`typo-body pb-8 ${fonts?.body || ""}`}>{closingText}</p>
      )}

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`cursor-pointer px-8 py-4 rounded-full inline-flex items-center gap-3 ${colors?.buttonPrimary || ""}`}
      >
        Regresar al inicio ↑
      </button>

      {/* COPYRIGHT */}

      {copyright && (
        <p className={`mt-20 typo-body ${fonts?.body || ""} opacity-60`}>
          {copyright}
        </p>
      )}
    </motion.div>
  );
}
