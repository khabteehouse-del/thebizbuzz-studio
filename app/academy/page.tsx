import type { Metadata } from "next";
import { academyFaq, academyPlans, offerPrice } from "@/data/academy";
import { site } from "@/data/site";
import { BreadcrumbSchema } from "@/components/shared/breadcrumb-schema";
import {
  AcademyConnect,
  AcademyCertificate,
  AcademyFaq,
  AcademyFinalCta,
  AcademyGains,
  AcademyHero,
  AcademyFacts,
  AcademyInstructor,
  AcademyJourney,
  AcademyPlans,
  AcademySeoSoon,
  AcademyVoiceSoon,
  AcademyTools,
} from "@/components/academy/sections";
import "./academy.css";

export const metadata: Metadata = {
  title: "Online AI Courses in Pakistan",
  description:
    "BizBuzz AI Academy: practical online AI courses open to learners across Pakistan and beyond. Three paths from AI Essentials to building AI solutions, with hands-on projects and a BizBuzz certificate of completion.",
  alternates: { canonical: "/academy" },
  openGraph: {
    title: "BizBuzz AI Academy | Online AI Courses in Pakistan",
    description:
      "Learn AI. Build with AI. Three practical online learning paths, from everyday AI use to building AI-powered solutions.",
    url: `${site.url}/academy`,
    type: "website",
    images: [
      {
        url: "/images/academy/banner.webp",
        width: 1920,
        height: 1080,
        alt: "BizBuzz AI Academy",
      },
    ],
  },
};

const provider = { "@type": "Organization", name: "The Biz Buzz", url: site.url };

const courseSchema = academyPlans.map((plan) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: `${plan.name} | BizBuzz AI Academy`,
  description: plan.benefit,
  url: `${site.url}/academy#plans`,
  provider,
  educationalCredentialAwarded: "BizBuzz certificate of completion",
  offers: {
    "@type": "Offer",
    category: "Paid",
    priceCurrency: "PKR",
    price: offerPrice(plan),
    url: `${site.url}/academy#plans`,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: plan.workload,
  },
}));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: academyFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AcademyPage() {
  return (
    <div className="ac">
      <BreadcrumbSchema items={[{ name: "AI Academy", path: "/academy" }]} />
      {courseSchema.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AcademyHero />
      <AcademyFacts />
      <AcademySeoSoon />
      <AcademyVoiceSoon />
      <AcademyGains />
      <AcademyPlans />
      <AcademyJourney />
      <AcademyTools />
      <AcademyInstructor />
      <AcademyConnect />
      <AcademyCertificate />
      <AcademyFaq />
      <AcademyFinalCta />
    </div>
  );
}
