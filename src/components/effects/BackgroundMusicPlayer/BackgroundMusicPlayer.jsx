"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

export default function BackgroundMusicPlayer({ settings, start, theme }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const music = settings?.backgroundMusic;

  const { colors } = theme || {};

  useEffect(() => {
    if (!music?.enabled) return;
    if (!start) return;

    const audio = audioRef.current;

    if (audio) {
      audio.volume = music.volume ?? 0.3;

      if (music.autoplay) {
        audio
          .play()
          .then(() => {
            setPlaying(true);
          })
          .catch(() => {
            // autoplay puede bloquearse en algunos navegadores
          });
      }
    }
  }, [start, music]);

  if (!music?.enabled) return null;

  return (
    <>
      <audio ref={audioRef} src={music.src} loop={music.loop} />

      {music.showControl && (
        <button
          onClick={() => {
            const audio = audioRef.current;
            if (!audio) return;

            if (playing) {
              audio.pause();
              setPlaying(false);
            } else {
              audio.play();
              setPlaying(true);
            }
          }}
          className={`
                fixed
                bottom-6
                right-6
                z-50
                w-12
                h-12
                flex
                items-center
                justify-center
                rounded-full
                shadow-lg
                transition-all
                duration-300
                hover:scale-110
                ${colors?.buttonPrimary}
            `}
        >
          {playing ? <Pause size={18} /> : <Music size={18} />}
        </button>
      )}
    </>
  );
}
