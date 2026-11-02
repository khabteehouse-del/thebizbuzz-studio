import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { RootShell } from "@/components/layout/root-shell";
import { layoutMetadata } from "@/lib/seo";

export const metadata: Metadata = layoutMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
