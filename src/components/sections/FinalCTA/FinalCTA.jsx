

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ModalBase from "@/components/ui/Modal/ModalBase";

export default function FinalCTA({ config = {}, theme = {}, guest = {} }) {
  const { text, whatsappNumber, message } = config;

  const colors = theme?.colors || {};
  const fonts = theme?.fonts || {};

  const guestName = guest?.name || "";
  const guestId = guest?.id || "";

  const [open, setOpen] = useState(false);
  const [companions, setCompanions] = useState(0);

  if (!whatsappNumber) return null;

  const totalPeople = companions + 1;

  const finalMessage = `
${message || ""}
Soy ${guestName}.
Acompañantes: ${companions}.
Total asistentes: ${totalPeople}.

`;

  const encodedMessage = encodeURIComponent(finalMessage);

  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`;

  return (
    <>
      <motion.div
        id="finalCTA"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* TITULO */}

        {text && (
          <h2
            className={`typo-h1 ${fonts?.accent || ""} ${colors?.primary || ""}`}
          >
            {text}
          </h2>
        )}

        <p className={`mt-6 typo-body ${fonts?.body || ""}`}>
          Nos encantaría compartir este día contigo.
        </p>

        {/* BOTON */}

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className={`cursor-pointer px-8 py-4 rounded-full inline-flex items-center gap-3 ${colors?.buttonPrimary || ""}`}
          >
            <MessageCircle size={20} />
            Confirmar por WhatsApp
          </button>
        </div>
      </motion.div>

      {/* MODAL */}

      <ModalBase open={open} onClose={() => setOpen(false)} colors={colors}>
        <h3
          className={`typo-h2 ${fonts?.accent || ""} ${colors?.primary || ""}`}
        >
          Confirmar asistencia
        </h3>

        <p
          className={`mt-4 typo-body ${fonts?.body || ""} ${colors?.dark || ""}`}
        >
          ¿Cuántas personas asistirán contigo?
        </p>

        {/* CONTADOR */}

        <div className="mt-6 flex justify-center items-center gap-6">
          <button
            onClick={() => setCompanions(Math.max(0, companions - 1))}
            className={`cursor-pointer typo-body ${colors?.dark || ""}`}
          >
            -
          </button>

          <span className={`typo-body ${colors?.dark || ""}`}>
            {companions}
          </span>

          <button
            onClick={() => setCompanions(companions + 1)}
            className={`cursor-pointer typo-body ${colors?.dark || ""}`}
          >
            +
          </button>
        </div>

        {/* CONFIRMAR */}

        <div className="mt-8 flex justify-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-pointer px-8 py-3 rounded-lg ${colors?.buttonPrimary || ""}`}
          >
            Enviar confirmación
          </a>
        </div>
      </ModalBase>
    </>
  );
}
