// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Camera } from "lucide-react";

// export default function Memories({
//   config = {},
//   theme = {}
// }) {

//   const { uploadLink, instructions } = config;

//   const colors = theme?.colors || {};
//   const fonts = theme?.fonts || {};

//   if (!uploadLink) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 25 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//       className="text-center max-w-3xl mx-auto"
//     >

//       {/* TITULO */}

//       <h2 className={`typo-h1 ${fonts?.accent || ""} ${colors?.primary || ""}`}>
//         Comparte tus recuerdos
//       </h2>

//       {/* ICONO */}

//       <div className="mt-6 flex justify-center">
//         <Camera className={`w-16 h-16 ${colors?.primary || ""}`} />
//       </div>

//       {/* TEXTO */}

//       {instructions && (
//         <p className={`mt-6 typo-body ${fonts?.body || ""}`}>
//           {instructions}
//         </p>
//       )}

//       {/* BOTON */}

//       <div className="mt-8">

//         <a
//           href={uploadLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className={`cursor-pointer px-8 py-3 rounded-lg inline-flex items-center gap-2 ${colors?.buttonPrimary || ""}`}
//         >
//           Subir fotos
//         </a>

//       </div>

//     </motion.div>
//   );
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Heart } from "lucide-react";

export default function Memories({
  config = {},
  theme = {}
}) {

  const { uploadLink, instructions } = config;

  const colors = theme?.colors || {};
  const fonts = theme?.fonts || {};

  if (!uploadLink) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto text-center"
    >

      {/* TITULO */}

      <h2 className={`typo-h1 ${fonts?.accent || ""} ${colors?.primary || ""}`}>
        Comparte tus recuerdos
      </h2>

      {/* TARJETA */}

      <div className="mt-10 rounded-2xl shadow-lg border border-gray-200 p-10">

        {/* ICONO PRINCIPAL */}

        <div className="flex justify-center">
          <Camera className={`w-16 h-16 ${colors?.primary || ""}`} />
        </div>

        {/* TEXTO */}

        {instructions && (
          <p className={`mt-6 typo-body ${fonts?.body || ""}`}>
            {instructions}
          </p>
        )}

        {/* BOTON */}

        <div className="mt-8 flex justify-center">

          <a
            href={uploadLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-pointer px-8 py-3 rounded-lg inline-flex items-center gap-2 ${colors?.buttonPrimary || ""}`}
          >
            Subir fotos
          </a>

        </div>

        {/* PASOS */}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div className="flex flex-col items-center gap-2">
            <Camera className="w-6 h-6 opacity-70" />
            <span className={`typo-body ${fonts?.body || ""}`}>
              Toma fotos
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Upload className="w-6 h-6 opacity-70" />
            <span className={`typo-body ${fonts?.body || ""}`}>
              Súbelas
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Heart className="w-6 h-6 opacity-70" />
            <span className={`typo-body ${fonts?.body || ""}`}>
              Revive el momento
            </span>
          </div>

        </div>

      </div>

    </motion.div>
  );
}