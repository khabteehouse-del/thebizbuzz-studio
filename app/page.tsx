import { Hero } from "@/components/sections/hero";
import { site } from "@/data/site";
import { Intro } from "@/components/sections/intro";
import { Tracks } from "@/components/sections/tracks";
import { Services } from "@/components/sections/services";
import { ToolsStrip } from "@/components/sections/tools-strip";
import { Work } from "@/components/sections/work";
import { BlogStrip } from "@/components/sections/blog-strip";
import { Approach } from "@/components/sections/approach";
import { Team } from "@/components/sections/team";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { faq } from "@/data/content";

export const metadata = {
  title: { absolute: site.seoTitle },
  alternates: { canonical: "/" },
};

/* The two things we sell, described only with what is already on the site. */
const provider = { "@type": "Organization", name: "The Biz Buzz", url: site.url };
const areaServed = [
  { "@type": "Country", name: "Pakistan" },
  { "@type": "Country", name: "United Arab Emirates" },
];
const serviceSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital marketing",
    serviceType: "Digital marketing",
    description:
      "Local search and Google Business Profile optimisation, social media management and content for growing brands.",
    provider,
    areaServed,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI solutions",
    serviceType: "AI solutions",
    description:
      "AI-integrated websites, enterprise AI dashboards, document agents and self-hosted retrieval systems built to production standard.",
    provider,
    areaServed,
  },
];

/* Same questions and answers as the visible FAQ section, so Google can show them. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/*
  Order matters here. Tracks now sits second, right after the hero, so
  a visitor hits the actionable fork immediately. Intro's positioning
  copy follows to reinforce whichever side they land on, rather than
  sitting as abstract text before any decision point.
*/

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Hero />
      <Tracks />
      <Intro />
      <Services />
      <ToolsStrip />
      <Work />
      <BlogStrip />
      <Approach />
      <Team />
      <Faq />
      <Cta />
    </>
  );
}