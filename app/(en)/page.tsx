import { HomePage } from "@/components/sections/home";
import { metaFor } from "@/components/pages/meta";

export const metadata = metaFor("home", "en");

export default function Page() {
  return <HomePage lang="en" />;
}
