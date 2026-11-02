import { ServicePage } from "@/components/pages/service-page";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("gbp", "en");

export default function Page() {
  return <ServicePage lang="en" service="gbp" />;
}
