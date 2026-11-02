import { MizarPage } from "@/components/pages/mizar-page";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("mizar", "es");

export default function Page() {
  return <MizarPage lang="es" />;
}
