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
  Order matters here. The fork sits third, directly after the positioning
  statement, so a visitor knows which half of the company is theirs
  before they have scrolled past two sections.
*/

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Tracks />
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
