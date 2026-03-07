"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DressCode({ config, theme }) {
  const { title, description, restrictions, recommendations } = config;

  const { fonts } = theme;

  const restrictedImages = [
    "/images/dresscode/terracota.jpg",
    "/images/dresscode/vino.jpg",
    "/images/dresscode/rojo.jpg",
    "/images/dresscode/beige.jpg",
    
  ];

  return (
    <div className="max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Icon */}
        <div className={`flex justify-center mb-6 ${theme.colors.primary}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10"
          >
            <path d="M12 2c-1.66 0-3 1.34-3 3 0 .74.27 1.42.71 1.94L7 9l-2 11h14l-2-11-2.71-2.06A2.99 2.99 0 0015 5c0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2.75 6h5.5l1.5 8h-8.5l1.5-8z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className={`typo-h1 ${fonts.accent} ${theme.colors.primary} mb-4`}>
          {title}
        </h2>

        {/* Decorative line */}
        <div className="w-20 h-px bg-current  opacity-40 mx-auto mb-6" />

        {/* Description */}
        <p className={`typo-body ${fonts.body} text-lg mb-4`}>{description}</p>

        {/* Recommendations */}
        {recommendations && (
          <p className={`typo-body ${fonts.body} mb-10`}>{recommendations}</p>
        )}

        {restrictions && (
          <>
            <h3 className={`typo-h3 ${fonts.heading} ${theme.colors.primary} mb-4`}>{restrictions}</h3>

            <p className={`typo-body ${fonts.body} max-w-3xl mx-auto px-4 mb-8`}>
              Con el fin de distinguir a los protagonistas de la celebración,
              solicitamos a nuestros invitados evitar los colores terracota,
              vino y rojo en vestidos, así como el beige en trajes de caballero,
              ya que son los tonos elegidos para los novios y sus damas.
            </p>
          </>
        )}

        {/* Restricted Colors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2">
          {restrictedImages.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-xl">
              <img
                src={src}
                alt="Color no permitido"
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
