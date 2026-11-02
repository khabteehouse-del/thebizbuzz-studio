import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-ink px-6 py-3 text-base font-bold transition duration-150 hover:translate-x-[2px] hover:translate-y-[2px]";

const variants: Record<Variant, string> = {
  primary:
    "bg-coral text-ink shadow-[4px_4px_0_0_var(--color-ink)] hover:shadow-[2px_2px_0_0_var(--color-ink)]",
  dark: "bg-ink text-white shadow-[4px_4px_0_0_var(--color-coral)] hover:shadow-[2px_2px_0_0_var(--color-coral)]",
  outline:
    "bg-white text-ink shadow-[4px_4px_0_0_var(--color-ink)] hover:shadow-[2px_2px_0_0_var(--color-ink)]",
  light:
    "bg-white text-ink shadow-[4px_4px_0_0_var(--color-sun)] hover:shadow-[2px_2px_0_0_var(--color-sun)]",
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
      className="inline-flex items-center gap-1.5 font-bold text-violet-deep underline decoration-2 underline-offset-4 hover:text-ink"
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}
