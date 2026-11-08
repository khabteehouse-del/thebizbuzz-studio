import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { servicePages, getServicePage } from "@/data/service-pages";
import { site } from "@/data/site";
import { Button } from "@/components/shared/button";
import { BreadcrumbSchema } from "@/components/shared/breadcrumb-schema";
import { ServiceBanner } from "@/components/shared/service-banner";
import { ServiceBannerFrame, ServiceNavRow } from "@/components/shared/service-nav";
import { ServiceScreens } from "@/components/shared/service-screens";
import { DesignGallery } from "@/components/design/gallery";
import { designCredit } from "@/data/designs";
import "@/app/design/design.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: `${site.url}/services/${page.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  const service = services.find((s) => s.id === page?.id);
  if (!page || !service) notFound();

  const related = page.related
    .map((id) => ({
      service: services.find((s) => s.id === id),
      page: servicePages.find((p) => p.id === id),
    }))
    .filter((r) => r.service && r.page);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.seoTitle,
    description: page.seoDescription,
    url: `${site.url}/services/${page.slug}`,
    provider: { "@type": "Organization", name: "The Biz Buzz", url: site.url },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const h2 =
    "font-display text-2xl font-medium leading-tight tracking-[-0.025em] text-paper md:text-4xl";

  return (
    <div className={`relative min-h-dvh pb-24 pt-28 md:pb-32 md:pt-40${page.id === "brand" ? " dz" : ""}`}>
      <BreadcrumbSchema
        items={[
          { name: "Services", path: "/#tracks" },
          { name: service.title, path: `/services/${page.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="shell">
        <Link href="/#tracks" className="text-sm text-muted transition-colors hover:text-paper">
          All services
        </Link>

        <div className="mt-6">
          <ServiceBannerFrame id={service.id}>
            <ServiceBanner service={service} page={page} />
          </ServiceBannerFrame>
          <ServiceNavRow id={service.id} />
        </div>

        <p className="section-label mt-12" style={{ color: service.mark }}>
          {service.id === "mizar"
            ? "Our flagship app"
            : service.track === "local"
              ? "Local growth"
              : "Brand and AI"}
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-paper sm:text-4xl md:text-6xl">
          {service.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/75 md:text-lg">
          {page.lead}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          {service.link ? (
            <Button href={service.link.href} size="lg" external>
              {service.link.cta}
            </Button>
          ) : (
            <Button href="/#contact" size="lg">
              Get a quote
            </Button>
          )}
        </div>

        {page.screens && (
          <section className="mt-20 md:mt-28">
            <h2 className={h2}>See it on your phone</h2>
            <ServiceScreens screens={page.screens} accent={service.mark} />
          </section>
        )}

        <section className="mt-20 md:mt-28">
          <h2 className={h2}>Who this is for</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {page.whoFor.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-paper/10 p-5 text-sm leading-relaxed text-paper/80">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0" style={{ backgroundColor: service.mark }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 md:mt-28">
          <h2 className={h2}>What we do</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {page.whatWeDo.map((item) => (
              <article key={item.h} className="rounded-2xl border border-paper/10 p-7" style={{ backgroundColor: `${service.mark}0d` }}>
                <h3 className="font-display text-lg font-medium text-paper">{item.h}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{item.p}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 md:mt-28">
          <h2 className={h2}>How it works</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {page.process.map((step, i) => (
              <li key={step.h} className="relative rounded-2xl border border-paper/10 p-6">
                <span className="font-display text-sm" style={{ color: service.mark }}>
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-medium text-paper">{step.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">{step.p}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 md:mt-28">
          <h2 className={h2}>What you receive</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {page.deliverables.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-paper/80">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0" style={{ backgroundColor: service.mark }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {page.tech && (
          <section className="mt-20 md:mt-28">
            <h2 className={h2}>Tech stack and tools</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {page.tech.map((group) => (
                <div key={group.group} className="rounded-2xl border border-paper/10 p-6">
                  <h3 className="font-display text-sm uppercase tracking-[0.14em]" style={{ color: service.mark }}>
                    {group.group}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-paper/75">
                    {group.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-20 md:mt-28">
          <h2 className={h2}>Common questions</h2>
          <div className="mt-8 divide-y divide-paper/10 border-y border-paper/10">
            {page.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none font-display text-base text-paper marker:hidden md:text-lg">
                  {f.q}
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/70">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-20 md:mt-28">
            <h2 className={h2}>Related services</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.page!.id}>
                  <Link
                    href={`/services/${r.page!.slug}`}
                    className="block h-full rounded-2xl border p-6 transition-colors duration-300 hover:bg-paper/[0.03]"
                    style={{ borderColor: `${r.service!.mark}44` }}
                  >
                    <span className="font-display text-lg text-paper">{r.service!.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-paper/60">
                      {r.service!.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {page.id === "brand" && (
          <section id="gallery" className="mt-20 md:mt-28" aria-label="Design gallery">
            <p className="dz-kicker">BizBuzz Design Studio</p>
            <h2 className="dz-title dz-display">
              <span className="dz-line">Where brands</span>
              <span className="dz-line dz-line--shape">
                get their <em>shape</em>
                <span className="dz-morph" aria-hidden="true" />
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/70">
              Identity systems, logos, flyers and posters. Filter by discipline, then open any piece full screen.
            </p>
            <div className="mt-8">
              <DesignGallery />
            </div>
            <p className="dz-credit">Crafted by the {designCredit}</p>
          </section>
        )}

        <div className="mt-20 rounded-2xl border p-8 md:mt-28 md:p-12" style={{ borderColor: `${service.mark}44`, backgroundColor: service.tint }}>
          <h2 className={h2}>Talk to us about {service.title.toLowerCase()}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/70">
            Tell us about your business and we will reply with an honest view and a quote.
          </p>
          <div className="mt-6">
            <Button href="/#contact" size="lg">
              Get a quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
