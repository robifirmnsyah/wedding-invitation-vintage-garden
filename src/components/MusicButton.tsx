"use client";

import { useEffect, useRef, useState } from "react";
import { HiMiniMusicalNote, HiOutlineSpeakerXMark } from "react-icons/hi2";

interface Props {
  src: string;
  /** play is triggered once the invitation cover is opened */
  active: boolean;
}

/** Floating top-corner music toggle. Autoplays after `active` becomes true. */
export function MusicButton({ src, active }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio.loop = true;

    if (active) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [active]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  if (!active) return <audio ref={audioRef} src={src} preload="none" />;

  return (
    <>
      <audio ref={audioRef} src={src} preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? "Jeda musik" : "Putar musik"}
        aria-pressed={playing}
        className="btn-icon fixed right-4 top-4 z-50 shadow-paper"
        style={{
          top: "max(1rem, env(safe-area-inset-top))",
          right: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        {playing ? (
          <HiMiniMusicalNote className="music-note-playing text-xl" />
        ) : (
          <HiOutlineSpeakerXMark className="text-xl" />
        )}
      </button>
    </>
  );
}
