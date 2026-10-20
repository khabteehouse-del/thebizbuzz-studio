/*
  Landing art for the Work page: an original silhouette of a rocket on its
  launch pad, with small product tiles lifting off one after another and
  drifting away. Pure SVG plus CSS keyframes (see globals.css), so it is tiny,
  sharp on any screen and holds still for reduced motion. The cyan rim light
  is a shifted copy of each shape drawn behind the dark one.
*/
export function ShipArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 210"
      className={className}
      role="img"
      aria-label="A rocket on a launch pad with product tiles lifting off"
    >
      <defs>
        <radialGradient id="ship-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6de2fc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6de2fc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ship-floor" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6de2fc" stopOpacity="0" />
          <stop offset="50%" stopColor="#6de2fc" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6de2fc" stopOpacity="0" />
        </linearGradient>

        <g id="ship-rocket-shape">
          <path d="M120 34 C134 60 137 100 132 146 L108 146 C103 100 106 60 120 34 Z" />
          <path d="M108 118 L92 152 L108 144 Z" />
          <path d="M132 118 L148 152 L132 144 Z" />
        </g>
        <g id="ship-pad-shape">
          <rect x="84" y="152" width="72" height="18" />
          <rect x="68" y="64" width="7" height="106" />
          <rect x="68" y="64" width="26" height="5" />
          <rect x="92" y="96" width="14" height="4" />
          <rect x="176" y="154" width="22" height="16" />
          <rect x="204" y="146" width="26" height="24" />
        </g>
      </defs>

      {/* stars */}
      <g fill="#a8f1ff">
        <circle className="ship-star" cx="40" cy="30" r="1.3" />
        <circle className="ship-star s2" cx="190" cy="22" r="1.5" />
        <circle className="ship-star s3" cx="250" cy="60" r="1.2" />
        <circle className="ship-star s2" cx="300" cy="28" r="1.4" />
        <circle className="ship-star" cx="164" cy="64" r="1.1" />
      </g>

      {/* glow under the rocket */}
      <ellipse className="ship-glow" cx="120" cy="150" rx="70" ry="34" fill="url(#ship-glow)" />

      {/* floor */}
      <rect x="10" y="170" width="320" height="2" fill="url(#ship-floor)" />

      {/* launch pad, gantry and crates */}
      <g fill="#6de2fc" opacity="0.5" transform="translate(2 -0.6)">
        <use href="#ship-pad-shape" />
      </g>
      <g fill="#050912">
        <use href="#ship-pad-shape" />
      </g>
      <g stroke="#6de2fc" strokeOpacity="0.4" strokeWidth="1">
        <line x1="75" y1="70" x2="75" y2="170" />
      </g>

      {/* rocket */}
      <g className="ship-rocket">
        <g fill="#6de2fc" opacity="0.6" transform="translate(2.4 -0.6)">
          <use href="#ship-rocket-shape" />
        </g>
        <g fill="#050912">
          <use href="#ship-rocket-shape" />
        </g>
        <circle cx="120" cy="82" r="6" fill="#6de2fc" fillOpacity="0.85" />
        <circle cx="120" cy="82" r="6" fill="none" stroke="#050912" strokeWidth="2" />
      </g>

      {/* idle flame flicker at the base */}
      <ellipse className="ship-flame" cx="120" cy="150" rx="6" ry="3.5" fill="#a8f1ff" />

      {/* product tiles lifting off, one after another */}
      <g transform="translate(206 134)">
        <g className="ship-tile t1">
          <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#0a2236" stroke="#6de2fc" strokeWidth="1.2" />
          <line x1="-9" y1="-3" x2="7" y2="-3" stroke="#6de2fc" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="-9" y1="3" x2="1" y2="3" stroke="#6de2fc" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        <g className="ship-tile t2">
          <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#0a2236" stroke="#a8f1ff" strokeWidth="1.2" />
          <rect x="-9" y="0" width="4" height="6" fill="#a8f1ff" />
          <rect x="-2" y="-4" width="4" height="10" fill="#a8f1ff" />
          <rect x="5" y="-7" width="4" height="13" fill="#a8f1ff" />
        </g>
        <g className="ship-tile t3">
          <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#0a2236" stroke="#6de2fc" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="5.5" fill="none" stroke="#6de2fc" strokeWidth="1.4" strokeDasharray="4 3" />
        </g>
        <g className="ship-tile t4">
          <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#0a2236" stroke="#a8f1ff" strokeWidth="1.2" />
          <line x1="-9" y1="-4" x2="9" y2="-4" stroke="#a8f1ff" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="-9" y1="2" x2="9" y2="2" stroke="#a8f1ff" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
