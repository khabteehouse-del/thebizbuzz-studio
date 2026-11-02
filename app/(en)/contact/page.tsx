import { ContactPage } from "@/components/pages/contact-page";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("contact", "en");

export default function Page() {
  return <ContactPage lang="en" />;
}
