import { CtaLink } from "@/components/ui-kit/cta";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

export function NotFoundPage({ lang }: { lang: Lang }) {
  const n = copy[lang].notFound;
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="shell max-w-2xl text-center">
        <p className="font-display text-7xl font-medium text-amber md:text-9xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-medium text-paper md:text-5xl">
          {n.title}
        </h1>
        <p className="mt-4 text-lg text-paper/75">{n.text}</p>
        <div className="mt-8 flex justify-center">
          <CtaLink href={path("home", lang)}>{n.back}</CtaLink>
        </div>
      </div>
    </section>
  );
}
