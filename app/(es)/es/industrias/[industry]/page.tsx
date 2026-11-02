import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/pages/industries-page";
import { industryMeta } from "@/components/pages/meta";
import { industryFromSlug, industryKeys, industrySlug } from "@/data/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return industryKeys.map((key) => ({ industry: industrySlug[key]["es"] }));
}

type Props = { params: Promise<{ industry: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const key = industryFromSlug(industry, "es");
  return key ? industryMeta(key, "es") : {};
}

export default async function Page({ params }: Props) {
  const { industry } = await params;
  const key = industryFromSlug(industry, "es");
  if (!key) notFound();
  return <IndustryPage lang="es" industry={key} />;
}
