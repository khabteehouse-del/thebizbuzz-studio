import Image from "next/image";
import type { Service } from "@/data/services";
import type { ServicePage } from "@/data/service-pages";
import { TileArt } from "@/components/shared/tile-art";

/*
  Banner at the top of a service page. Until the finished picture is
  added to the page data (`banner`), it shows a drawn banner in the
  service's own colours: glow, a faint grid, the tile icon and, where one
  exists, the same drawing as the back of the tile.
*/
export function ServiceBanner({
  service,
  page,
}: {
  service: Service;
  page: ServicePage;
}) {
  const Icon = service.icon;

  if (page.banner) {
    return (
      <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: `${service.mark}44`, backgroundColor: service.tint }}>
        <Image
          src={page.banner.src}
          alt={page.banner.alt}
          width={page.banner.width}
          height={page.banner.height}
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="h-auto w-full"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${page.seoTitle} banner`}
      className="relative h-48 overflow-hidden rounded-2xl border sm:h-56 md:h-72"
      style={{ backgroundColor: service.tint, borderColor: `${service.mark}44` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full blur-[90px]"
        style={{ background: `radial-gradient(circle, ${service.mark} 0%, transparent 70%)`, opacity: 0.3 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(${service.mark} 1px, transparent 1px), linear-gradient(90deg, ${service.mark} 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />
      {service.backArt && (
        <TileArt
          id={service.backArt}
          color={service.mark}
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[55%] opacity-70 md:block [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_30%)] [mask-image:linear-gradient(to_right,transparent_0%,black_30%)]"
        />
      )}
      <span
        className="absolute left-6 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-[4px] border md:left-12 md:h-24 md:w-24"
        style={{ borderColor: `${service.mark}66`, color: service.mark }}
      >
        <Icon className="h-8 w-8 md:h-12 md:w-12" strokeWidth={1.4} />
      </span>
    </div>
  );
}
