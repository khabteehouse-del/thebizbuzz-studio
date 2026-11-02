import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded border px-6 py-3 text-base font-semibold transition duration-200";

const variants: Record<Variant, string> = {
  primary:
    "border-accent bg-accent text-white hover:border-accent-soft hover:bg-accent-soft",
  dark: "border-paper bg-paper text-ink hover:bg-white",
  outline:
    "border-line bg-transparent text-paper hover:border-paper/40 hover:bg-white/5",
  light: "border-amber bg-amber text-ink hover:bg-white hover:border-white",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  external = false,
  className = "",
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={18} aria-hidden="true" />}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/* A quiet text link with an arrow, for cards */
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 font-semibold text-accent-soft underline decoration-1 underline-offset-4 hover:text-paper"
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}
