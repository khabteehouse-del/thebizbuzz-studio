import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { localServices, studioServices } from "@/data/services";
import type { Service } from "@/data/services";
import { servicePageSlug } from "@/data/service-pages";

/*
  Previous and next service, so a visitor can walk through the services
  without going back to the homepage. One loop, in homepage order: the
  growing-brands services first, then the local ones, then back to the start.
  Mizar is a product, not a service, so it is not in the loop and its page
  shows no arrows.

  Each side always shows its caption ("Next", "Previous") and the service
  name, so the visitor knows where the arrow leads. A slow light sweep passes
  over it now and then; on hover it takes the neighbour's colour.
*/
const loop: Service[] = [...studioServices, ...localServices].filter(
  (s) => servicePageSlug(s.id),
);

const trackShort = (s: Service) => (s.track === "local" ? "Local" : "Growth");

function neighbours(id: string) {
  const i = loop.findIndex((s) => s.id === id);
  if (i === -1) return null;
  const current = loop[i];
  const prev = loop[(i - 1 + loop.length) % loop.length];
  const next = loop[(i + 1) % loop.length];
  /* When the arrow crosses from one group to the other, the caption says so. */
  const caption = (word: string, s: Service) =>
    s.track !== current.track ? `${word} · ${trackShort(s)}` : word;
  return {
    prev,
    next,
    prevCaption: caption("Previous", prev),
    nextCaption: caption("Next", next),
  };
}

function Text({
  caption,
  title,
  align,
}: {
  caption: string;
  title: string;
  align: "left" | "right";
}) {
  return (
    <span
      className={`flex min-w-0 flex-col leading-tight ${align === "right" ? "items-end text-right" : "items-start text-left"}`}
    >
      <span className="svc-caption text-[9px] font-medium uppercase tracking-[0.18em]">
        {caption}
      </span>
      <span className="max-w-[9rem] truncate text-[12.5px] font-medium text-white lg:max-w-[12.5rem]">
        {title}
      </span>
    </span>
  );
}

/* Centered text for the tall side cards. */
function SideText({ caption, title }: { caption: string; title: string }) {
  return (
    <span className="flex flex-col items-center gap-1 text-center leading-tight">
      <span className="svc-caption text-[9px] font-medium uppercase tracking-[0.18em]">
        {caption}
      </span>
      <span className="line-clamp-3 break-words text-[12.5px] font-medium text-white">
        {title}
      </span>
    </span>
  );
}

/* Large screens: a tall card on each side of the banner, outside it, so the
   banner picture stays clear. Wrap the banner in this. Below lg, or on a page
   outside the loop (Mizar), it renders the banner alone. */
export function ServiceBannerFrame({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const n = neighbours(id);
  if (!n) return <>{children}</>;
  const side =
    "svc-arrow relative hidden flex-col items-center justify-center gap-3 rounded-2xl px-3 py-4 lg:flex";
  return (
    <div className="lg:grid lg:grid-cols-[6.75rem_minmax(0,1fr)_6.75rem] lg:items-stretch lg:gap-4">
      <Link
        href={`/services/${servicePageSlug(n.prev.id)}`}
        aria-label={`Previous service: ${n.prev.title}`}
        style={{ "--mark": n.prev.mark } as React.CSSProperties}
        className={side}
      >
        <span className="svc-dot flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
          <ArrowLeft size={18} aria-hidden="true" />
        </span>
        <SideText caption={n.prevCaption} title={n.prev.title} />
      </Link>
      <div className="min-w-0">{children}</div>
      <Link
        href={`/services/${servicePageSlug(n.next.id)}`}
        aria-label={`Next service: ${n.next.title}`}
        style={{ "--mark": n.next.mark } as React.CSSProperties}
        className={side}
      >
        <span className="svc-dot flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
          <ArrowRight size={18} aria-hidden="true" />
        </span>
        <SideText caption={n.nextCaption} title={n.next.title} />
      </Link>
    </div>
  );
}

/* Phone and tablet: no room beside the banner, so a slim row sits under it. */
export function ServiceNavRow({ id }: { id: string }) {
  const n = neighbours(id);
  if (!n) return null;
  const cell =
    "svc-arrow relative flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3";
  return (
    <div className="mt-3 flex gap-3 lg:hidden">
      <Link
        href={`/services/${servicePageSlug(n.prev.id)}`}
        aria-label={`Previous service: ${n.prev.title}`}
        style={{ "--mark": n.prev.mark } as React.CSSProperties}
        className={cell}
      >
        <ArrowLeft size={16} aria-hidden="true" className="svc-icon shrink-0" />
        <Text caption={n.prevCaption} title={n.prev.title} align="left" />
      </Link>
      <Link
        href={`/services/${servicePageSlug(n.next.id)}`}
        aria-label={`Next service: ${n.next.title}`}
        style={{ "--mark": n.next.mark } as React.CSSProperties}
        className={`${cell} justify-end`}
      >
        <Text caption={n.nextCaption} title={n.next.title} align="right" />
        <ArrowRight size={16} aria-hidden="true" className="svc-icon shrink-0" />
      </Link>
    </div>
  );
}
