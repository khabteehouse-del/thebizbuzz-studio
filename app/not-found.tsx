import Link from "next/link";
import { Button } from "@/components/shared/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh items-center bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-navy) 0%, transparent 70%)",
          opacity: 0.5,
        }}
      />

      <div className="shell relative z-10">
        <p className="section-label">Page not found</p>

        <h1 className="mt-8 font-display text-[clamp(4rem,16vw,13rem)] font-medium leading-[0.9] tracking-[-0.05em] text-paper">
          404
        </h1>

        <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
          This page does not exist, or it moved. Nothing on this site is deep
          enough to get properly lost in, so the way back is short.
        </p>

        <div className="mt-11 flex flex-wrap items-center gap-4">
          <Button href="/" variant="primary" size="lg">
            Back to the site
          </Button>
          <Link
            href="/tools/gbp-check"
            className="text-sm text-[#4fd1c5] transition-colors duration-200 hover:text-paper"
          >
            Or run the free listing check
          </Link>
        </div>
      </div>
    </div>
  );
}
