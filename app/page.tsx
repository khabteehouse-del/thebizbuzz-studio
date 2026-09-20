import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Tracks } from "@/components/sections/tracks";
import { Services } from "@/components/sections/services";
import { ToolsStrip } from "@/components/sections/tools-strip";
import { Work } from "@/components/sections/work";
import { Approach } from "@/components/sections/approach";
import { Team } from "@/components/sections/team";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

/*
  Order matters here. Tracks now sits second, right after the hero, so
  a visitor hits the actionable fork immediately. Intro's positioning
  copy follows to reinforce whichever side they land on, rather than
  sitting as abstract text before any decision point.
*/

export default function Home() {
  return (
    <>
      <Hero />
      <Tracks />
      <Intro />
      <Services />
      <ToolsStrip />
      <Work />
      <Approach />
      <Team />
      <Faq />
      <Cta />
    </>
  );
}