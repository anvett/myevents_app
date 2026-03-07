// "use client";

// import { motion, useReducedMotion } from "framer-motion";
// import { fadeUp } from "@/lib/motion";
// import { MapPin, Clock } from "lucide-react";

// export default function Reception({ config = {}, theme }) {
//   const { place, address, time, mapsLink } = config;
//   const { fonts, colors } = theme;

//   const shouldReduceMotion = useReducedMotion();
//   const motionProps = shouldReduceMotion ? {} : { variants: fadeUp };

//   return (
//     <motion.div
//       className="max-w-3xl mx-auto px-6"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.3 }}
//       {...motionProps}
//     >
//       <div
//         className="
//         bg-white/70
//         backdrop-blur-sm
//         rounded-3xl
//         shadow-lg
//         border-white/30
//         px-8 py-10
//         md:px-12 md:py-12
//         text-left
//       "
//       >
//         {/* Title */}
//         <h2
//           className={`typo-h1 ${fonts.accent} ${colors.primary} text-center mb-6`}
//         >
//           Recepción
//         </h2>

//         <div className="h-px bg-[#E8DDD6] mb-8" />

//         <div className="space-y-6">
//           {/* Lugar */}
//           <div className="flex items-start gap-4">
//             <MapPin className={`w-6 h-6 ${colors.primary}`} />
//             <p className={`typo-body ${fonts.body}`}>
//               <span className="font-semibold">Lugar:</span> {place}
              
//             </p>
//             <p className={`typo-body ${fonts.body}`}>
              
//               <span className="font-semibold">Lugar:</span> {address}
//             </p>
//           </div>

//           <div className="h-px bg-[#EFE7E2]" />

//           {/* Descripción */}
//           <div className="flex items-start gap-4">
//             <Clock className={`w-6 h-6 ${colors.primary}`} />
//             <p className={`typo-body ${fonts.body}`}>
//               Celebración posterior a la ceremonia
//             </p>
//           </div>
//         </div>

//         {mapsLink && (
//           <div className="flex justify-center mt-10">
//             <a
//               href={mapsLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`typo-button px-8 py-3 rounded-full ${colors.buttonPrimary}`}
//             >
//               Ver ubicación
//             </a>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }


"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { MapPin, Clock } from "lucide-react";

export default function Reception({ config = {}, theme }) {
  const { place, address, time, mapsLink } = config;
  const { fonts, colors } = theme;

  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion ? {} : { variants: fadeUp };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      {...motionProps}
    >
      <div
        className="
        bg-white/70
        backdrop-blur-sm
        rounded-3xl
        shadow-lg
        border-white/30
        px-8 py-10
        md:px-12 md:py-12
        text-left
      "
      >
        {/* Title */}
        <h2
          className={`typo-h1 ${fonts.accent} ${colors.primary} text-center mb-6`}
        >
          Recepción
        </h2>

        <div className="h-px bg-[#E8DDD6] mb-8" />

        <div className="space-y-6">

          {/* Lugar */}
          <div className="flex items-start gap-4">
            <MapPin className={`w-6 h-6 ${colors.primary}`} />
            <div>
              {place && (
                <p className={`typo-body ${fonts.body}`}>
                  <span className="font-semibold">Lugar:</span> {place}
                </p>
              )}
              {address && (
                <p className={`typo-body ${fonts.body}`}>
                  <span className="font-semibold">Dirección:</span> {address}
                </p>
              )}
            </div>
          </div>

          <div className="h-px bg-[#EFE7E2]" />

          {/* Hora */}
          {time && (
            <div className="flex items-start gap-4">
              <Clock className={`w-6 h-6 ${colors.primary}`} />
              <p className={`typo-body ${fonts.body}`}>
                <span className="font-semibold">Hora:</span> {time}
              </p>
            </div>
          )}

        </div>

        {mapsLink && (
          <div className="flex justify-center mt-10">
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`typo-button px-8 py-3 rounded-full ${colors.buttonPrimary}`}
            >
              Ver ubicación
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}