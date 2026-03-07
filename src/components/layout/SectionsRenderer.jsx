"use client";

import { sectionRegistry } from "@/components/sections/sectionRegistry";
import SectionWrapper from "@/components/layout/SectionWrapper";

export default function SectionsRenderer({ renderData }) {
  if (!renderData?.sections) return null;

  const entries = Object.entries(renderData.sections);

  return (
    <>
      <div className="relative z-20">
        {entries.map(([type, config]) => {
          // Excluir introEnvelope (es overlay)
          if (type === "introEnvelope") return null;

          const SectionComponent = sectionRegistry[type];

          // Si no existe componente registrado, ignorar silenciosamente
          if (!SectionComponent) return null;

          return (
            <SectionWrapper
              key={type}
              styles={config?.styles}
              theme={renderData.theme}
              noSpacing={type === "hero"}
            >
              <SectionComponent
                config={config?.config}
                variant={config?.variant}
                guest={renderData.guest}
                theme={renderData.theme}
                styles={config?.styles}
              />
            </SectionWrapper>
          );
        })}
      </div>
    </>
  );
}
