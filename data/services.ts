import {
  MapPin,
  Search,
  Star,
  Globe,
  Palette,
  Sparkles,
  TrendingUp,
  LayoutGrid,
  Share2,
  PlayCircle,
  Clapperboard,
  Wand2,
  Radar,
  type LucideIcon,
} from "lucide-react";

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
  icon: LucideIcon;
  /* Optional: shown only on a tile that spans the full grid width. */
  image?: string;
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
    icon: MapPin,
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
    icon: Search,
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
    icon: Star,
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
    icon: Globe,
  },
  {
    id: "social-media",
    track: "local",
    title: "Social media management",
    summary:
      "Organic and paid run as one system: a posting cadence that doesn't go quiet, and ad spend put where it actually returns.",
    capabilities: [
      "Organic content and posting cadence",
      "Paid social campaigns",
      "Community management",
      "Performance reporting",
    ],
    tint: "#0f2a22",
    tintHover: "#153c30",
    mark: "#5fdba8",
    icon: Share2,
  },
  {
    id: "youtube",
    track: "local",
    title: "YouTube management and monetization",
    summary:
      "Channel strategy, upload cadence and monetization setup, for businesses that want an actual audience on video, not just uploads.",
    capabilities: [
      "Channel setup and strategy",
      "Upload cadence and video SEO",
      "Monetization and ad revenue setup",
      "Analytics and growth tracking",
    ],
    tint: "#2a1416",
    tintHover: "#3c1c1f",
    mark: "#ef5350",
    icon: PlayCircle,
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
      "Presentation, print and packaging design",
    ],
    tint: "#211a33",
    tintHover: "#2f2449",
    mark: "#a98cf0",
    icon: Palette,
  },
  {
    id: "ugc-ads",
    track: "studio",
    title: "UGC ad content",
    summary:
      "Short-form, testimonial-style ad content built to perform on paid social, not polished brand films people skip past.",
    capabilities: [
      "Scripted and testimonial-style UGC",
      "Short-form video ads",
      "Hook-first editing for paid social",
      "Variants built for A/B testing",
    ],
    tint: "#2a1c30",
    tintHover: "#3a2744",
    mark: "#e085d9",
    icon: Clapperboard,
  },
  {
    id: "ai-content",
    track: "studio",
    title: "AI content and video creation",
    summary:
      "AI-assisted writing and video production for teams that need volume without losing one consistent voice.",
    capabilities: [
      "AI-assisted content writing",
      "AI video generation and editing",
      "Brand voice consistency at scale",
      "Repurposing across formats and platforms",
    ],
    tint: "#15233a",
    tintHover: "#1e304f",
    mark: "#6fa8f5",
    icon: Wand2,
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
    icon: Sparkles,
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
    icon: TrendingUp,
  },
  {
    id: "geo-aeo",
    track: "studio",
    title: "Generative and answer engine optimization",
    summary:
      "Getting found inside AI answers and chat assistants, not just the traditional search results page.",
    capabilities: [
      "Generative engine optimization (GEO)",
      "Answer engine optimization (AEO)",
      "Structured content built for AI citation",
      "Monitoring AI-driven visibility",
    ],
    tint: "#201a38",
    tintHover: "#2c2450",
    mark: "#b388f0",
    icon: Radar,
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
    icon: LayoutGrid,
    image: "/images/services/web-product-design.jpg",
  },
];

export const localServices = services.filter((s) => s.track === "local");
export const studioServices = services.filter((s) => s.track === "studio");
