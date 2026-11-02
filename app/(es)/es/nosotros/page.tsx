import { AboutPage } from "@/components/pages/about-page";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("about", "es");

export default function Page() {
  return <AboutPage lang="es" />;
}
