/*
  Landing art for the blog strip: an original, hand-drawn scholar character
  (not based on any real person) who reads a book, then glances up at a
  glowing screen, and back again. Pure SVG plus CSS keyframes (see globals.css),
  so it is tiny, sharp on any screen and stops moving for reduced motion.
*/
export function ScholarArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 210"
      className={className}
      role="img"
      aria-label="A scholar reading a book and looking up at a glowing screen"
    >
      <defs>
        <radialGradient id="sc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6de2fc" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6de2fc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sc-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f3a52" />
          <stop offset="100%" stopColor="#0a1f33" />
        </linearGradient>
      </defs>

      {/* screen glow */}
      <ellipse className="scholar-glow" cx="262" cy="98" rx="86" ry="64" fill="url(#sc-glow)" />

      {/* desk */}
      <rect x="14" y="170" width="312" height="9" rx="3" fill="#12304a" />
      <rect x="40" y="179" width="8" height="24" fill="#0d2438" />
      <rect x="292" y="179" width="8" height="24" fill="#0d2438" />

      {/* monitor */}
      <rect x="212" y="58" width="104" height="72" rx="6" fill="#0a1626" stroke="#2a8fb0" strokeWidth="2" />
      <rect x="218" y="64" width="92" height="60" rx="3" fill="url(#sc-screen)" />
      <g className="scholar-lines" stroke="#6de2fc" strokeLinecap="round" strokeWidth="3">
        <line x1="226" y1="76" x2="276" y2="76" />
        <line x1="226" y1="86" x2="296" y2="86" opacity="0.7" />
        <line x1="226" y1="96" x2="262" y2="96" opacity="0.7" />
      </g>
      <g fill="#6de2fc" className="scholar-bars">
        <rect x="270" y="108" width="7" height="10" rx="1" />
        <rect x="281" y="102" width="7" height="16" rx="1" />
        <rect x="292" y="95" width="7" height="23" rx="1" />
      </g>
      <rect x="258" y="130" width="12" height="16" fill="#12304a" />
      <rect x="244" y="144" width="40" height="6" rx="3" fill="#12304a" />

      {/* drifting data sparks */}
      <g fill="#a8f1ff">
        <circle className="scholar-spark s1" cx="236" cy="52" r="2" />
        <circle className="scholar-spark s2" cx="268" cy="48" r="1.6" />
        <circle className="scholar-spark s3" cx="298" cy="54" r="2" />
      </g>

      {/* chair back */}
      <rect x="62" y="104" width="22" height="66" rx="8" fill="#0d2438" />

      {/* body: teal cardigan */}
      <path d="M72 170 C70 136 88 118 118 116 C148 118 164 136 162 170 Z" fill="#1f7f8c" />
      <path d="M118 118 L118 170" stroke="#145a66" strokeWidth="3" />
      <circle cx="124" cy="138" r="2.4" fill="#0e3f49" />
      <circle cx="124" cy="152" r="2.4" fill="#0e3f49" />
      <path d="M104 118 L118 134 L132 118" fill="#eef4f8" />

      {/* open book on the desk */}
      <g>
        <path d="M70 166 L116 156 L116 132 L70 142 Z" fill="#f4efe0" stroke="#c9bfa2" strokeWidth="1" />
        <path d="M162 166 L116 156 L116 132 L162 142 Z" fill="#faf6ea" stroke="#c9bfa2" strokeWidth="1" />
        <path d="M116 132 L116 156" stroke="#b3a782" strokeWidth="1.5" />
        <g stroke="#9aa5ad" strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
          <line x1="76" y1="148" x2="108" y2="142" />
          <line x1="76" y1="154" x2="108" y2="148" />
          <line x1="124" y1="142" x2="156" y2="148" />
          <line x1="124" y1="148" x2="156" y2="154" />
        </g>
        <path className="scholar-page" d="M116 132 L158 142 L158 164 L116 156 Z" fill="#fffdf4" stroke="#d8cfb3" strokeWidth="1" />
      </g>

      {/* hands */}
      <ellipse cx="86" cy="157" rx="8" ry="5" fill="#f2c9a5" />
      <ellipse cx="150" cy="159" rx="8" ry="5" fill="#f2c9a5" />

      {/* head */}
      <g className="scholar-head">
        {/* wild white hair, behind the face */}
        <g fill="#f4f6f8">
          <circle cx="92" cy="78" r="13" />
          <circle cx="86" cy="64" r="11" />
          <circle cx="98" cy="50" r="12" />
          <circle cx="116" cy="44" r="13" />
          <circle cx="134" cy="50" r="12" />
          <circle cx="146" cy="64" r="11" />
          <circle cx="142" cy="78" r="13" />
          <circle cx="84" cy="48" r="7" />
          <circle cx="150" cy="46" r="7" />
        </g>
        {/* face */}
        <ellipse cx="118" cy="82" rx="27" ry="31" fill="#f2c9a5" />
        <circle cx="91" cy="86" r="5" fill="#eab995" />
        <circle cx="145" cy="86" r="5" fill="#eab995" />
        {/* brows */}
        <path d="M100 68 Q108 63 114 68" stroke="#e4e8ec" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M122 68 Q128 63 136 68" stroke="#e4e8ec" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        {/* eyes with pupils that travel between book and screen */}
        <circle cx="107" cy="78" r="9" fill="#ffffff" />
        <circle cx="129" cy="78" r="9" fill="#ffffff" />
        <g className="scholar-look">
          <g className="scholar-blink">
            <circle cx="107" cy="78" r="3.6" fill="#13233b" />
            <circle cx="129" cy="78" r="3.6" fill="#13233b" />
          </g>
        </g>
        {/* round glasses */}
        <g fill="none" stroke="#223049" strokeWidth="2.4">
          <circle cx="107" cy="78" r="10.5" />
          <circle cx="129" cy="78" r="10.5" />
          <path d="M117.5 78 L118.5 78" />
          <path d="M96.5 76 L90 73" />
          <path d="M139.5 76 L146 73" />
        </g>
        {/* nose and a soft smile */}
        <path d="M118 84 Q122 92 117 95" stroke="#d9a57f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M108 102 Q118 108 128 102" stroke="#a8603f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
