import { CtaLink } from "@/components/ui-kit/cta";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

export function NotFoundPage({ lang }: { lang: Lang }) {
  const n = copy[lang].notFound;
  return (
    <section className="bg-canvas py-24 md:py-32">
      <div className="shell max-w-2xl text-center">
        <p className="font-display text-7xl font-extrabold text-coral md:text-9xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-5xl">
          {n.title}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{n.text}</p>
        <div className="mt-8 flex justify-center">
          <CtaLink href={path("home", lang)}>{n.back}</CtaLink>
        </div>
      </div>
    </section>
  );
}
