/*
  The Accentuate mark: a rising arrow in the amber gradient, drawn as plain
  SVG so it needs no image file. The name sits to its left is set in the same
  italic medium weight BizBuzz uses for its own wordmark.
*/

export function ArrowMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="acc-mark" x1="4" y1="34" x2="36" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff8a3d" />
          <stop offset="0.6" stopColor="#ffb938" />
          <stop offset="1" stopColor="#ffe6b0" />
        </linearGradient>
      </defs>
      <path
        d="M4 31 C 12 30, 20 24, 28 13"
        stroke="url(#acc-mark)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path d="M22 9 L36 5 L31 19 Z" fill="url(#acc-mark)" />
    </svg>
  );
}

export function Wordmark({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="font-display text-[1.45rem] font-medium italic leading-none tracking-[-0.05em] text-paper">
        {name}
      </span>
      <ArrowMark />
    </span>
  );
}
