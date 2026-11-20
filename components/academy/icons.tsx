/*
  Small inline icons for the academy. Drawn here so the page does not depend
  on an icon package, and so the graduate cap matches the one in the banner.
*/
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* Graduate cap with tassel. The nav link adds the glow around it. */
export function CapIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 9.2 12 4.2l9.5 5L12 14.2 2.5 9.2Z" />
      <path d="M6.5 11.6v4.1c0 1.2 2.5 2.6 5.5 2.6s5.5-1.4 5.5-2.6v-4.1" />
      <path d="M21.5 9.2v5.6" />
      <circle cx="21.5" cy="15.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3v-3H4A1.5 1.5 0 0 1 2.5 16V7A1.5 1.5 0 0 1 4 5.5Z" />
      <path d="M7.5 10h9M7.5 13.2h5.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

/* One icon per "what you will gain" card, in the order of academyGains. */
export function GainIcon({ index, ...props }: IconProps & { index: number }) {
  const icons = [
    // work smarter: lightning
    <path key="a" d="M13 3 5.5 13.5H11L10 21l8-11h-5.5L13 3Z" />,
    // create more: sparkle
    <path key="b" d="M12 3.5c.6 3.9 1.6 4.9 5.5 5.5-3.9.6-4.9 1.6-5.5 5.5-.6-3.9-1.6-4.9-5.5-5.5 3.9-.6 4.9-1.6 5.5-5.5Zm6 10.5c.3 1.9.8 2.4 2.7 2.7-1.9.3-2.4.8-2.7 2.7-.3-1.9-.8-2.4-2.7-2.7 1.9-.3 2.4-.8 2.7-2.7Z" />,
    // build practical skills: code brackets
    <path key="c" d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.2 5l-2.4 14" />,
    // portfolio: layers
    <path key="d" d="m12 3.5 9 4.7-9 4.7-9-4.7 9-4.7ZM3.5 12.6l8.5 4.4 8.5-4.4M3.5 16.6l8.5 4.4 8.5-4.4" />,
    // opportunities: trending up
    <path key="e" d="M3.5 17.5 9.5 11l4 4 7-8M15 7h5.5v5.5" />,
  ];
  return (
    <svg {...base} {...props}>
      {icons[index % icons.length]}
    </svg>
  );
}
