// "use client";

// import { useState } from "react";
// import IntroEnvelope from "@/components/overlays/IntroEnvelope/IntroEnvelope";
// import SectionsRenderer from "@/components/layout/SectionsRenderer";
// import PetalsEffect from "@/components/effects/PetalsEffect";

// export default function EventClientWrapper({ renderData }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const introSection = renderData?.overlays?.introEnvelope;
//   const introEnabled = introSection?.enabled;

//   return (
//     <>
//       {introEnabled && (
//         <IntroEnvelope
//           config={introSection?.config}
//           variant={introSection?.variant}
//           guest={renderData.guest}
//           isOpen={isOpen}
//           onOpen={() => setIsOpen(true)}
//         />
//       )}

//       {(!introEnabled || isOpen) && (
//         <SectionsRenderer renderData={renderData} />
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import IntroEnvelope from "@/components/overlays/IntroEnvelope/IntroEnvelope";
import SectionsRenderer from "@/components/layout/SectionsRenderer";
import PetalsEffect from "@/components/effects/PetalsEffect";
import BackgroundMusicPlayer from "@/components/effects/BackgroundMusicPlayer/BackgroundMusicPlayer";

export default function EventClientWrapper({ renderData }) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(renderData.settings);

  const introSection = renderData?.overlays?.introEnvelope;
  const introEnabled = introSection?.enabled;

  const petalsEnabled =
    renderData?.eventMeta?.effects?.petalsRain?.enabled;

  const musicSettings = renderData?.settings ?? {};

  return (
    <>
      {introEnabled && (
        <IntroEnvelope
          config={introSection?.config}
          variant={introSection?.variant}
          guest={renderData.guest}
          theme={renderData.theme}
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
        />
      )}

      {(!introEnabled || isOpen) && (
        <>
          {/* 🌸 Petals Effect detrás del contenido */}
          {petalsEnabled && <PetalsEffect />}

           {/* 🎵 Música de fondo */}
          <BackgroundMusicPlayer
            settings={musicSettings}
            start={isOpen || !introEnabled}
            theme={renderData.theme}
          />

          <SectionsRenderer renderData={renderData} />
        </>
      )}
    </>
  );
}