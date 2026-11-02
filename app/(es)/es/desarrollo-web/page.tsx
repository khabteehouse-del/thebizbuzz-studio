import { ServicePage } from "@/components/pages/service-page";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("websites", "es");

export default function Page() {
  return <ServicePage lang="es" service="websites" />;
}
