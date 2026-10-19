import type { CSSProperties, JSX } from "react";
import type { ArtId } from "@/data/services";

/*
  Pictures for the back of the service tiles, drawn in code.

  Each one is a large, quiet scene behind the list of what is included, in the
  tile's own colour. They are generic on purpose: a play button and a video
  player, a map pin, a row of stars. No platform logos.

  Colour: everything that carries the tile colour uses currentColor, so the
  parent sets one `color`. Neutrals are white at low opacity.

  Motion: every moving part has the class "ta" plus one of the ta-* classes
  defined in globals.css. Motion only plays while the tile is flipped or
  hovered, and is switched off for visitors who prefer reduced motion. The
  resting state of each shape is its finished state, so nothing is hidden
  when motion is off.
*/

const LINE = "rgba(255,255,255,0.16)";
const FAINT = "rgba(255,255,255,0.05)";
const PANEL = "rgba(255,255,255,0.07)";
const BAR = "rgba(255,255,255,0.2)";
const STAR = "0,-5 1.5,-1.6 4.8,-1.5 2.3,0.8 3,4.1 0,2.3 -3,4.1 -2.3,0.8 -4.8,-1.5 -1.5,-1.6";
const HEART = "M0 -2c-2-5-9-3-9 2 0 5 9 9 9 12 0-3 9-7 9-12 0-5-7-7-9-2z";
const SPARK = "M0 -60C6 -20 20 -6 60 0C20 6 6 20 0 60C-6 20 -20 6 -60 0C-20 -6 -6 -20 0 -60z";

/* Delay for an animation, passed through to the CSS as a variable. */
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Star({ x, y, s, i = 0, fillOpacity = 1 }: { x: number; y: number; s: number; i?: number; fillOpacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <polygon className="ta ta-pop" style={d(i * 0.2)} points={STAR} fill="currentColor" fillOpacity={fillOpacity} />
    </g>
  );
}

function Gbp() {
  return (
    <>
      <g stroke={LINE} strokeWidth="1" fill="none" opacity="0.55">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="150" />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`h${i}`} x1="0" y1={20 + i * 55} x2="400" y2={20 + i * 55} />
        ))}
        <path d="M-10 124C60 104 110 64 190 74S330 24 410 44" strokeWidth="7" />
      </g>
      <ellipse className="ta ta-ping" cx="78" cy="114" rx="28" ry="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse className="ta ta-ping" style={d(1.2)} cx="78" cy="114" rx="28" ry="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g transform="translate(78 114)">
        <path d="M0 0C-14-18-22-28-22-40a22 22 0 0144 0C22-28 14-18 0 0z" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="2" />
        <circle cx="0" cy="-40" r="8" fill="currentColor" />
      </g>
      <rect x="162" y="26" width="222" height="100" rx="10" fill={PANEL} stroke={LINE} />
      <circle cx="186" cy="50" r="10" fill="currentColor" fillOpacity="0.35" />
      <rect x="204" y="42" width="104" height="6" rx="3" fill={BAR} />
      <rect x="204" y="54" width="62" height="4" rx="2" fill={FAINT} stroke={LINE} strokeWidth="0.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} x={208 + i * 17} y={76} s={1.7} i={i} />
      ))}
      {[
        [92, 128],
        [102, 92],
        [112, 56],
      ].map(([y, w], i) => (
        <g key={y}>
          <rect x="182" y={y} width="22" height="4" rx="2" fill={BAR} />
          <rect className="ta ta-grow-x" style={d(i * 0.25)} x="212" y={y} width={w} height="4" rx="2" fill="currentColor" fillOpacity="0.8" />
        </g>
      ))}
    </>
  );
}

function LocalSeo() {
  return (
    <>
      <g fill="none" stroke="currentColor">
        <circle cx="92" cy="76" r="54" strokeOpacity="0.28" strokeWidth="6" />
        <line x1="132" y1="116" x2="166" y2="146" strokeOpacity="0.28" strokeWidth="9" strokeLinecap="round" />
        <path d="M50 96C70 84 84 90 100 72S124 56 138 62" strokeOpacity="0.2" strokeWidth="5" />
      </g>
      <ellipse className="ta ta-ping" cx="92" cy="90" rx="18" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g transform="translate(92 90)">
        <path d="M0 0C-9-12-14-18-14-26a14 14 0 0128 0C14-18 9-12 0 0z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="0" cy="-26" r="5" fill="currentColor" />
      </g>
      {[0, 1, 2].map((i) => {
        const y = 20 + i * 42;
        const top = i === 0;
        return (
          <g key={i}>
            <rect
              className={top ? "ta ta-glow" : undefined}
              x="196"
              y={y}
              width="190"
              height="34"
              rx="7"
              fill={top ? "currentColor" : PANEL}
              fillOpacity={top ? 0.18 : 1}
              stroke={top ? "currentColor" : LINE}
            />
            <circle cx="214" cy={y + 17} r="9" fill={top ? "currentColor" : BAR} fillOpacity={top ? 0.9 : 1} />
            <text x="214" y={y + 21} textAnchor="middle" fontSize="11" fontWeight="700" fill={top ? "#0a0e1a" : "rgba(255,255,255,0.7)"}>
              {i + 1}
            </text>
            <rect x="232" y={y + 10} width={top ? 96 : 80} height="5" rx="2.5" fill={BAR} />
            <rect x="232" y={y + 20} width={top ? 60 : 46} height="4" rx="2" fill={FAINT} stroke={LINE} strokeWidth="0.5" />
          </g>
        );
      })}
      <path className="ta ta-rise" d="M366 38l-8 10h5v8h6v-8h5z" fill="currentColor" />
    </>
  );
}

function Reviews() {
  return (
    <>
      <g transform="translate(96 76) scale(14)">
        <polygon points={STAR} fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.35" />
      </g>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} x={44 + i * 34} y={122} s={3.4} i={i} />
      ))}
      {[0, 1].map((i) => {
        const y = 14 + i * 58;
        return (
          <g key={i}>
            <rect x="214" y={y} width="170" height="52" rx="9" fill={PANEL} stroke={LINE} />
            <circle cx="234" cy={y + 18} r="8" fill="currentColor" fillOpacity="0.35" />
            <rect x="250" y={y + 12} width="64" height="5" rx="2.5" fill={BAR} />
            {[0, 1, 2, 3, 4].map((k) => (
              <Star key={k} x={254 + k * 10} y={y + 26} s={1} i={k + i * 5} fillOpacity={0.85} />
            ))}
            <rect x="226" y={y + 38} width="140" height="4" rx="2" fill={FAINT} stroke={LINE} strokeWidth="0.5" />
          </g>
        );
      })}
    </>
  );
}

function LocalWeb() {
  return (
    <>
      <rect x="44" y="16" width="312" height="126" rx="9" fill={PANEL} stroke={LINE} />
      <line x1="44" y1="38" x2="356" y2="38" stroke={LINE} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={58 + i * 12} cy="27" r="3" fill={BAR} />
      ))}
      <rect x="110" y="21" width="150" height="12" rx="6" fill={FAINT} stroke={LINE} strokeWidth="0.6" />
      <rect x="66" y="54" width="150" height="10" rx="3" fill={BAR} />
      <rect x="66" y="70" width="108" height="10" rx="3" fill={BAR} />
      <rect x="66" y="90" width="176" height="4" rx="2" fill={FAINT} stroke={LINE} strokeWidth="0.5" />
      <rect x="66" y="100" width="140" height="4" rx="2" fill={FAINT} stroke={LINE} strokeWidth="0.5" />
      <rect x="66" y="114" width="88" height="20" rx="10" fill="currentColor" />
      <circle className="ta ta-ping" cx="110" cy="124" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path className="ta ta-cursor" d="M124 126l0-14 10 9-5 1 3 7-3 1-3-7-4 4z" fill="#fff" stroke="#0a0e1a" strokeWidth="1" strokeLinejoin="round" />
      <rect x="252" y="50" width="84" height="84" rx="8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.3" />
      <path d="M252 118l24-26 18 18 14-12 28 26z" fill="currentColor" fillOpacity="0.28" />
      <circle className="ta ta-pop" cx="356" cy="22" r="17" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.5" />
      <path className="ta ta-pop" d="M348 22l6 6 10-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Social() {
  return (
    <>
      <circle cx="298" cy="74" r="66" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.16" />
      <g className="ta ta-bob">
        <rect x="36" y="30" width="102" height="104" rx="9" fill={PANEL} stroke={LINE} />
        <circle cx="54" cy="46" r="7" fill="currentColor" fillOpacity="0.4" />
        <rect x="68" y="42" width="52" height="5" rx="2.5" fill={BAR} />
        <rect x="44" y="60" width="86" height="50" rx="5" fill="currentColor" fillOpacity="0.14" />
        <path d="M44 110l24-24 16 14 12-10 34 20z" fill="currentColor" fillOpacity="0.3" />
        <circle cx="108" cy="72" r="6" fill="currentColor" fillOpacity="0.5" />
        <g transform="translate(58 122) scale(0.7)">
          <path className="ta ta-heart" d={HEART} fill="currentColor" />
        </g>
      </g>
      <g className="ta ta-bob" style={d(0.5)}>
        <rect x="154" y="14" width="72" height="120" rx="12" fill={PANEL} stroke={LINE} />
        <path d="M178 58l22 14-22 14z" fill="currentColor" fillOpacity="0.85" />
        <rect x="164" y="104" width="44" height="4" rx="2" fill={BAR} />
        <rect x="164" y="114" width="30" height="4" rx="2" fill={FAINT} stroke={LINE} strokeWidth="0.5" />
      </g>
      <circle cx="298" cy="74" r="40" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 5" className="ta ta-spin" />
      <circle cx="298" cy="74" r="30" fill="currentColor" fillOpacity="0.16" />
      <circle cx="298" cy="66" r="9" fill="currentColor" fillOpacity="0.6" />
      <path d="M278 96c4-12 12-16 20-16s16 4 20 16z" fill="currentColor" fillOpacity="0.5" />
      {[238, 352, 346].map((x, i) => (
        <g key={x} transform={`translate(${x} ${i === 0 ? 44 : i === 1 ? 128 : 52})`}>
          <path className="ta ta-float" style={d(i * 0.7)} d={HEART} fill="currentColor" transform="scale(0.5)" />
        </g>
      ))}
    </>
  );
}

function Video() {
  return (
    <>
      <circle cx="92" cy="78" r="60" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.28" strokeWidth="4" />
      <path d="M74 48v60l52-30z" fill="currentColor" fillOpacity="0.4" />
      <rect x="190" y="20" width="194" height="108" fill={PANEL} stroke={LINE} />
      <path d="M190 100l44-38 30 26 22-18 52 40-148 0z" fill="currentColor" fillOpacity="0.16" />
      <circle cx="352" cy="42" r="8" fill="currentColor" fillOpacity="0.4" />
      <path
        className="ta ta-dash"
        pathLength="1"
        strokeDasharray="1"
        d="M200 108C230 100 250 104 276 84S320 64 336 52 364 36 372 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="ta ta-pop" style={d(1.4)} cx="372" cy="34" r="5" fill="currentColor" />
      <rect x="200" y="116" width="174" height="4" rx="2" fill={BAR} />
      <rect className="ta ta-grow-x" x="200" y="116" width="96" height="4" rx="2" fill="currentColor" />
    </>
  );
}

function Answer() {
  return (
    <>
      <path className="ta ta-twinkle" transform="translate(92 78) scale(1.05)" d={SPARK} fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
      <path className="ta ta-twinkle" style={d(1)} transform="translate(150 28) scale(0.22)" d={SPARK} fill="currentColor" fillOpacity="0.7" />
      <rect x="172" y="12" width="214" height="28" rx="14" fill={PANEL} stroke={LINE} />
      <rect x="190" y="22" width="120" height="5" rx="2.5" fill={BAR} />
      <rect x="172" y="50" width="214" height="86" rx="10" fill={PANEL} stroke={LINE} />
      <rect x="190" y="64" width="170" height="5" rx="2.5" fill={BAR} />
      <rect className="ta ta-grow-x" x="190" y="76" width="150" height="5" rx="2.5" fill={BAR} />
      <rect className="ta ta-grow-x" style={d(0.4)} x="190" y="88" width="120" height="5" rx="2.5" fill={BAR} />
      <rect className="ta ta-glow" x="190" y="108" width="74" height="18" rx="9" fill="currentColor" fillOpacity="0.18" stroke="currentColor" />
      <circle cx="202" cy="117" r="3.5" fill="currentColor" />
      <rect x="210" y="115" width="44" height="4" rx="2" fill="currentColor" fillOpacity="0.8" />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="ta ta-dot" style={d(i * 0.25)} cx={340 + i * 12} cy="117" r="3" fill="currentColor" />
      ))}
    </>
  );
}

function Growth() {
  return (
    <>
      <g fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.5">
        <circle cx="316" cy="78" r="64" />
        <circle cx="316" cy="78" r="42" />
        <circle cx="316" cy="78" r="20" fill="currentColor" fillOpacity="0.08" />
      </g>
      <line x1="30" y1="138" x2="300" y2="138" stroke={LINE} />
      {[28, 42, 38, 60, 74, 90, 110].map((h, i) => (
        <rect key={i} className="ta ta-grow-y" style={d(i * 0.15)} x={40 + i * 38} y={138 - h} width="24" height={h} rx="3" fill="currentColor" fillOpacity="0.36" />
      ))}
      <path
        className="ta ta-dash"
        pathLength="1"
        strokeDasharray="1"
        d="M50 110C90 100 110 96 140 84S196 62 226 46 280 22 304 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path className="ta ta-pop" style={d(1.2)} d="M296 10l14 4-8 12z" fill="currentColor" />
      <circle className="ta ta-pop" style={d(1.2)} cx="316" cy="78" r="6" fill="currentColor" />
    </>
  );
}

function AiContent() {
  return (
    <>
      <path className="ta ta-twinkle" transform="translate(86 74) scale(0.95)" d={SPARK} fill="currentColor" fillOpacity="0.09" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
      <rect className="ta ta-grow-x" x="40" y="14" width="150" height="6" rx="3" fill={BAR} />
      <rect className="ta ta-grow-x" style={d(0.5)} x="40" y="26" width="104" height="6" rx="3" fill={BAR} />
      <path className="ta ta-twinkle" style={d(0.6)} transform="translate(352 26) scale(0.28)" d={SPARK} fill="currentColor" />
      <path className="ta ta-twinkle" style={d(1.4)} transform="translate(330 46) scale(0.16)" d={SPARK} fill="currentColor" />
      <rect x="30" y="46" width="340" height="96" rx="8" fill={FAINT} stroke={LINE} />
      {[
        [40, 52, 90],
        [136, 52, 62],
        [204, 52, 116],
      ].map(([x, y, w]) => (
        <rect key={x} x={x} y={y} width={w} height="24" rx="5" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeOpacity="0.5" />
      ))}
      {Array.from({ length: 34 }, (_, i) => {
        const h = 4 + ((i * 7) % 13);
        return <rect key={i} x={42 + i * 9.6} y={98 - h / 2} width="5" height={h} rx="2.5" fill="currentColor" fillOpacity="0.4" />;
      })}
      <rect x="40" y="118" width="64" height="14" rx="4" fill={BAR} />
      <rect x="110" y="118" width="120" height="14" rx="4" fill={BAR} />
      <rect x="236" y="118" width="84" height="14" rx="4" fill={BAR} />
      <g className="ta ta-scan">
        <line x1="40" y1="46" x2="40" y2="142" stroke="currentColor" strokeWidth="2" />
        <path d="M34 40h12l-6 8z" fill="currentColor" />
      </g>
    </>
  );
}

function Ugc() {
  return (
    <>
      {[
        { x: 56, tag: "A" },
        { x: 166, tag: "B" },
        { x: 276, tag: "C" },
      ].map(({ x, tag }, i) => {
        const win = i === 1;
        return (
          <g key={tag} className={win ? "ta ta-bob" : undefined}>
            <rect
              className={win ? "ta ta-glow" : undefined}
              x={x}
              y="14"
              width="76"
              height="124"
              rx="12"
              fill={win ? "currentColor" : PANEL}
              fillOpacity={win ? 0.16 : 1}
              stroke={win ? "currentColor" : LINE}
              strokeWidth={win ? 1.6 : 1}
            />
            <rect x={x + 26} y="20" width="24" height="4" rx="2" fill={BAR} />
            <circle cx={x + 16} cy="38" r="9" fill="currentColor" fillOpacity={win ? 0.9 : 0.4} />
            <text x={x + 16} y="42" textAnchor="middle" fontSize="11" fontWeight="700" fill={win ? "#0a0e1a" : "#fff"}>
              {tag}
            </text>
            <path d={`M${x + 31} 64v30l26-15z`} fill="currentColor" fillOpacity={win ? 0.9 : 0.5} />
            <rect x={x + 10} y="108" width="48" height="4" rx="2" fill={BAR} />
            <rect x={x + 10} y="118" width="32" height="4" rx="2" fill={FAINT} stroke={LINE} strokeWidth="0.5" />
          </g>
        );
      })}
      <circle className="ta ta-pop" cx="236" cy="22" r="11" fill="currentColor" />
      <path className="ta ta-pop" d="M231 22l4 4 7-8" fill="none" stroke="#0a0e1a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function WebDesign() {
  return (
    <>
      <g stroke={LINE} strokeWidth="1" opacity="0.4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={`v${i}`} x1={i * 58} y1="0" x2={i * 58} y2="150" />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 55 + 10} x2="400" y2={i * 55 + 10} />
        ))}
      </g>
      <rect x="30" y="14" width="244" height="124" rx="8" fill={PANEL} stroke={LINE} />
      <rect x="42" y="24" width="30" height="6" rx="3" fill="currentColor" fillOpacity="0.7" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={170 + i * 30} y="24" width="22" height="5" rx="2.5" fill={BAR} />
      ))}
      <rect x="42" y="42" width="220" height="48" rx="5" fill="currentColor" fillOpacity="0.14" />
      <rect x="54" y="52" width="100" height="8" rx="3" fill={BAR} />
      <rect x="54" y="66" width="70" height="5" rx="2.5" fill={FAINT} stroke={LINE} strokeWidth="0.5" />
      <rect x="54" y="76" width="48" height="10" rx="5" fill="currentColor" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={42 + i * 76} y="100" width="68" height="30" rx="5" fill={FAINT} stroke={LINE} />
      ))}
      <circle cx="334" cy="76" r="38" fill="none" stroke={BAR} strokeWidth="8" />
      <circle
        className="ta ta-ring"
        cx="334"
        cy="76"
        r="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="0.06"
        transform="rotate(-90 334 76)"
      />
      <path className="ta ta-pop" d="M321 77l9 9 17-20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

const arts: Record<ArtId, () => JSX.Element> = {
  gbp: Gbp,
  "local-seo": LocalSeo,
  reviews: Reviews,
  "local-web": LocalWeb,
  "social-media": Social,
  youtube: Video,
  "geo-aeo": Answer,
  growth: Growth,
  "ai-content": AiContent,
  "ugc-ads": Ugc,
  web: WebDesign,
};

export function TileArt({
  id,
  color,
  className = "",
}: {
  id: ArtId;
  color: string;
  className?: string;
}) {
  const Art = arts[id];
  return (
    <svg
      viewBox="0 0 400 150"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ color }}
    >
      <Art />
    </svg>
  );
}
