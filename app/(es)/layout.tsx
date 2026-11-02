import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { RootShell } from "@/components/layout/root-shell";
import { layoutMetadata } from "@/lib/seo";

export const metadata: Metadata = layoutMetadata("es");

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
