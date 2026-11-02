import { ContactPage } from "@/components/pages/contact-page";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("contact", "es");

export default function Page() {
  return <ContactPage lang="es" />;
}
