import { Hero } from "@/components/sections/hero";
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
  alternates: { canonical: "/" },
};

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