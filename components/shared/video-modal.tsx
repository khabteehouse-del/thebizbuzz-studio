"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export type SampleVideo = {
  src: string;
  poster: string;
  title: string;
  length: string;
};

/*
  A small player that opens on top of the page. It uses the native dialog
  element, so Esc closes it, focus stays inside it and the page behind it
  does not scroll. Nothing downloads until a person presses play
  (preload="none"), and closing stops the video.
*/
export function VideoModal({
  open,
  onClose,
  videos,
  heading,
  accent,
}: {
  open: boolean;
  onClose: () => void;
  videos: SampleVideo[];
  heading: string;
  accent: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => {
    videoRef.current?.pause();
    onClose();
  };

  const video = videos[current];

  return (
    <dialog
      ref={dialogRef}
      onClose={close}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      aria-label={heading}
      className="m-auto w-[min(92vw,46rem)] max-w-none rounded-2xl border border-white/15 bg-[#0b1020] p-0 text-paper backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="font-display text-sm font-medium" style={{ color: accent }}>
              {heading}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close video"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-paper transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <video
            key={video.src}
            ref={videoRef}
            controls
            playsInline
            preload="none"
            poster={video.poster}
            className="aspect-video w-full rounded-xl bg-black"
          >
            <source src={video.src} type="video/mp4" />
          </video>
          {videos.length > 1 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {videos.map((v, i) => (
                <button
                  key={v.src}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-pressed={i === current}
                  className="rounded-lg border px-3 py-2 text-left text-xs transition-colors"
                  style={{
                    borderColor: i === current ? accent : "rgba(255,255,255,0.15)",
                    backgroundColor:
                      i === current ? "rgba(255,255,255,0.08)" : "transparent",
                  }}
                >
                  <span className="block font-medium text-paper">{v.title}</span>
                  <span className="text-paper/60">{v.length}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
