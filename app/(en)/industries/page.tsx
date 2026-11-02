import { IndustriesIndexPage } from "@/components/pages/industries-page";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("industries", "en");

export default function Page() {
  return <IndustriesIndexPage lang="en" />;
}
