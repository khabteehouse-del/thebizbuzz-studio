import { LegalPage } from "@/components/pages/legal-page";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("terms", "en");

export default function Page() {
  return <LegalPage lang="en" doc="terms" />;
}
