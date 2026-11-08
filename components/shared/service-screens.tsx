import Image from "next/image";
import type { ServicePage } from "@/data/service-pages";

/*
  Phone screens in rounded frames with a soft shadow and a thin travelling
  light on the border. On a phone the row swipes sideways. On PC it is a
  grid with a gentle float. Both animations stop for reduced motion.
*/
export function ServiceScreens({
  screens,
  accent,
}: {
  screens: NonNullable<ServicePage["screens"]>;
  accent: string;
}) {
  return (
    <ul
      className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pt-2 [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:gap-7 lg:overflow-visible lg:pb-4"
      style={{ "--c": accent } as React.CSSProperties}
    >
      {screens.map((shot, i) => (
        <li
          key={shot.src}
          className={`shot-float w-[66%] shrink-0 snap-center sm:w-[42%] lg:w-auto ${i % 2 === 1 ? "lg:mt-10" : ""}`}
        >
          <div className="shot-frame">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 1024px) 22vw, 66vw"
            />
          </div>
          <p className="mt-5 px-1 text-sm leading-relaxed text-paper/70">
            {shot.caption}
          </p>
        </li>
      ))}
    </ul>
  );
}
