"use client";

export default function SectionWrapper({
  children,
  styles = {},
  theme = {},
  noSpacing = false,
}) {
  const surfaces = theme?.surfaces || {};
  const layout = theme?.layout || {};

  const surfaceKey = styles?.surface || "base";

  const resolvedSurface = surfaces[surfaceKey] ||
    surfaces.base || {
      background: "bg-white",
      text: "text-black",
    };

  const backgroundClass = resolvedSurface.background || "bg-white";
  const textClass = resolvedSurface.text || "text-black";
  const sectionSpacing = noSpacing ? "" : layout?.sectionSpacing || "py-6";

  const desktopImage = styles?.backgroundImage;
  const mobileImage = styles?.backgroundImageMobile;

  return (
    <section
      className={`relative ${backgroundClass} ${textClass} ${sectionSpacing}`}
    >
      {/* BACKGROUND IMAGE */}
      {desktopImage && (
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
            noSpacing ? "hidden lg:block" : "block"
          }`}
          style={{ backgroundImage: `url(${desktopImage})` }}
        />
      )}

      {/* Desktop overlay */}
      {desktopImage && (
        <div
          className={`absolute inset-0 pointer-events-none ${
            styles?.overlay
              ? styles.overlay
              : "hidden lg:block bg-gradient-to-r from-[#F5F1EE]/75 via-[#F5F1EE]/5 to-transparent"
          }`}
        />
      )}

      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}