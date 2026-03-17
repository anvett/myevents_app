"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function ModalBase({
  open = false,
  onClose,
  children,
  maxWidth = "max-w-md",
  colors = {}
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`bg-white rounded-2xl ${maxWidth} w-full p-10 relative text-center shadow-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* BOTÓN X */}

            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* CONTENIDO */}

            {children}

            {/* BOTÓN CERRAR */}

            <div className="mt-10 flex justify-center">
              <button
                onClick={onClose}
                className={`cursor-pointer px-8 py-2 rounded-full border ${colors?.buttonPrimary || "border-gray-300"}`}
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
