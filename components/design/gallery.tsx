"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { unbounded } from "@/app/design/font";
import {
  designCategories,
  designs,
  type Design,
  type DesignCategory,
} from "@/data/designs";

type Filter = "all" | DesignCategory;

/* One viewer step: a piece and which of its images is showing. */
type Slide = { design: Design; imageIndex: number };

const categoryLabel = (id: DesignCategory) =>
  designCategories.find((c) => c.id === id)?.label ?? id;

export function DesignGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openAt, setOpenAt] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const visible = useMemo(
    () =>
      filter === "all" ? designs : designs.filter((d) => d.category === filter),
    [filter],
  );

  /* Every image of every visible piece, in order, for the viewer. */
  const slides = useMemo<Slide[]>(
    () =>
      visible.flatMap((design) =>
        design.images.map((_, imageIndex) => ({ design, imageIndex })),
      ),
    [visible],
  );

  const open = (design: Design) => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpenAt(
      slides.findIndex((s) => s.design.id === design.id && s.imageIndex === 0),
    );
  };

  const close = useCallback(() => {
    setOpenAt(null);
    /* Hand focus back to the card that opened the viewer. */
    requestAnimationFrame(() => opener.current?.focus());
  }, []);

  const counts = useMemo(() => {
    const byCategory = new Map<DesignCategory, number>();
    for (const d of designs) {
      byCategory.set(d.category, (byCategory.get(d.category) ?? 0) + 1);
    }
    return byCategory;
  }, []);

  return (
    <>
      <div className="dz-filters" role="group" aria-label="Filter by discipline">
        <button
          type="button"
          className="dz-chip"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All <small>{designs.length}</small>
        </button>
        {designCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            className="dz-chip"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
          >
            {c.label} <small>{counts.get(c.id) ?? 0}</small>
          </button>
        ))}
      </div>

      <div className="dz-grid">
        {visible.map((design, index) => {
          const cover = design.images[0];
          const isSet = design.images.length > 1;
          return (
            <button
              key={`${filter}-${design.id}`}
              type="button"
              className="dz-card"
              style={{ "--i": index } as CSSProperties}
              aria-label={`${design.title}, ${categoryLabel(design.category)}${
                isSet ? `, ${design.images.length} images` : ""
              }. Open full screen.`}
              onClick={() => open(design)}
            >
              <Image
                src={cover.src}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={index === 0}
              />
              {isSet && (
                <span className="dz-badge">{design.images.length} images</span>
              )}
              <span className="dz-card-cap">
                <span className="dz-card-title block">{design.title}</span>
                <span className="dz-card-meta block">
                  {categoryLabel(design.category)}
                </span>
                <span className="dz-card-line block">
                  <span>{design.caption}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {mounted &&
        openAt !== null &&
        slides[openAt] &&
        createPortal(
          <Viewer
            slides={slides}
            index={openAt}
            onIndex={setOpenAt}
            onClose={close}
          />,
          document.body,
        )}
    </>
  );
}

function Viewer({
  slides,
  index,
  onIndex,
  onClose,
}: {
  slides: Slide[];
  index: number;
  onIndex: (next: number) => void;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const { design, imageIndex } = slides[index];
  const image = design.images[imageIndex];
  const total = slides.length;

  const go = useCallback(
    (delta: number) => onIndex((index + delta + total) % total),
    [index, total, onIndex],
  );

  /* Freeze the page behind the viewer and move focus into it. */
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        go(1);
      } else if (event.key === "ArrowLeft") {
        go(-1);
      } else if (event.key === "Tab" && root.current) {
        /* Keep Tab inside the viewer. */
        const items = Array.from(
          root.current.querySelectorAll<HTMLElement>("button"),
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const setLabel =
    design.images.length > 1
      ? `Image ${imageIndex + 1} of ${design.images.length}`
      : null;

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${design.title}, ${index + 1} of ${total}`}
      className={`dz-viewer ${unbounded.variable}`}
      data-lenis-prevent
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeButton}
        type="button"
        className="dz-viewer-btn dz-viewer-close"
        aria-label="Close viewer"
        onClick={onClose}
      >
        <X size={20} aria-hidden="true" />
      </button>

      <div
        className="dz-viewer-figure"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="100vw"
        />
      </div>

      <div className="dz-viewer-info dz-glass" aria-live="polite">
        <div>
          <p className="dz-card-title">{design.title}</p>
          <p className="dz-card-meta">
            {categoryLabel(design.category)}
            {setLabel ? ` · ${setLabel}` : ""}
          </p>
          <p className="dz-card-line">{design.caption}</p>
        </div>
        <div className="dz-viewer-nav">
          <span className="dz-viewer-count" aria-hidden="true">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            className="dz-viewer-btn"
            aria-label="Previous image"
            onClick={() => go(-1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="dz-viewer-btn"
            aria-label="Next image"
            onClick={() => go(1)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
