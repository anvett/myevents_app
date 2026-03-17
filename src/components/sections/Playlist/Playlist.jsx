"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

export default function Playlist({
  config = {},
  theme = {}
}) {

  const { spotifyLink, description } = config;

  const colors = theme?.colors || {};
  const fonts = theme?.fonts || {};

  if (!spotifyLink) return null;

  // limpiar link spotify
  const cleanLink = spotifyLink.split("?")[0];

  // generar embed
  const embedLink = cleanLink.replace(
    "open.spotify.com/playlist/",
    "open.spotify.com/embed/playlist/"
  ) + "?utm_source=generator";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="mx-auto max-w-4xl text-center">

        {/* TITULO */}

        <h2 className={`typo-h1 ${fonts?.accent || ""} ${colors?.primary || ""}`}>
          Nuestra Playlist
        </h2>

        {/* DESCRIPCION */}

        {description && (
          <p className={`mt-4 typo-body ${fonts?.body || ""}`}>
            {description}
          </p>
        )}

        {/* SPOTIFY PLAYER */}

        <div className="mt-10 px-6 w-full">

          <iframe
            src={embedLink}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          />

        </div>

        {/* BOTONES */}

        <div className="mt-8 px-8 flex flex-col sm:flex-row justify-center gap-4">

          {/* AGREGAR CANCION */}

          <a
            href={cleanLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-pointer px-6 py-3 rounded-full flex items-center justify-center gap-2 ${colors?.buttonPrimary || ""}`}
          >
            <Music size={18} />
            Agregar canción
          </a>

          {/* ABRIR EN SPOTIFY */}

          <a
            href={cleanLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-pointer px-6 py-3 rounded-full border flex items-center justify-center gap-2 ${colors?.primary || ""}`}
          >
            Abrir en Spotify
          </a>

        </div>

      </div>
    </motion.div>
  );
}

