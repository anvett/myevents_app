// src/themes/presets/romantic.js
// Aplicar CONTRATO INVITLYAPP v1.0. Sin cambios estructurales. Solo ajustes compatibles.

export const romanticTheme = {
  colors: {
    primary: "text-[#A04C3A]", // Marrón romántico para títulos
    secondary: "text-[#C89B8A]", // Terracota suave
    accent: "text-[#B67C6A]", // Acento cálido
    buttonPrimary: "bg-[#C47A5A] text-white hover:bg-[#B4684A]",
    dark: "text-[#5A4A42]", // Marrón oscuro para texto general
  },
  fonts: {
    accent: "font-accent",
    heading: "font-heading",
    body: "font-body",
  },

  surfaces: {
    base: {
      background: "bg-[#F5F1EE]", // Fondo general crema claro
      text: "text-[#5A4A42]", // Texto marrón oscuro suave
    },

    hero: {
      background: "bg-black", // Hero usa imagen, el fondo lo controla el layout
      text: "text-white",
    },

    card: {
      background: "bg-white",
      text: "text-[#5A4A42]",
    },

    subtle: {
      background: "bg-[#DCCAC0]",
      text: "text-[#6B5A52]",
    },

    contrast: {
      background: "bg-[#9C6B5C]",
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

export default romanticTheme;
