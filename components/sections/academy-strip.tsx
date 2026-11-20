import Image from "next/image";
import Link from "next/link";
import {
  ACADEMY_OFFER_PERCENT,
  academyJoinHref,
  academyPlans,
  formatPkr,
  offerPrice,
} from "@/data/academy";
import { Reveal } from "@/components/shared/reveal";
import { CapIcon } from "@/components/academy/icons";
import "@/app/academy/academy.css";

/*
  Homepage band for the BizBuzz AI Academy. Bright blue on purpose, so it
  stands out from the dark sections around it and reads as its own place.
  Image sits on the right on desktop and on top on phones. The "from"
  price is the lowest offer price, read from the academy data.
*/
export function AcademyStrip() {
  const lowest = Math.min(...academyPlans.map(offerPrice));

  return (
    <section id="academy" className="acs" aria-labelledby="acs-title">
      <div className="shell">
        <Reveal>
          <div className="acs-card">
            <div className="acs-body">
              <p className="acs-label">
                <CapIcon width={18} height={18} /> BizBuzz AI Academy
              </p>
              <h2 id="acs-title" className="acs-title">
                Learn AI.
                <br />
                <span>Build with AI.</span>
              </h2>
              <p className="acs-text">
                Practical online AI courses for Bahria Town Karachi. Three
                learning paths, from everyday AI use to building real
                AI-powered solutions, with a BizBuzz certificate.
              </p>
              <p className="acs-price">
                From <strong>{formatPkr(lowest)}</strong>, {ACADEMY_OFFER_PERCENT}% launch offer
              </p>
              <div className="acs-actions">
                <Link href="/academy" className="acs-btn acs-btn--white">
                  Explore the Academy
                </Link>
                <a
                  href={academyJoinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="acs-btn acs-btn--outline"
                >
                  Enroll on WhatsApp
                </a>
              </div>
            </div>
            <div className="acs-media" aria-hidden="true">
              <Image
                src="/images/academy/banner.webp"
                alt=""
                fill
                sizes="(min-width: 900px) 55vw, 100vw"
                quality={80}
                className="acs-img"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
