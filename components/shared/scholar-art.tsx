/*
  Landing art for the blog strip: an original silhouette of a thinker (not
  based on any real person) reading a glowing book, then lifting his head to
  a holographic screen, and back. Pure SVG plus CSS keyframes (see globals.css),
  so it is tiny, sharp on any screen and holds still for reduced motion.
  The cyan rim light is a shifted copy of each shape drawn behind the dark one.
*/
export function ScholarArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 210"
      className={className}
      role="img"
      aria-label="A silhouetted thinker reading a book, then looking up at a glowing screen"
    >
      <defs>
        <radialGradient id="sc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6de2fc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6de2fc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sc-beam" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#6de2fc" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6de2fc" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sc-floor" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6de2fc" stopOpacity="0" />
          <stop offset="55%" stopColor="#6de2fc" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6de2fc" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="sc-book" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9f6ff" />
          <stop offset="100%" stopColor="#8fdcf2" />
        </linearGradient>

        {/* silhouette shapes, reused for the rim-light copy */}
        <g id="sc-head-shape">
          <ellipse cx="120" cy="80" rx="20" ry="25" />
          <ellipse cx="139" cy="83" rx="5" ry="4.5" />
          <ellipse cx="134" cy="99" rx="9" ry="6" />
          <circle cx="103" cy="62" r="12" />
          <circle cx="114" cy="53" r="13" />
          <circle cx="128" cy="54" r="12" />
          <circle cx="98" cy="76" r="11" />
          <circle cx="100" cy="90" r="8" />
          <circle cx="92" cy="58" r="7" />
          <rect x="110" y="98" width="18" height="24" />
        </g>
        <g id="sc-body-shape">
          <path d="M78 172 C74 140 90 120 114 116 L136 116 C152 120 164 134 166 154 L168 172 Z" />
          <path d="M132 124 L158 146 L152 154 L126 134 Z" />
        </g>
      </defs>

      {/* screen glow and light beam toward the thinker */}
      <ellipse className="scholar-glow" cx="262" cy="96" rx="92" ry="68" fill="url(#sc-glow)" />
      <path d="M222 70 L150 84 L150 146 L222 126 Z" fill="url(#sc-beam)" />

      {/* floor line with a soft cyan sheen */}
      <rect x="14" y="170" width="312" height="2" fill="url(#sc-floor)" />

      {/* holographic screen */}
      <g>
        <rect x="216" y="52" width="102" height="82" rx="6" fill="#6de2fc" fillOpacity="0.07" stroke="#6de2fc" strokeOpacity="0.75" strokeWidth="1.4" />
        <g className="scholar-lines" stroke="#6de2fc" strokeLinecap="round" strokeWidth="2.2">
          <line x1="228" y1="66" x2="270" y2="66" />
          <line x1="228" y1="75" x2="292" y2="75" opacity="0.6" />
          <line x1="228" y1="84" x2="258" y2="84" opacity="0.6" />
        </g>
        <g fill="#6de2fc" className="scholar-bars">
          <rect x="268" y="112" width="7" height="10" rx="1" />
          <rect x="279" y="105" width="7" height="17" rx="1" />
          <rect x="290" y="97" width="7" height="25" rx="1" />
        </g>
        <circle className="scholar-ring" cx="240" cy="110" r="12" fill="none" stroke="#a8f1ff" strokeWidth="1.4" strokeDasharray="6 5" />
        <circle cx="240" cy="110" r="3" fill="#a8f1ff" />
        <rect x="262" y="134" width="4" height="14" fill="#6de2fc" fillOpacity="0.4" />
      </g>

      {/* sparks rising from the screen */}
      <g fill="#a8f1ff">
        <circle className="scholar-spark s1" cx="232" cy="46" r="1.8" />
        <circle className="scholar-spark s2" cx="266" cy="42" r="1.5" />
        <circle className="scholar-spark s3" cx="300" cy="48" r="1.8" />
      </g>

      {/* body: rim copy, then dark shape */}
      <g fill="#6de2fc" opacity="0.55" transform="translate(2.2 -0.6)">
        <use href="#sc-body-shape" />
      </g>
      <g fill="#050912">
        <use href="#sc-body-shape" />
      </g>

      {/* glowing book held open on the lap */}
      <g>
        <ellipse cx="148" cy="160" rx="34" ry="8" fill="#6de2fc" fillOpacity="0.25" />
        <path d="M118 160 L148 150 L148 130 L118 140 Z" fill="url(#sc-book)" />
        <path d="M178 160 L148 150 L148 130 L178 140 Z" fill="url(#sc-book)" fillOpacity="0.9" />
        <path d="M148 130 L148 150" stroke="#4aa9c4" strokeWidth="1.2" />
        <g stroke="#4f9fb8" strokeWidth="1" strokeLinecap="round" opacity="0.7">
          <line x1="124" y1="147" x2="143" y2="141" />
          <line x1="124" y1="152" x2="143" y2="146" />
          <line x1="154" y1="141" x2="173" y2="147" />
          <line x1="154" y1="146" x2="173" y2="152" />
        </g>
        <path className="scholar-page" d="M148 130 L176 140 L176 158 L148 150 Z" fill="#effbff" />
      </g>
      {/* hands over the book */}
      <ellipse cx="124" cy="156" rx="8" ry="4.5" fill="#050912" />
      <ellipse cx="172" cy="157" rx="8" ry="4.5" fill="#050912" />

      {/* head: rim copy brightens while he looks at the screen */}
      <g className="scholar-head">
        <g className="scholar-rim" fill="#6de2fc" transform="translate(2.4 -0.6)">
          <use href="#sc-head-shape" />
        </g>
        <g fill="#050912">
          <use href="#sc-head-shape" />
        </g>
      </g>
    </svg>
  );
}
