import { Newsreader, Geist } from "next/font/google";

/*
  Same pairing as BizBuzz: Newsreader (a calm editorial serif) for
  headlines, Geist for body text. Both cover the accents and the n with
  tilde that Spanish needs.
*/

export const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
