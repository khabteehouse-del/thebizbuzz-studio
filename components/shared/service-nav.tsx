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
*/
const loop: Service[] = [...studioServices, ...localServices].filter(
  (s) => servicePageSlug(s.id),
);

const trackName = (s: Service) =>
  s.track === "local" ? "For local businesses" : "For growing brands";

function neighbours(id: string) {
  const i = loop.findIndex((s) => s.id === id);
  if (i === -1) return null;
  const prev = loop[(i - 1 + loop.length) % loop.length];
  const next = loop[(i + 1) % loop.length];
  const current = loop[i];
  return {
    prev,
    next,
    prevLabel:
      prev.track !== current.track
        ? `${prev.title} (${trackName(prev)})`
        : prev.title,
    nextLabel:
      next.track !== current.track
        ? `${next.title} (${trackName(next)})`
        : next.title,
  };
}

/* PC: two dim round arrows on the left and right edges of the banner. Place inside a relative wrapper around the banner. */
export function ServiceArrows({ id }: { id: string }) {
  const n = neighbours(id);
  if (!n) return null;
  return (
    <>
      <Link
        href={`/services/${servicePageSlug(n.prev.id)}`}
        aria-label={`Previous service: ${n.prevLabel}`}
        style={{ "--mark": n.prev.mark } as React.CSSProperties}
        className="svc-arrow absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full md:flex"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        <span className="svc-arrow-label pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md px-3 py-1.5 text-xs">
          Previous: {n.prevLabel}
        </span>
      </Link>
      <Link
        href={`/services/${servicePageSlug(n.next.id)}`}
        aria-label={`Next service: ${n.nextLabel}`}
        style={{ "--mark": n.next.mark } as React.CSSProperties}
        className="svc-arrow absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full md:flex"
      >
        <ArrowRight size={18} aria-hidden="true" />
        <span className="svc-arrow-label pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md px-3 py-1.5 text-xs">
          Next: {n.nextLabel}
        </span>
      </Link>
    </>
  );
}

/* Phone: the banner is too short for side arrows, so a slim row sits under it. */
export function ServiceNavRow({ id }: { id: string }) {
  const n = neighbours(id);
  if (!n) return null;
  const cell =
    "svc-row flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg px-3 text-xs";
  return (
    <div className="mt-3 flex gap-3 md:hidden">
      <Link
        href={`/services/${servicePageSlug(n.prev.id)}`}
        aria-label={`Previous service: ${n.prevLabel}`}
        style={{ "--mark": n.prev.mark } as React.CSSProperties}
        className={cell}
      >
        <ArrowLeft size={15} aria-hidden="true" className="shrink-0" />
        <span className="truncate">{n.prev.title}</span>
      </Link>
      <Link
        href={`/services/${servicePageSlug(n.next.id)}`}
        aria-label={`Next service: ${n.nextLabel}`}
        style={{ "--mark": n.next.mark } as React.CSSProperties}
        className={`${cell} justify-end text-right`}
      >
        <span className="truncate">{n.next.title}</span>
        <ArrowRight size={15} aria-hidden="true" className="shrink-0" />
      </Link>
    </div>
  );
}
