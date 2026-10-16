import localFont from "next/font/local";

/*
  Unbounded, the wide display face used on the design gallery only.
  Self-hosted (a Latin subset of the variable font, SIL Open Font License,
  see fonts/OFL-Unbounded.txt) so the page does not depend on a live
  connection to Google at build or dev time.
*/
export const unbounded = localFont({
  src: "./fonts/Unbounded-Variable.woff",
  variable: "--font-unbounded",
  weight: "200 900",
  display: "swap",
});
