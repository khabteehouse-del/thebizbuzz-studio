import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { DecodeText } from "@/components/shared/decode-text";
import { copy } from "@/data/copy";
import { industryKeys, industryPath, type Lang } from "@/data/i18n";

/*
  Industry list as large rows: the name decodes on hover, a bar and tint
  slide in, the arrow lifts. Same hover language as the BizBuzz approach list.
*/
export function IndustryRows({ lang }: { lang: Lang }) {
  const c = copy[lang];

  return (
    <ul className="border-t border-line">
      {industryKeys.map((key, i) => {
        const ind = c.industries[key];
        return (
          <li key={key} className="border-b border-line">
            <Reveal delay={i * 0.05}>
              <Link
                href={industryPath(key, lang)}
                className="group relative grid items-center gap-2 px-2 py-5 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent-soft/[0.06] md:grid-cols-[1.2fr_1fr_auto] md:gap-8 md:px-5 md:py-5"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-0 top-3 w-[2px] rounded-full bg-accent-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="font-display text-xl font-medium tracking-[-0.025em] text-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 md:text-2xl">
                  <DecodeText text={ind.name} hoverOnly />
                </span>
                <span className="text-sm text-muted transition-colors duration-300 group-hover:text-paper/75 md:text-base">
                  {ind.focus}
                </span>
                <ArrowUpRight
                  size={22}
                  aria-hidden="true"
                  className="hidden text-paper/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#ffb938] md:block"
                />
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
