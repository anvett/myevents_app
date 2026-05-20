// src/themes/presets/kids-party.js
// Aplicar CONTRATO INVITLYAPP v1.0. Sin cambios estructurales. Solo ajustes compatibles.

export const kidsPartyTheme = {
  colors: {
    primary: "text-[#005BBB]",
    secondary: "text-[#FFD500]",
    accent: "text-[#F51B1B]",
    light: "text-white",
    dark: "text-[#063B75]",
    buttonPrimary: "bg-[#F51B1B] text-white hover:bg-[#004A99]",
    gradientPrimary:
      "bg-gradient-to-r from-[#005BBB] via-[#00BDEB] to-[#FFD500]",
    gradientSoft: "bg-gradient-to-b from-white/70 via-white/35 to-transparent",
    gradientParty:
      "bg-gradient-to-br from-[#FFD500]/80 via-[#F51B1B]/45 to-[#005BBB]/70",
  },

  fonts: {
    accent: "font-kids-accent",
    heading: "font-kids-heading",
    body: "font-kids-body",
  },

  surfaces: {
    base: {
      background: "bg-[#EAFBFF]",
      text: "text-[#063B75]",
    },

    hero: {
      background: "bg-gradient-to-b from-[#EAFBFF] via-white to-[#FFF4B8]",
      text: "text-[#063B75]",
    },

    card: {
      background: "bg-white",
      text: "text-[#063B75]",
    },

    subtle: {
      background: "bg-gradient-to-br from-[#EAFBFF] via-[#FFF4B8] to-white",
      text: "text-[#063B75]",
    },

    contrast: {
      background: "bg-[#005BBB]",
      text: "text-white",
    },
  },

  layout: {
    sectionSpacing: "py-14 md:py-20 lg:py-28",
  },

  effects: {
    radius: "rounded-2xl",
    shadow: "shadow-xl",
  },
};

export default kidsPartyTheme;
