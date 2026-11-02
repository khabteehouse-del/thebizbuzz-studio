import { chip } from "@/components/ui-kit/styles";

/*
  Decorative picture for the hero: a bar chart where the last bar is picked
  out in blue. It carries no numbers on purpose, it is an illustration of
  the idea and not a claim about results.
*/

const bars = [26, 36, 32, 50, 62, 78, 100];

type Props = {
  title: string;
  chips: string[];
  caption: string;
};

export function HeroArt({ title, chips, caption }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-accent/25 blur-3xl md:h-72 md:w-72" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-amber/15 blur-3xl md:h-56 md:w-56" />

      <div className="relative rounded border border-line bg-raised p-6 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-lg font-medium text-paper md:text-xl">{title}</p>
          <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-muted">
            {caption}
          </span>
        </div>

        <div className="mt-6 flex h-44 items-end gap-2 md:h-56 md:gap-3">
          {bars.map((pct, i) => {
            const last = i === bars.length - 1;
            const high = i > 3 && !last;
            const tone = last ? "border-accent-soft bg-accent" : high ? "bg-navy" : "bg-ink";
            return (
              <div
                key={i}
                className={`flex-1 rounded-t-sm border border-line ${tone}`}
                style={{ height: `${pct}%` }}
              />
            );
          })}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {chips.map((label) => (
            <li key={label} className={chip}>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
