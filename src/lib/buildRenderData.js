// import { getEventConfig } from "./getEventConfig";
// import { getGuestsData, getGuestById } from "./getGuestsData";
// import resolveTheme from "@/themes/resolveTheme";

// export function buildRenderData(type, slug, guestId) {
//   const eventConfig = getEventConfig(type, slug);

//   if (!eventConfig) {
//     return null;
//   }

//   // Validación de estado
//   if (eventConfig.eventMeta?.status !== "active") {
//     return null;
//   }

//   // Validación de expiración
// const expirationDate = eventConfig.eventMeta?.expirationDate;

// if (expirationDate) {
//   const today = new Date();
//   const expiration = new Date(expirationDate);

//   if (today > expiration) {
//     return null;
//   }
// }


//   const guestSystemEnabled =
//     eventConfig.eventMeta?.guestSystem?.enabled === true;

//   const guests = getGuestsData(type, slug);
//   const guestData = guestId ? getGuestById(guests, guestId) : null;

//   // Modo híbrido
//   if (guestSystemEnabled) {
//     if (!guestData) {
//       return null; // Bloquea acceso si es obligatorio
//     }
//   }

//   const guest = {
//     exists: !!guestData,
//     name: guestData?.name || null,
//     passes: guestData?.passes || null,
//     checkedIn: guestData?.checkedIn || false
//   };

//   // Solo incluye secciones habilitadas
//   function filterEnabledSections(sections) {
//   if (!sections) return {};

//   const enabledSections = {};

//   Object.keys(sections).forEach((key) => {
//     if (sections[key]?.enabled === true) {
//       enabledSections[key] = sections[key];
//     }
//   });

//   return enabledSections;
// }

// const resolvedTheme = resolveTheme(eventConfig.theme);


//   return {
//     eventMeta: eventConfig.eventMeta,
//     theme: resolvedTheme,
//     sections: filterEnabledSections(eventConfig.sections),
//     introEnvelope: eventConfig.sections?.introEnvelope || null,
//     guest
//   };
// }

// import { getEventConfig } from "./getEventConfig";
// import { getGuestsData, getGuestById } from "./getGuestsData";
// import resolveTheme from "@/themes/resolveTheme";



// export function buildRenderData(type, slug, guestId) {
//   const eventConfig = getEventConfig(type, slug);

//   if (!eventConfig) {
//     return null;
//   }

//   // Validación de estado
//   if (eventConfig.eventMeta?.status !== "active") {
//     return null;
//   }

//   // Validación de expiración
//   const expirationDate = eventConfig.eventMeta?.expirationDate;

//   if (expirationDate) {
//     const today = new Date();
//     const expiration = new Date(expirationDate);

//     if (today > expiration) {
//       return null;
//     }
//   }

//   const guestSystemEnabled =
//     eventConfig.eventMeta?.guestSystem?.enabled === true;

//   const guests = getGuestsData(type, slug);
//   const guestData = guestId ? getGuestById(guests, guestId) : null;

//   // Modo híbrido
//   if (guestSystemEnabled) {
//     if (!guestData) {
//       return null; // Bloquea acceso si es obligatorio
//     }
//   }

//   const guest = {
//     exists: !!guestData,
//     name: guestData?.name || null,
//     passes: guestData?.passes || null,
//     checkedIn: guestData?.checkedIn || false
//   };

//   // Filtrar solo secciones habilitadas
//   function filterEnabledSections(sections) {
//     if (!sections) return {};

//     const enabledSections = {};

//     Object.keys(sections).forEach((key) => {
//       if (sections[key]?.enabled === true) {
//         enabledSections[key] = sections[key];
//       }
//     });

//     return enabledSections;
//   }

//   const resolvedTheme = resolveTheme(eventConfig.theme);

//   const filteredSections = filterEnabledSections(eventConfig.sections);

//   // Asegurar que overlays no estén duplicados dentro de sections
//   if (filteredSections?.introEnvelope) {
//     delete filteredSections.introEnvelope;
//   }

  
//   return {
//     eventMeta: eventConfig.eventMeta,
//     theme: resolvedTheme,
//     settings: eventConfig.settings,
//     sections: filteredSections,
//     overlays: eventConfig.overlays || {},
//     guest
//   };
// }

import { getEventConfig } from "./getEventConfig";
import { getGuestsData, getGuestById } from "./getGuestsData";
import resolveTheme from "@/themes/resolveTheme";

export function buildRenderData(type, slug, guestId) {
  console.log("buildRenderData params:", { type, slug, guestId });

  const eventConfig = getEventConfig(type, slug);

  console.log("eventConfig eventMeta:", eventConfig?.eventMeta);

  if (!eventConfig) {
    console.log("ERROR: eventConfig no encontrado o JSON inválido");
    return null;
  }

  if (eventConfig.eventMeta?.status !== "active") {
    console.log("ERROR: status no activo:", eventConfig.eventMeta?.status);
    return null;
  }

  const expirationDate = eventConfig.eventMeta?.expirationDate;

  if (expirationDate) {
    const today = new Date();
    const expiration = new Date(expirationDate);

    console.log("expiration check:", {
      today: today.toISOString(),
      expiration: expiration.toISOString()
    });

    if (today > expiration) {
      console.log("ERROR: evento expirado");
      return null;
    }
  }

  const guestSystemEnabled =
    eventConfig.eventMeta?.guestSystem?.enabled === true;

  const guests = getGuestsData(type, slug);
  const guestData = guestId ? getGuestById(guests, guestId) : null;

  console.log("guest check:", {
    guestSystemEnabled,
    guestId,
    guestsCount: guests.length,
    guestData
  });

  if (guestSystemEnabled) {
    if (!guestData) {
      console.log("ERROR: invitado no encontrado y guestSystem activo");
      return null;
    }
  }

  const guest = {
    exists: !!guestData,
    name: guestData?.name || null,
    passes: guestData?.passes || null,
    checkedIn: guestData?.checkedIn || false
  };

  function filterEnabledSections(sections) {
    if (!sections) return {};

    const enabledSections = {};

    Object.keys(sections).forEach((key) => {
      if (sections[key]?.enabled === true) {
        enabledSections[key] = sections[key];
      }
    });

    return enabledSections;
  }

  const resolvedTheme = resolveTheme(eventConfig.theme);
  const filteredSections = filterEnabledSections(eventConfig.sections);

  if (filteredSections?.introEnvelope) {
    delete filteredSections.introEnvelope;
  }

  console.log("renderData OK:", {
    themeBase: eventConfig.theme?.base,
    enabledSections: Object.keys(filteredSections),
    overlays: Object.keys(eventConfig.overlays || {})
  });

  return {
    eventMeta: eventConfig.eventMeta,
    theme: resolvedTheme,
    settings: eventConfig.settings,
    sections: filteredSections,
    overlays: eventConfig.overlays || {},
    guest
  };
}