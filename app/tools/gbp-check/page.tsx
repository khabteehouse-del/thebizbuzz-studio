import type { Metadata } from "next";
import { GbpChecker } from "@/components/tools/gbp-checker";
import { MapPinPulse } from "@/components/shared/map-pin-pulse";

export const metadata: Metadata = {
  title: "Free Google Business Profile check",
  description:
    "Twelve questions, two minutes. Find out what your Google listing is costing you in customers, and get a written plan to fix it.",
};

export default function GbpCheckPage() {
  return (
    <div className="relative min-h-dvh bg-ink pb-24 pt-32 md:pb-32 md:pt-48">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="scale-[0.85] md:scale-100">
              <MapPinPulse colour="#4fd1c5" size={150} />
            </div>
          </div>

          <p className="section-label justify-center">Free tool</p>
          <h1 className="mt-7 font-display text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-paper sm:text-4xl md:text-6xl">
            How good is your Google listing?
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted">
            Most local businesses lose customers to competitors with worse
            service and better profiles. Two minutes tells you which side you
            are on.
          </p>
        </div>

        <div className="mt-16">
          <GbpChecker />
        </div>
      </div>
    </div>
  );
}
