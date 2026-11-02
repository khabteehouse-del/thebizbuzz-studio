import { HomePage } from "@/components/pages/home-page";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("home", "es");

export default function Page() {
  return <HomePage lang="es" />;
}
