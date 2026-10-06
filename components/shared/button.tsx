import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  external?: boolean;
  /* Extra classes, e.g. a fixed width so two buttons in a row match */
  className?: string;
  /* Optional accent for bands that are not the default blue, e.g. the
     teal free-tool band. Leave out everywhere else. */
  accent?: string;
};

/*
  One definition for every call to action on the site.

  A spark runs around the edge like a lit fuse (see .fuse-btn in
  globals.css): bright head, glowing trail, unlit ring ahead of it.
  The primary button burns in the logo cyan, the ghost in a cooler white
  and starts at a different point, so two buttons side by side never
  burn in sync.

  The arrow sits in its own round badge and pushes forward on hover.
*/
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  accent,
}: ButtonProps) {
  /* Narrower padding on small screens so two buttons still fit a row */
  const dimensions =
    size === "lg"
      ? "h-[2.9rem] pl-6 pr-1 text-[0.75rem] md:h-[3.1rem] md:pl-8 md:text-[0.8125rem]"
      : "h-10 pl-5 pr-1 text-xs md:pl-6";

  const base =
    "fuse-btn group/btn relative isolate inline-flex items-center justify-center gap-4 rounded-full font-medium uppercase tracking-[0.14em] text-paper transition-shadow duration-300";

  const skin =
    variant === "primary"
      ? "bg-[#0b1224] shadow-[0_0_18px_rgba(29,213,255,0.08)] hover:shadow-[0_0_26px_rgba(29,213,255,0.18)]"
      : "bg-white/[0.03] shadow-[inset_0_0_0_1px_rgba(245,248,255,0.12)] backdrop-blur-sm hover:shadow-[inset_0_0_0_1px_rgba(245,248,255,0.25)]";

  const style = {
    "--fuse-color": accent ?? (variant === "primary" ? "#1dd5ff" : "#a9c7ff"),
    ...(accent
      ? { backgroundColor: "#082022", boxShadow: `0 0 22px ${accent}33` }
      : {}),
    "--fuse-duration": variant === "primary" ? "7s" : "8.5s",
    "--fuse-delay": variant === "primary" ? "0s" : "-3s",
  } as CSSProperties;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className={`relative z-10 flex aspect-square h-[calc(100%-0.5rem)] items-center justify-center rounded-full text-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5 ${
          variant === "primary"
            ? "bg-gradient-to-br from-[#1dd5ff] to-accent text-[#06101f]"
            : "bg-white/10 text-paper"
        }`}
        style={accent ? { backgroundImage: `linear-gradient(135deg, ${accent}, #2a9d93)`, color: "#06191a" } : undefined}
      >
        &rarr;
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${skin} ${dimensions} ${className}`}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${skin} ${dimensions} ${className}`} style={style}>
      {content}
    </Link>
  );
}
