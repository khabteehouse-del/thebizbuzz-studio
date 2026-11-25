"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

/*
  "Hear Sophia" button for the Mizar section. Plays a short real recording of
  Sophia introducing herself. It never autoplays: it only starts when a
  visitor taps it, and tapping again stops it. The audio file loads only on
  the first tap (preload none), so it costs nothing on a phone connection.
  It sits on the empty chart of the left phone screen and pulses so it reads as a
  button, not as part of the picture. Styles: .sv in app/globals.css.
*/

export function SophiaVoice() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    return () => {
      el?.pause();
    };
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      el.currentTime = 0;
      setPlaying(false);
      return;
    }
    try {
      await el.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className="sv-wrap">
      <button
        type="button"
        className="sv"
        data-playing={playing}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Stop Sophia's voice sample" : "Hear Sophia introduce herself"}
      >
        <span className="sv-icon" aria-hidden="true">
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </span>
        <span className="sv-bars" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </span>
        <span className="sv-text">
          <span className="sv-title">{playing ? "Sophia is speaking" : "Hear Sophia"}</span>
          <span className="sv-sub">{playing ? "Tap to stop" : "Tap to listen"}</span>
        </span>
      </button>
      <audio
        ref={audioRef}
        src="/audio/sophia-intro.mp3"
        preload="none"
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
