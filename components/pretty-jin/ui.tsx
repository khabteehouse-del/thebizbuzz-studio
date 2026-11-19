import type { CSSProperties, ElementType, ReactNode } from "react";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { brand } from "./data";

type BtnProps = {
  label?: string;
  href?: string;
  variant?: "primary" | "ghost" | "gold";
  messenger?: boolean;
  external?: boolean;
};

/* Pill button with a slow sheen. No pointer-following movement on purpose. */
export function Btn({
  label = "Book on Messenger",
  href = brand.bookUrl,
  variant = "primary",
  messenger = true,
  external = true,
}: BtnProps) {
  const cls = variant === "primary" ? "pj-btn" : `pj-btn ${variant}`;
  return (
    <a
      className={cls}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{label}</span>
      {variant !== "ghost" && (
        <span className="ic" aria-hidden>
          {messenger ? <MessageCircle size={18} /> : <ArrowUpRight size={18} />}
        </span>
      )}
    </a>
  );
}

export function CallButton() {
  return (
    <a className="call" href={brand.phoneHref} aria-label="Call Pretty Jin">
      <Phone size={20} />
    </a>
  );
}

/* Headline that rises line by line. Visible without JS. */
export function Lines({
  lines,
  as: Tag = "h2",
  className,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag data-reveal="lines" className={className}>
      {lines.map((l, i) => (
        <span key={i} className="ln" style={{ "--i": i } as CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Up({
  children,
  d = 0,
  className,
}: {
  children: ReactNode;
  d?: number;
  className?: string;
}) {
  return (
    <div data-reveal="up" className={className} style={{ "--d": d } as CSSProperties}>
      {children}
    </div>
  );
}
