import { Shell } from "@/components/pretty-jin/shell";
import { Hero } from "@/components/pretty-jin/hero";
import {
  Marquee,
  Milkyway,
  Services,
  Menu,
  Experience,
  Journey,
  Visit,
  Final,
  Foot,
} from "@/components/pretty-jin/sections";

export default function PrettyJinDemo() {
  return (
    <Shell>
      <Hero />
      <Marquee />
      <Milkyway />
      <Services />
      <Menu />
      <Experience />
      <Journey />
      <Visit />
      <Final />
      <Foot />
    </Shell>
  );
}
