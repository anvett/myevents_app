// "use client";

// import { useEffect, useState } from "react";
// import { motion, useReducedMotion } from "framer-motion";
// import { fadeUp } from "@/lib/motion";

// export default function Countdown({ config = {}, theme }) {
//   const { dateTime } = config;
//   const { fonts, colors } = theme;

//   const shouldReduceMotion = useReducedMotion();
//   const motionProps = shouldReduceMotion ? {} : { variants: fadeUp };

//   const calculateTimeLeft = () => {
//     const difference = new Date(dateTime) - new Date();
//     if (difference <= 0) return null;

//     return {
//       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((difference / 1000 / 60) % 60),
//       seconds: Math.floor((difference / 1000) % 60),
//     };
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   if (!timeLeft) return null;

//   return (
//     <motion.div
//       className="max-w-6xl mx-auto px-6 text-center"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.3 }}
//       {...motionProps}
//     >
//       {/* Título */}
//       <h2 className={`typo-h1 ${fonts.accent} ${colors.primary} mb-6`}>
//         Faltan tan solo unos días
//       </h2>

//       <p className={`typo-body ${fonts.body} ${colors.primary} mb-10`}>
//         para celebrar nuestro gran día
//       </p>

//       {/* Card */}
//       <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-8 md:px-12 md:py-10 border border-white/30">
//         <div className="grid grid-cols-4 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#A04C3A]/20">
//           {[
//             { label: "Días", value: timeLeft.days },
//             { label: "Horas", value: timeLeft.hours },
//             { label: "Minutos", value: timeLeft.minutes },
//             { label: "Segundos", value: timeLeft.seconds },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center justify-center py-6 md:py-8"
//             >
//               <span className={`typo-h1 ${fonts.heading} ${colors.primary}`}>
//                 {item.value}
//               </span>

//               <span className={`typo-body-sm ${fonts.body} ${colors.accent} mt-2`}>
//                 {item.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function Countdown({ config = {}, theme }) {
  const { dateTime, textStyles, textSizes, content } = config;
  const { fonts, colors } = theme;

  const titleColor = colors?.[textStyles?.title] || colors?.primary;
  const subtitleColor = colors?.[textStyles?.subtitle] || colors?.primary;
  const numbersColor = colors?.[textStyles?.numbers] || colors?.primary;
  const labelsColor = colors?.[textStyles?.labels] || colors?.accent;
  const dividerColor = colors?.[textStyles?.divider] || colors?.accent;

  const titleSize = textSizes?.title || "typo-h1";
  const subtitleSize = textSizes?.subtitle || "typo-body";
  const numbersSize = textSizes?.numbers || "typo-h1";
  const labelsSize = textSizes?.labels || "typo-body-sm";

  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion ? {} : { variants: fadeUp };

  const calculateTimeLeft = () => {
    const difference = new Date(dateTime) - new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [dateTime]);

  if (!timeLeft) return null;

  const items = [
    { label: content?.labels?.days || "Días", value: timeLeft.days },
    { label: content?.labels?.hours || "Horas", value: timeLeft.hours },
    { label: content?.labels?.minutes || "Minutos", value: timeLeft.minutes },
    { label: content?.labels?.seconds || "Segundos", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      {...motionProps}
    >
      {content?.title && (
        <h2 className={`${titleSize} ${fonts.accent} ${titleColor} mb-6`}>
          {content.title}
        </h2>
      )}

      {content?.subtitle && (
        <p className={`${subtitleSize} font-bold ${fonts.body} ${subtitleColor} mb-10`}>
          {content.subtitle}
        </p>
      )}

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-8 md:px-12 md:py-10 border border-white/30">
        <div
          className={`grid grid-cols-4 divide-x ${dividerColor} divide-current`}
        >
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center py-6 md:py-8"
            >
              <span className={`${numbersSize} ${fonts.heading} ${numbersColor}`}>
                {item.value}
              </span>

              <span
                className={`${labelsSize} ${fonts.body} ${labelsColor} mt-2`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
