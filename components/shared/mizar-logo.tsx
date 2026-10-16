import "./mizar-logo.css";

/*
  The Mizar lockup as inline SVG, drawn from the vector master, so the two
  stars are separate shapes and can twinkle on their own. The background
  rectangle of the master is left out: the tile supplies the dark ground.
  Gradient ids are prefixed so they cannot clash with other SVGs on the page.
*/
export function MizarLogo({ className }: { className?: string }) {
  return (
    <svg
      className={`mizar-logo ${className ?? ""}`}
      viewBox="0 24 1362 350"
      role="img"
      aria-label="Mizar"
    >
      <defs>
        <linearGradient
          id="mzr-gm"
          x1="94"
          y1="250"
          x2="318"
          y2="158"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1E7FD6" />
          <stop offset="1" stopColor="#37B5FF" />
        </linearGradient>
        <linearGradient id="mzr-g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E7FD6" />
          <stop offset="1" stopColor="#37B5FF" />
        </linearGradient>
        <linearGradient id="mzr-g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#37B5FF" />
          <stop offset="1" stopColor="#6FE3FF" />
        </linearGradient>
      </defs>

      <path
        d="M94 132 L212 249 L318 158"
        fill="none"
        stroke="url(#mzr-gm)"
        strokeWidth="7"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeLinecap="butt"
      />
      <path
        className="mizar-star mizar-star--a"
        d="M82,40 Q88,118 154,124 Q88,130 82,196 Q76,130 10,124 Q76,118 82,40Z M77 124 L87 124 L82 352Z"
        fill="url(#mzr-g1)"
      />
      <path
        className="mizar-star mizar-star--b"
        d="M337,101 Q342,148 389,153 Q342,158 337,205 Q332,158 285,153 Q332,148 337,101Z M333 153 L341 153 L337 328Z"
        fill="url(#mzr-g2)"
      />

      <g
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="8"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeLinecap="butt"
      >
        <path
          d="M0 80 L0 0 L30 48 L60 0 L60 80"
          transform="translate(470.0,112) scale(2.2)"
        />
        <path
          d="M0 83.5 L0 -3.5"
          transform="translate(685.6,112) scale(2.2)"
        />
        <path
          d="M0 0 L60 0 L0 80 L60 80"
          transform="translate(769.2,112) scale(2.2)"
        />
        <path
          d="M0 80 L30 0 L60 80 M12 56 L48 56"
          transform="translate(984.8,112) scale(2.2)"
        />
        <path
          d="M0 80 L0 0 L34 0 A20 20 0 0 1 34 40 L0 40 M30 40 L60 80"
          transform="translate(1200.4,112) scale(2.2)"
        />
      </g>
    </svg>
  );
}
