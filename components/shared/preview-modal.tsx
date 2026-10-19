"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export type SitePreview = {
  src: string;
  title: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
};

/*
  A small viewer that opens on top of the page and shows screenshots of
  shipped sites, one tab per site. Same shell as the video player: the
  native dialog element (Esc and backdrop click close it, focus stays inside)
  with the page behind it frozen so the smooth scroller cannot move it.
*/
export function PreviewModal({
  open,
  onClose,
  previews,
  heading,
  accent,
}: {
  open: boolean;
  onClose: () => void;
  previews: SitePreview[];
  heading: string;
  accent: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const stop = (event: Event) => event.stopPropagation();
    dialog.addEventListener("wheel", stop, { passive: true });
    dialog.addEventListener("touchmove", stop, { passive: true });
    return () => {
      dialog.removeEventListener("wheel", stop);
      dialog.removeEventListener("touchmove", stop);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  const preview = previews[current];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-label={heading}
      data-lenis-prevent
      className="m-auto w-[min(92vw,46rem)] max-w-none overscroll-contain rounded-2xl border border-white/15 bg-[#0b1020] p-0 text-paper backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="font-display text-sm font-medium" style={{ color: accent }}>
              {heading}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close previews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-paper transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            <Image
              key={preview.src}
              src={preview.src}
              alt={preview.alt}
              width={preview.width}
              height={preview.height}
              sizes="(min-width: 768px) 44rem, 92vw"
              quality={80}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {previews.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setCurrent(i)}
                aria-pressed={i === current}
                className="rounded-lg border px-3 py-2 text-left text-xs transition-colors"
                style={{
                  borderColor: i === current ? accent : `${accent}44`,
                  backgroundColor: i === current ? `${accent}33` : `${accent}0f`,
                }}
              >
                <span className="block font-medium text-paper">{p.title}</span>
                <span className="text-paper/60">{p.caption}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
