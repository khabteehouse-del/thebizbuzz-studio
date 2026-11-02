import { chip } from "@/components/ui-kit/styles";

/*
  Decorative picture for the hero: a bar chart where the last bar is picked
  out in coral. It carries no numbers on purpose, it is an illustration of
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
      <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-sun md:h-52 md:w-52" />
      <div className="absolute -bottom-5 -left-5 h-24 w-24 rotate-12 rounded-xl bg-violet md:h-32 md:w-32" />

      <div className="relative rounded-2xl border-2 border-ink bg-white p-6 shadow-[8px_8px_0_0_var(--color-ink)] md:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-lg font-bold text-ink md:text-xl">{title}</p>
          <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-muted">
            {caption}
          </span>
        </div>

        <div className="mt-6 flex h-44 items-end gap-2 md:h-56 md:gap-3">
          {bars.map((pct, i) => {
            const last = i === bars.length - 1;
            const high = i > 3 && !last;
            const tone = last ? "bg-coral" : high ? "bg-lilac" : "bg-canvas";
            return (
              <div
                key={i}
                className={`flex-1 rounded-t-md border-2 border-ink ${tone}`}
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
