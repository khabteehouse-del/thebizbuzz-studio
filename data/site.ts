/*
  Single source of truth for site-wide values.
  Edit here, it updates in the nav, footer and metadata at once.
*/

export const site = {
  name: "BizBuzz",
  tagline: "Where Brand Meets Intelligence",
  /*
    This text is what Google shows in results and what appears when
    anyone shares the link. It has to speak to both audiences, so it
    leads with the local half: that is the visitor most likely to
    arrive from a search rather than a referral.
  */
  description:
    "Local search for businesses, and brand, web and production AI systems for companies that are scaling. A founder-led studio in Karachi and Dubai.",
  /*
    Search and link-preview text. Kept apart from `description` above,
    which is also shown in the footer. Keyword targets: digital
    marketing, AI solutions.
  */
  seoTitle: "BizBuzz | Digital Marketing and AI Solutions",
  seoDescription:
    "Founder-led studio in Karachi and Dubai. Digital marketing and AI solutions that position your brand: local search, web, brand and production AI.",
  url: "https://www.thebizbuzz.studio",
  email: "contact@thebizbuzz.studio",
  locations: ["Karachi", "Dubai"],
  /* Digits only for wa.me. The text pre-fills the chat so the first message is never blank. */
  whatsapp: {
    display: "+92 313 3330908",
    href: "https://wa.me/923133330908?text=Hi%20BizBuzz%2C%20I%20found%20you%20on%20your%20website.",
    mizarHref:
      "https://wa.me/923133330908?text=Hi%20BizBuzz%2C%20I%27d%20like%20early%20access%20to%20Mizar.",
    aiHref:
      "https://wa.me/923133330908?text=Hi%20BizBuzz%2C%20I%27d%20like%20to%20talk%20about%20an%20enterprise%20AI%20solution.",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#tracks" },
  { label: "Work", href: "/#work" },
  { label: "Approach", href: "/#approach" },
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/#team" },
];

export type SocialLink = {
  label: string;
  href: string;
  /* Shown next to the icon in the footer */
  handle: string;
};

/*
  Add a URL to make a social link appear in the footer.
  Entries with an empty href are skipped automatically,
  so nothing renders until a real profile exists.
*/
export type FooterLink = { label: string; href: string };

/* Grouped so the footer mirrors the two tracks on the page */
export const footerGroups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Local",
    links: [
      { label: "Free listing check", href: "/tools/gbp-check" },
      { label: "Local services", href: "/#local-services" },
      { label: "Two ways in", href: "/#tracks" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Studio services", href: "/#studio-services" },
      { label: "Our work", href: "/#work" },
      { label: "How we work", href: "/#approach" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Team", href: "/#team" },
      { label: "Blog", href: "/blog" },
      { label: "Questions", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bizbuzzstudio",
    handle: "BizBuzz Studio",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bizbuzz.studio/",
    handle: "@bizbuzz.studio",
  },
];