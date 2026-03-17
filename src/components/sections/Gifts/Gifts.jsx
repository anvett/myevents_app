

// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import { createPortal } from "react-dom";
// import { Gift, Landmark, X } from "lucide-react";

// export default function Gifts({ config = {}, theme }) {
//   const { type, bankTransfer = {} } = config;
//   const { fonts, colors } = theme;

//   const [activeModal, setActiveModal] = useState(null);
//   const [mounted, setMounted] = useState(false);

//   // NUEVO ESTADO UX
//   const [copied, setCopied] = useState(null);

//   const shouldReduceMotion = useReducedMotion();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // bloquear scroll cuando el modal está abierto
//   useEffect(() => {
//     if (activeModal) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [activeModal]);

//   const copyAccount = () => {
//     if (bankTransfer.accountNumber) {
//       navigator.clipboard.writeText(bankTransfer.accountNumber);
//       setCopied("account");

//       setTimeout(() => {
//         setCopied(null);
//       }, 1500);
//     }
//   };

//   const copyId = () => {
//     if (bankTransfer.id) {
//       navigator.clipboard.writeText(bankTransfer.id);
//       setCopied("id");

//       setTimeout(() => {
//         setCopied(null);
//       }, 1500);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-6">
//       {/* TÍTULO */}

//       <div className="text-center mb-16">
//         <h2 className={`typo-h1 ${fonts.accent} ${colors.primary} mb-6`}>
//           Mesa de Regalos
//         </h2>

//         <div className="flex items-center justify-center gap-4">
//           <span className="h-px w-20 bg-current opacity-40"></span>
//           <span className="text-xl opacity-60">✦</span>
//           <span className="h-px w-20 bg-current opacity-40"></span>
//         </div>
//       </div>

//       {/* OPCIONES */}

//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 gap-10"
//         initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
//         whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.3 }}
//         transition={{ duration: 0.6 }}
//       >
//         {/* LLUVIA DE SOBRES */}

//         <button
//           onClick={() => setActiveModal("envelope")}
//           className="cursor-pointer p-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm flex flex-col items-center gap-4"
//         >
//           <Gift className={`w-8 h-8 ${colors.primary}`} />

//           <span className={`typo-h3 ${fonts.accent} ${colors.primary}`}>
//             {type}
//           </span>
//         </button>

//         {/* TRANSFERENCIA */}

//         {bankTransfer.enabled && (
//           <button
//             onClick={() => setActiveModal("bank")}
//             className="cursor-pointer p-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm flex flex-col items-center gap-4"
//           >
//             <Landmark className={`w-8 h-8 ${colors.primary}`} />

//             <span className={`typo-h3 ${fonts.accent} ${colors.primary}`}>
//               Transferencia bancaria
//             </span>
//           </button>
//         )}
//       </motion.div>

//       {/* ================= MODAL ================= */}

//       {mounted &&
//         createPortal(
//           <AnimatePresence>
//             {activeModal && (
//               <motion.div
//                 className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] px-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setActiveModal(null)}
//               >
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95, y: 20 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95, y: 20 }}
//                   transition={{ duration: 0.35, ease: "easeOut" }}
//                   className="bg-white rounded-2xl max-w-md w-full p-10 relative text-center shadow-xl"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {/* BOTÓN X */}

//                   <button
//                     onClick={() => setActiveModal(null)}
//                     className="cursor-pointer absolute top-4 right-4"
//                   >
//                     <X className="w-5 h-5 text-gray-600" />
//                   </button>

//                   {/* MODAL LLUVIA DE SOBRES */}

//                   {activeModal === "envelope" && (
//                     <>
//                       <h3
//                         className={`typo-h2 ${fonts.accent} ${colors.primary} mb-6`}
//                       >
//                         Lluvia de sobres
//                       </h3>

//                       <p className={`typo-body ${fonts.body}  ${colors.dark}`}>
//                         Lo más importante para nosotros es compartir este día contigo, pero si deseas
//                         tener un detalle con nosotros, agradecemos que dejes tu
//                         sobre en el ánfora.
//                       </p>
//                     </>
//                   )}

//                   {/* MODAL TRANSFERENCIA */}

//                   {activeModal === "bank" && (
//                     <>
//                       <h3
//                         className={`typo-h2 ${fonts.accent} ${colors.primary} mb-8`}
//                       >
//                         Transferencia bancaria
//                       </h3>

//                       {bankTransfer.message && (
//                         <p
//                           className={`typo-body ${fonts.body} ${colors.dark} mb-8`}
//                         >
//                           {bankTransfer.message}
//                         </p>
//                       )}

//                       <div
//                         className={`typo-body ${fonts.body} space-y-6 text-left`}
//                       >
//                         <p
//                           className={`typo-body ${fonts.body}  ${colors.dark}`}
//                         >
//                           <strong>Banco:</strong> {bankTransfer.bank}
//                         </p>

//                         <p
//                           className={`typo-body ${fonts.body}  ${colors.dark}`}
//                         >
//                           <strong>Tipo de cuenta:</strong> {bankTransfer.type}
//                         </p>

//                         <p
//                           className={`typo-body ${fonts.body}  ${colors.dark}`}
//                         >
//                           <strong>Titular:</strong> {bankTransfer.name}
//                         </p>

//                         {/* CUENTA */}

//                         <div>
//                           <p
//                             className={`typo-body ${fonts.body}  ${colors.dark} mb-2`}
//                           >
//                             <strong>Cuenta:</strong>{" "}
//                             {bankTransfer.accountNumber}
//                           </p>

//                           <button
//                             onClick={copyAccount}
//                             className={`cursor-pointer px-6 py-2 rounded-lg border ${colors.primary}`}
//                           >
//                             Copiar número de cuenta
//                           </button>

//                           {/* MENSAJE UX */}

//                           <AnimatePresence>
//                             {copied === "account" && (
//                               <motion.p
//                                 initial={{ opacity: 0, y: 6 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0 }}
//                                 className={`typo-body ${fonts.body} ${colors.primary} mt-2`}
//                               >
//                                 Cuenta copiada ✓
//                               </motion.p>
//                             )}
//                           </AnimatePresence>
//                         </div>

//                         {/* IDENTIFICACIÓN */}

//                         <div>
//                           <p
//                             className={`typo-body ${fonts.body}  ${colors.dark} mb-2`}
//                           >
//                             <strong>Identificación:</strong> {bankTransfer.id}
//                           </p>

//                           <button
//                             onClick={copyId}
//                             className={`cursor-pointer px-6 py-2 rounded-lg border ${colors.primary}`}
//                           >
//                             Copiar número de identificación
//                           </button>

//                           {/* MENSAJE UX */}

//                           <AnimatePresence>
//                             {copied === "id" && (
//                               <motion.p
//                                 initial={{ opacity: 0, y: 6 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0 }}
//                                 className={`typo-body ${fonts.body} ${colors.primary} mt-2`}
//                               >
//                                 Identificación copiada ✓
//                               </motion.p>
//                             )}
//                           </AnimatePresence>
//                         </div>

//                         {bankTransfer.email && (
//                           <p>
//                             <strong>Email:</strong> {bankTransfer.email}
//                           </p>
//                         )}
//                       </div>
//                     </>
//                   )}

//                   {/* BOTÓN CERRAR */}

//                   <div className="mt-10 flex justify-center">
//                     <button
//                       onClick={() => setActiveModal(null)}
//                       className={`cursor-pointer px-8 py-2 rounded-lg border ${colors.primary}`}
//                     >
//                       Cerrar
//                     </button>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>,
//           document.body,
//         )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Gift, Landmark } from "lucide-react";
import ModalBase from "@/components/ui/Modal/ModalBase";

export default function Gifts({ config = {}, theme }) {

  const { type, bankTransfer = {} } = config;
  const { fonts, colors } = theme;

  const [activeModal, setActiveModal] = useState(null);
  const [copied, setCopied] = useState(null);

  const shouldReduceMotion = useReducedMotion();

  const copyAccount = () => {
    if (bankTransfer.accountNumber) {
      navigator.clipboard.writeText(bankTransfer.accountNumber);
      setCopied("account");

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    }
  };

  const copyId = () => {
    if (bankTransfer.id) {
      navigator.clipboard.writeText(bankTransfer.id);
      setCopied("id");

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6">

      {/* TÍTULO */}

      <div className="text-center mb-16">
        <h2 className={`typo-h1 ${fonts.accent} ${colors.primary} mb-6`}>
          Mesa de Regalos
        </h2>

        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-20 bg-current opacity-40"></span>
          <span className="text-xl opacity-60">✦</span>
          <span className="h-px w-20 bg-current opacity-40"></span>
        </div>
      </div>

      {/* OPCIONES */}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >

        {/* LLUVIA DE SOBRES */}

        <button
          onClick={() => setActiveModal("envelope")}
          className="cursor-pointer p-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm flex flex-col items-center gap-4"
        >
          <Gift className={`w-8 h-8 ${colors.primary}`} />

          <span className={`typo-h2 ${fonts.accent} ${colors.primary}`}>
            {type}
          </span>
        </button>

        {/* TRANSFERENCIA */}

        {bankTransfer.enabled && (
          <button
            onClick={() => setActiveModal("bank")}
            className="cursor-pointer p-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm flex flex-col items-center gap-4"
          >
            <Landmark className={`w-8 h-8 ${colors.primary}`} />

            <span className={`typo-h2 ${fonts.accent} ${colors.primary}`}>
              Transferencia bancaria
            </span>
          </button>
        )}

      </motion.div>

      {/* ================= MODAL LLUVIA DE SOBRES ================= */}

      <ModalBase
        open={activeModal === "envelope"}
        onClose={() => setActiveModal(null)}
        colors={colors}
      >

        <h3 className={`typo-h2 ${fonts.accent} ${colors.primary} mb-6`}>
          Lluvia de sobres
        </h3>

        <p className={`typo-body ${fonts.body} ${colors.dark}`}>
          Tu presencia es nuestro mayor regalo, pero si deseas
          tener un detalle con nosotros, agradecemos que deposites tu sobre en el baúl.
        </p>

      </ModalBase>

      {/* ================= MODAL TRANSFERENCIA ================= */}

      <ModalBase
        open={activeModal === "bank"}
        onClose={() => setActiveModal(null)}
        colors={colors}
      >

        <h3 className={`typo-h2 ${fonts.accent} ${colors.primary} mb-6`}>
          Transferencia bancaria
        </h3>

        {bankTransfer.message && (
          <p className={`typo-body ${fonts.body} ${colors.dark} mb-8`}>
            {bankTransfer.message}
          </p>
        )}

        <div className={`typo-body ${fonts.body} space-y-6 text-left`}>

          <p className={`typo-body ${fonts.body} ${colors.dark}`}>
            <strong>Banco:</strong> {bankTransfer.bank}
          </p>

          <p className={`typo-body ${fonts.body} ${colors.dark}`}>
            <strong>Tipo de cuenta:</strong> {bankTransfer.type}
          </p>

          <p className={`typo-body ${fonts.body} ${colors.dark}`}>
            <strong>Titular:</strong> {bankTransfer.name}
          </p>

          {/* CUENTA */}

          <div>
            <p className={`typo-body ${fonts.body} ${colors.dark} mb-2`}>
              <strong>Cuenta:</strong> {bankTransfer.accountNumber}
            </p>

            <button
              onClick={copyAccount}
              className={`cursor-pointer px-6 py-2 rounded-full border ${colors.buttonPrimary}`}
            >
              Copiar número de cuenta
            </button>

            <AnimatePresence>
              {copied === "account" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`typo-body ${fonts.body} ${colors.primary} mt-2`}
                >
                  Cuenta copiada ✓
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* IDENTIFICACIÓN */}

          <div>
            <p className={`typo-body ${fonts.body} ${colors.dark} mb-2`}>
              <strong>Identificación:</strong> {bankTransfer.id}
            </p>

            <button
              onClick={copyId}
              className={`cursor-pointer px-6 py-2 rounded-full border ${colors.buttonPrimary}`}
            >
              Copiar número de identificación
            </button>

            <AnimatePresence>
              {copied === "id" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`typo-body ${fonts.body} ${colors.primary} mt-2`}
                >
                  Identificación copiada ✓
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {bankTransfer.email && (
            <p>
              <strong>Email:</strong> {bankTransfer.email}
            </p>
          )}
          

        </div>

      </ModalBase>

    </div>
  );
}