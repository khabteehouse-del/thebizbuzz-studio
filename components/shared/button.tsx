import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  external?: boolean;
};

/*
  One definition for every call to action on the site.

  The move here is the fill wipe: a panel rises from the bottom edge on
  hover rather than the background colour cross-fading. Cross-fades read
  as a default state change. A wipe reads as something built on purpose.

  Corners are 2px, close to sharp. Rounded corners on a large button are
  the single clearest tell of a template.

  Labels are small caps with open tracking, matching the section labels,
  so the buttons belong to the same typographic system as everything else.
*/
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  external = false,
}: ButtonProps) {
  /* Narrower padding on small screens so two buttons still fit a row */
  const dimensions =
    size === "lg"
      ? "h-[3.1rem] px-6 text-[0.75rem] md:h-[3.4rem] md:px-9 md:text-[0.8125rem]"
      : "h-12 px-6 text-xs md:px-7";

  const base =
    "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-[2px] font-medium uppercase tracking-[0.12em] transition-colors duration-300";

  const skin =
    variant === "primary"
      ? "border border-accent bg-accent text-paper"
      : "border border-paper/25 bg-transparent text-paper hover:border-paper/50";

  const content = (
    <>
      {/* The wipe. Rises from the bottom edge, sits behind the label. */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-y-100 ${
          variant === "primary" ? "bg-paper" : "bg-paper"
        }`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ${
          variant === "primary"
            ? "group-hover/btn:text-ink"
            : "group-hover/btn:text-ink"
        }`}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`relative z-10 h-px w-4 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:w-7 ${
          variant === "primary"
            ? "bg-paper group-hover/btn:bg-ink"
            : "bg-accent group-hover/btn:bg-ink"
        }`}
      />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${skin} ${dimensions}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${skin} ${dimensions}`}>
      {content}
    </Link>
  );
}
