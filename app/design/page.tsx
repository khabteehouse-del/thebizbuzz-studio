import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DesignGallery } from "@/components/design/gallery";
import { designCredit } from "@/data/designs";

export const metadata: Metadata = {
  alternates: { canonical: "/design" },
  title: "Design studio",
  description:
    "Brand identity, logos, flyers and posters from the BizBuzz design team. Browse the work by discipline and open any piece full screen.",
  openGraph: {
    title: "Design studio | BizBuzz",
    description:
      "Brand identity, logos, flyers and posters from the BizBuzz design team.",
    images: [{ url: "/images/design/brand/astoria-board.webp" }],
  },
};

export default function DesignPage() {
  return (
    <div className="dz">
      <section className="dz-hero dz-portal">
        {/* Decorative depth: soft red light. */}
        <div className="dz-stage" aria-hidden="true">
          <span className="dz-orb dz-orb--a" />
          <span className="dz-orb dz-orb--b" />
          <span className="dz-orb dz-orb--c" />
        </div>

        <div className="dz-shell">
          <Link href="/#studio-services" className="dz-back">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to services
          </Link>

          <p className="dz-kicker">BizBuzz Design Studio</p>
          <h1 className="dz-title dz-display">
            <span className="dz-line">Where brands</span>
            <span className="dz-line dz-line--shape">
              get their <em>shape</em>
              <span className="dz-morph" aria-hidden="true" />
            </span>
          </h1>
          <p className="dz-lede">
            Identity systems, logos, flyers and posters from the BizBuzz design
            team. Filter by discipline, then open any piece full screen.
          </p>
        </div>

        <div className="dz-scroll" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </section>

      <section className="dz-shell dz-bottom" aria-label="Design gallery">
        <DesignGallery />

        <div className="dz-cta dz-glass">
          <h2 className="dz-display">Have a brand that needs a shape?</h2>
          <p>
            Tell us what you are building and we will come back with a
            direction.
          </p>
          <Link href="/#contact" className="dz-cta-btn fuse-btn">
            <span className="relative z-10">Start a project</span>
            <span className="dz-cta-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>

        <p className="dz-credit">Crafted by the {designCredit}</p>
      </section>
    </div>
  );
}
