/*
  The mark: three rising bars, the tallest one picked out in coral with a
  highlighter swipe under it. That is "accentuate" in one small picture.
*/

export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="40" height="40" rx="9" className="fill-ink" />
      <rect
        x="8"
        y="22"
        width="6"
        height="10"
        rx="1.5"
        className="fill-white"
        opacity="0.55"
      />
      <rect
        x="17"
        y="16"
        width="6"
        height="16"
        rx="1.5"
        className="fill-white"
        opacity="0.8"
      />
      <rect x="26" y="8" width="6" height="24" rx="1.5" className="fill-coral" />
      <rect x="23" y="31" width="12" height="3" rx="1.5" className="fill-sun" />
    </svg>
  );
}
