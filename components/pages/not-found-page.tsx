import { Button } from "@/components/shared/button";
import { Orbs } from "@/components/shared/orbs";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

export function NotFoundPage({ lang }: { lang: Lang }) {
  const n = copy[lang].notFound;
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-ink py-32">
      <Orbs tone="mixed" intensity={0.9} />
      <div className="shell relative z-10">
        <p className="font-display text-[clamp(6rem,24vw,18rem)] font-medium italic leading-none tracking-[-0.06em] text-paper/10">
          404
        </p>
        <h1 className="-mt-6 font-display text-3xl font-medium tracking-[-0.03em] text-paper md:-mt-14 md:text-6xl">
          {n.title}
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{n.text}</p>
        <div className="mt-9">
          <Button href={path("home", lang)} variant="primary" size="lg" className="w-[16rem] justify-between">
            {n.back}
          </Button>
        </div>
      </div>
    </section>
  );
}
