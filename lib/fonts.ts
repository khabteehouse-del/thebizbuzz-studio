import { Bricolage_Grotesque, Geist } from "next/font/google";

/*
  Bricolage Grotesque gives the headlines a confident, slightly playful
  character. Geist keeps body text calm and easy to read on a phone.
  Both cover the accents and the n with tilde that Spanish needs.
*/

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
