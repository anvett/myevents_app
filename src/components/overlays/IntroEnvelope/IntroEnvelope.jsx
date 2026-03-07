"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function IntroEnvelope({
  config,
  guest,
  theme,
  isOpen,
  onOpen,
}) {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!config || isOpen) return null;

  const { title, showGuestName, buttonText } = config;

  const { fonts } = theme || {};

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/intro-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-xl text-white"
        >
          <p className="tracking-widest uppercase text-sm mb-6 opacity-80">
            {title}
          </p>

          {showGuestName && guest?.exists && (
            <>
              <h1 className={`text-4xl md:text-5xl mb-4 ${fonts?.accent}`}>
                {guest.name}
              </h1>

              {guest?.passes && (
                <p className="text-lg tracking-wide opacity-80 mb-8">
                  {guest.passes}{" "}
                  {guest.passes === 1 ? "pase reservado" : "pases reservados"}
                </p>
              )}
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="cursor-pointer px-10 py-3 rounded-full border border-[#C47A5A] bg-[#C47A5A] text-white hover:bg-[#B4684A]  hover:text-white transition-all duration-300"
          >
            {buttonText}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
