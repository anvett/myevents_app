"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ModalBase from "@/components/ui/Modal/ModalBase";

const Gallery = ({ config = {}, variant = "default", theme = {} }) => {
  const shouldReduceMotion = useReducedMotion();

  const { title = "Galería", intro = "", images = [] } = config;

  const colors = theme?.colors || {};
  const fonts = theme?.fonts || {};

  const normalizedImages = useMemo(() => {
    if (!Array.isArray(images)) return [];

    return images
      .map((item, index) => {
        if (typeof item === "string") {
          return {
            src: item,
            alt: `Imagen ${index + 1}`,
          };
        }

        if (item && typeof item === "object" && item.src) {
          return {
            src: item.src,
            alt: item.alt || `Imagen ${index + 1}`,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [images]);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const isOpen = selectedIndex !== null;

  const currentImage =
    isOpen && normalizedImages[selectedIndex]
      ? normalizedImages[selectedIndex]
      : null;

  const openImage = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showPrev = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? normalizedImages.length - 1 : prev - 1;
    });
  };

  const showNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === normalizedImages.length - 1 ? 0 : prev + 1;
    });
  };

  const showPrevMobile = () => {
    setMobileIndex((prev) => {
      return prev === 0 ? normalizedImages.length - 1 : prev - 1;
    });
  };

  const showNextMobile = () => {
    setMobileIndex((prev) => {
      return prev === normalizedImages.length - 1 ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, normalizedImages.length]);

  if (!normalizedImages.length) {
    return null;
  }

  const sectionVariants = shouldReduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: "easeOut",
            staggerChildren: 0.08,
          },
        },
      };

  const itemVariants = shouldReduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: "easeOut" },
        },
      };

  const modalImageVariants = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
      };

  return (
    <>
      <motion.section
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="relative"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <h2
              className={[
                "typo-h1",
                fonts?.accent || "font-accent",
                colors?.primary || "",
              ].join(" ")}
            >
              {title}
            </h2>

            {intro ? (
              <p
                className={[
                  "typo-body mt-4",
                  fonts?.body || "font-body",
                  colors?.secondary || "",
                ].join(" ")}
              >
                {intro}
              </p>
            ) : null}
          </div>

          {/* MOBILE SLIDER */}
          <div className="sm:hidden">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.button
                    key={`${normalizedImages[mobileIndex]?.src}-${mobileIndex}`}
                    type="button"
                    onClick={() => openImage(mobileIndex)}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                    animate={
                      shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
                    }
                    exit={
                      shouldReduceMotion ? undefined : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative block w-full overflow-hidden"
                    aria-label={`Abrir imagen ${mobileIndex + 1}`}
                  >
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={normalizedImages[mobileIndex].src}
                        alt={normalizedImages[mobileIndex].alt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  </motion.button>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={showPrevMobile}
                className={`
                  absolute left-3 top-1/2 z-10 -translate-y-1/2
                  px-3 py-2 rounded-lg
                  shadow-md
                  ${colors?.buttonPrimary || ""}
                  `}
                aria-label="Imagen anterior"
              >
                ←
              </button>

              <button
                type="button"
                onClick={showNextMobile}
                className={`
                    absolute right-3 top-1/2 z-10 -translate-y-1/2
                    px-3 py-2 rounded-lg
                    shadow-md
                    ${colors?.buttonPrimary || ""}
                    `}
                aria-label="Imagen siguiente"
              >
                →
              </button>
            </div>

            <div className="mt-4 text-center">
              <span
                className={[
                  "typo-label",
                  fonts?.body || "font-body",
                  colors?.secondary || "",
                ].join(" ")}
              >
                {mobileIndex + 1} / {normalizedImages.length}
              </span>
            </div>
          </div>

          {/* GRID TABLET+ */}
          <motion.div
            variants={sectionVariants}
            className="hidden grid-cols-2 gap-4 sm:grid md:grid-cols-3 lg:grid-cols-4 sm:gap-5"
          >
            {normalizedImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                type="button"
                variants={itemVariants}
                onClick={() => openImage(index)}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                className="group relative overflow-hidden rounded-2xl text-left shadow-lg focus:outline-none"
                aria-label={`Abrir imagen ${index + 1}`}
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <ModalBase open={isOpen} onClose={closeModal} colors={colors}>
        {currentImage ? (
          <div className="flex w-full flex-col items-center">
            <div className="mb-4 flex w-full items-center justify-between gap-3">
              <span
                className={[
                  "typo-label",
                  fonts?.body || "font-body",
                  colors?.secondary || "",
                ].join(" ")}
              >
                {selectedIndex + 1} / {normalizedImages.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={showPrev}
                  className={`cursor-pointer px-4 py-2 rounded-lg ${colors?.buttonPrimary || ""}`}
                  aria-label="Imagen anterior"
                >
                  Anterior
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  className={`cursor-pointer px-4 py-2 rounded-lg ${colors?.buttonPrimary || ""}`}
                  aria-label="Imagen siguiente"
                >
                  Siguiente
                </button>
              </div>
            </div>

            <div className="relative flex w-full items-center justify-center">
              {/* <button
                type="button"
                onClick={showPrev}
                className={`
                  absolute left-0 z-10 hidden -translate-x-2
                  px-4 py-3 rounded-lg
                  shadow-md
                  ${colors?.buttonPrimary || ""}
                  md:block
                  `}
                aria-label="Imagen anterior"
              >
                ←
              </button> */}

              <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage.src}
                    initial={shouldReduceMotion ? false : "initial"}
                    animate={shouldReduceMotion ? undefined : "animate"}
                    exit={shouldReduceMotion ? undefined : "exit"}
                    variants={modalImageVariants}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative mx-auto aspect-[4/5] max-h-[78vh] w-full"
                  >
                    <Image
                      src={currentImage.src}
                      alt={currentImage.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* <button
                type="button"
                onClick={showNext}
                className={`
                  absolute right-0 z-10 hidden translate-x-2
                  px-4 py-3 rounded-lg
                  shadow-md
                  ${colors?.buttonPrimary || ""}
                  md:block
                  `}
                aria-label="Imagen siguiente"
              >
                →
              </button> */}
            </div>
          </div>
        ) : null}
      </ModalBase>
    </>
  );
};

export default Gallery;
