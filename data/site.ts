/*
  Single source of truth for site-wide values.
  Edit here, it updates in the nav, footer and metadata at once.
*/

export const site = {
  name: "BizBuzz",
  tagline: "Where Brand Meets Intelligence",
  description:
    "A creative and technology studio building brands, products and AI systems for growing companies.",
  url: "https://thebizbuzz.studio",
  email: "contact@thebizbuzz.studio",
  locations: ["Karachi", "Dubai"],
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
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
export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "" },
  { label: "Instagram", href: "" },
  { label: "Behance", href: "" },
];
