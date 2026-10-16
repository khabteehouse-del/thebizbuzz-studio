import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DesignGallery } from "@/components/design/gallery";
import { designCategories, designCredit, designs } from "@/data/designs";

export const metadata: Metadata = {
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
        {/* Decorative depth: red light and a receding grid floor. */}
        <div className="dz-stage" aria-hidden="true">
          <span className="dz-orb dz-orb--a" />
          <span className="dz-orb dz-orb--b" />
          <span className="dz-orb dz-orb--c" />
          <span className="dz-floor" />
        </div>

        <div className="dz-shell">
          <Link href="/#studio-services" className="dz-back">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to services
          </Link>

          <p className="dz-kicker">BizBuzz Design Studio</p>
          <h1 className="dz-title dz-display">
            Where brands get their <em>shape</em>
          </h1>
          <p className="dz-lede">
            Identity systems, logos, flyers and posters from the BizBuzz design
            team. Filter by discipline, then open any piece full screen.
          </p>

          <div className="dz-stats">
            <span className="dz-stat dz-glass">
              <b>{designs.length}</b>pieces
            </span>
            <span className="dz-stat dz-glass">
              <b>{designCategories.length}</b>disciplines
            </span>
          </div>
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
          <Link href="/#contact" className="dz-cta-btn">
            Start a project
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <p className="dz-credit">Design by {designCredit}</p>
      </section>
    </div>
  );
}
