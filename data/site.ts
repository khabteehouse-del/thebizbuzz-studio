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
    "We get local businesses found on Google, and we build the brands, websites and AI systems behind companies that are scaling up. Karachi and Dubai.",
  url: "https://thebizbuzz.studio",
  email: "contact@thebizbuzz.studio",
  locations: ["Karachi", "Dubai"],
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#tracks" },
  { label: "Work", href: "/#work" },
  { label: "Approach", href: "/#approach" },
  { label: "Team", href: "/#team" },
];

export type SocialLink = {
  label: string;
  href: string;
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
      { label: "Questions", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "" },
  { label: "Instagram", href: "" },
  { label: "Behance", href: "" },
];
