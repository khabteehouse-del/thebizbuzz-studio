/*
  Fixed noise layer sitting over everything.
  You should never consciously see this. Remove it and the page goes
  flat, which is the whole point of it being here.

  The grain is an inline SVG turbulence filter, so it costs no network
  request and no image file.

  No blend mode. A fullscreen mix-blend-overlay forces the browser to
  recomposite the entire page on every frame, which is expensive during
  scroll. Plain opacity looks nearly identical here and costs nothing.
*/
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.05]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px",
      }}
    />
  );
}
