import type { Metadata } from "next";
import { Button } from "@/components/shared/button";
import { BreadcrumbSchema } from "@/components/shared/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Accentuate Your Revenues",
  description:
    "Accentuate Your Revenues is the US-facing arm of BizBuzz: websites, local SEO, Google Business Profile, ad campaigns and video ads for US businesses.",
  alternates: { canonical: "/accentuate" },
};

const services = [
  {
    title: "Websites",
    body: "Fast, clear sites built to turn visitors into calls and bookings.",
  },
  {
    title: "Local SEO",
    body: "Be found for what people near you actually search.",
  },
  {
    title: "Google Business Profile",
    body: "A profile that is complete, current and earning reviews.",
  },
  {
    title: "Ad campaigns",
    body: "Paid campaigns set up, watched and reported in plain numbers.",
  },
  {
    title: "Video and UGC ads",
    body: "Short video ads and creator-style content for social and search.",
  },
];

export default function AccentuatePage() {
  return (
    <div className="relative min-h-dvh pb-24 pt-32 md:pb-32 md:pt-48">
      <BreadcrumbSchema
        items={[{ name: "Accentuate Your Revenues", path: "/accentuate" }]}
      />
      <div className="shell">
        <p className="section-label">Part of BizBuzz</p>
        <h1 className="mt-7 max-w-3xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-paper sm:text-4xl md:text-6xl">
          Accentuate Your Revenues
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          The US-facing arm of BizBuzz. Same team, same standard of work,
          focused on businesses across the United States.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Button
            href="https://accentuateyourrevenues.com"
            size="lg"
            external
          >
            Visit accentuateyourrevenues.com
          </Button>
          <Button href="/#contact" variant="ghost" size="lg">
            Talk to us first
          </Button>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s.title}
              className="rounded-2xl border border-paper/10 p-7"
            >
              <h2 className="font-display text-xl font-medium tracking-[-0.02em] text-paper">
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-paper/60">
                {s.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-xl text-sm leading-relaxed text-muted">
          Prices depend on the business and the goal, so every project starts
          with a short conversation and a quote.
        </p>
      </div>
    </div>
  );
}
