export type Track = "local" | "studio";

export type Service = {
  id: string;
  track: Track;
  title: string;
  summary: string;
  capabilities: string[];
  tint: string;
  tintHover: string;
  mark: string;
};

/*
  Two tracks, one company.

  Local is the visibility business: getting a shop, clinic or showroom
  found by people nearby who are ready to buy.

  Studio is the build business: brand, product and AI systems for
  companies scaling past what they started with.

  Each track has its own colour family so a visitor can tell at a glance
  which half of the page they are reading.
*/

export const services: Service[] = [
  /* ---------------- Local ---------------- */
  {
    id: "gbp",
    track: "local",
    title: "Google Business Profile",
    summary:
      "Your listing is the first thing a nearby customer sees. We set it up properly, keep it active, and stop it slipping down the map.",
    capabilities: [
      "Profile setup and verification",
      "Categories, services and attributes",
      "Photos, posts and Q&A",
      "Ongoing management",
    ],
    tint: "#0d2a2b",
    tintHover: "#123c3d",
    mark: "#4fd1c5",
  },
  {
    id: "local-seo",
    track: "local",
    title: "Local search and maps",
    summary:
      "Ranking in the map pack for what people in your area actually search, not for vanity keywords nobody types.",
    capabilities: [
      "Map pack ranking",
      "Citations and directory listings",
      "Location pages",
      "Competitor gap analysis",
    ],
    tint: "#0c2830",
    tintHover: "#113a45",
    mark: "#54c8d8",
  },
  {
    id: "reviews",
    track: "local",
    title: "Reviews and reputation",
    summary:
      "Reviews decide whether someone walks in or scrolls past. We build a system that earns them steadily instead of asking once and hoping.",
    capabilities: [
      "Review generation systems",
      "Response templates and handling",
      "Negative review recovery",
      "Reputation monitoring",
    ],
    tint: "#0d2536",
    tintHover: "#12354d",
    mark: "#4eb8ec",
  },
  {
    id: "local-web",
    track: "local",
    title: "Websites that convert",
    summary:
      "A fast, honest site that turns the visit into a call, a booking or a walk-in. No template, no clutter.",
    capabilities: [
      "Business and service sites",
      "Booking and enquiry flows",
      "Mobile-first, fast loading",
      "Local schema and search setup",
    ],
    tint: "#0d2137",
    tintHover: "#12304e",
    mark: "#4ea3ec",
  },

  /* ---------------- Studio ---------------- */
  {
    id: "brand",
    track: "studio",
    title: "Brand identity and creative",
    summary:
      "The system underneath the logo. Naming, voice, colour, type and the rules that keep it consistent everywhere it appears.",
    capabilities: [
      "Identity systems and guidelines",
      "Naming and messaging",
      "Campaign and social creative",
      "Presentation and pitch design",
    ],
    tint: "#211a33",
    tintHover: "#2f2449",
    mark: "#a98cf0",
  },
  {
    id: "web",
    track: "studio",
    title: "Web and product design",
    summary:
      "Sites and interfaces that carry your positioning rather than describe it. Built to load fast and hold up as you grow.",
    capabilities: [
      "Marketing sites and landing pages",
      "Web applications and dashboards",
      "E-commerce builds",
      "Performance and Core Web Vitals",
    ],
    tint: "#1c1a38",
    tintHover: "#282550",
    mark: "#9a95f5",
  },
  {
    id: "growth",
    track: "studio",
    title: "Growth marketing",
    summary:
      "Search, content and paid working as one system, measured against revenue rather than impressions.",
    capabilities: [
      "Technical and content SEO",
      "Copywriting and long-form content",
      "Paid search and social",
      "Analytics and attribution",
    ],
    tint: "#181c3a",
    tintHover: "#222853",
    mark: "#8b9dfa",
  },
  {
    id: "ai",
    track: "studio",
    title: "AI-integrated solutions",
    summary:
      "Production AI systems, not demos. Retrieval, agents and automation built with the guardrails that make them safe to put in front of a client.",
    capabilities: [
      "Retrieval systems over private data",
      "Autonomous agents and workflows",
      "Model integration and evaluation",
      "Self-hosted and regulated deployments",
    ],
    tint: "#151a38",
    tintHover: "#1e2652",
    mark: "#7c8ff8",
  },
];

export const localServices = services.filter((s) => s.track === "local");
export const studioServices = services.filter((s) => s.track === "studio");
