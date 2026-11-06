import { LegalPage } from "@/components/pages/legal-page";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("terms", "es");

export default function Page() {
  return <LegalPage lang="es" doc="terms" />;
}
