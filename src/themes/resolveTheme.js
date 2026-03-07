import romanticTheme from "./presets/romantic";

const PRESETS = {
  romantic: romanticTheme,
};

function isFullThemeObject(theme) {
  if (!theme || typeof theme !== "object") return false;

  const hasCore =
    theme.colors &&
    theme.fonts &&
    theme.surfaces &&
    theme.layout &&
    theme.effects;

  const hasBaseSurface =
    theme.surfaces &&
    theme.surfaces.base &&
    typeof theme.surfaces.base === "object";

  return Boolean(hasCore && hasBaseSurface);
}

function getSafeFallbackTheme() {
  return romanticTheme;
}

// Merge profundo simple (controlado)
function deepMerge(base, overrides) {
  if (!overrides) return base;

  const output = { ...base };

  Object.keys(overrides).forEach((key) => {
    if (
      typeof overrides[key] === "object" &&
      !Array.isArray(overrides[key]) &&
      base[key]
    ) {
      output[key] = deepMerge(base[key], overrides[key]);
    } else {
      output[key] = overrides[key];
    }
  });

  return output;
}

export function resolveTheme(themeInput) {

  // 1️⃣ Retrocompat: theme completo
  if (isFullThemeObject(themeInput)) {
    return themeInput;
  }

  // 2️⃣ String simple
  if (typeof themeInput === "string") {
    return PRESETS[themeInput] || getSafeFallbackTheme();
  }

  // 3️⃣ preset legacy { preset: "romantic" }
  if (themeInput?.preset) {
    return PRESETS[themeInput.preset] || getSafeFallbackTheme();
  }

  // 4️⃣ NUEVO FORMATO OFICIAL { base: "romantic", overrides: {} }
  if (themeInput?.base) {
    const baseTheme =
      PRESETS[themeInput.base] || getSafeFallbackTheme();

    return deepMerge(baseTheme, themeInput.overrides);
  }

  return getSafeFallbackTheme();
}

export default resolveTheme;