import { Geist } from "next/font/google";

/*
  Geist, the same face BizBuzz renders in. Covers the accents and the
  n with tilde that Spanish needs.
*/

export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
