import { designTileHero } from "./designs";
import { site } from "./site";
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
  AudioLines,
  type LucideIcon,
} from "lucide-react";

export type Track = "local" | "studio";

/* Which drawn picture sits behind the list on the back of a tile (see tile-art.tsx). */
export type ArtId =
  | "gbp"
  | "local-seo"
  | "reviews"
  | "local-web"
  | "social-media"
  | "youtube"
  | "geo-aeo"
  | "growth"
  | "ai-content"
  | "ugc-ads"
  | "web";

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
  /* Optional: the front shows this logo instead of the icon and title. */
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    animated?: boolean;
  };
  /* Optional: a picture drawn in code behind the capability list on the back. */
  backArt?: ArtId;
  /* Optional: the back shows this picture instead of the capability list. */
  backImage?: {
    image: string;
    alt: string;
    width: number;
    height: number;
    /* "contain" keeps a tall picture whole instead of cropping it. */
    fit?: "cover" | "contain";
    background?: string;
    /* CSS object-position, to choose which part of a cropped picture shows. */
    position?: string;
    /* A few short lines laid over the top of the picture. */
    bullets?: string[];
  };
  /* Optional small label on the tile front, for example a product that is still in build. */
  badge?: string;
  /*
    Optional: the whole tile becomes a link, and the back shows a call to
    action strip under the capability list.
  */
  link?: { href: string; cta: string; external?: boolean };
  /* Optional: the back shows a "see samples" strip that opens a video player. */
  samples?: {
    cta: string;
    heading: string;
    videos: { src: string; poster: string; title: string; length: string }[];
  };
  /*
    Optional: the tile back shows one design instead of the capability list,
    and the whole tile links to the page. Used by the design gallery.
  */
  gallery?: {
    href: string;
    cta: string;
    image: string;
    alt: string;
    width: number;
    height: number;
  };
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
      "The listing is the first surface a nearby buyer sees, and it often outranks your own website for local queries. We configure it correctly, keep it active, and defend its position.",
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
    backArt: "gbp",
  },
  {
    id: "local-seo",
    track: "local",
    title: "Local search and maps",
    summary:
      "Map pack visibility for the queries your customers actually type, built on consistent citations, location pages and a read of what the top three competitors do that you do not.",
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
    backArt: "local-seo",
  },
  {
    id: "reviews",
    track: "local",
    title: "Reviews and reputation",
    summary:
      "Review volume, recency and response rate all feed ranking and conversion. We build a repeatable request system and a response protocol, instead of asking once and hoping.",
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
    backArt: "reviews",
  },
  {
    id: "local-web",
    track: "local",
    title: "Websites that convert",
    summary:
      "Fast, mobile-first sites built around the enquiry: a call, a booking or a walk-in. Local schema and search setup included. No template, no clutter.",
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
    backArt: "local-web",
  },
  {
    id: "social-media",
    track: "local",
    title: "Social media management",
    summary:
      "Organic and paid run as one system: a posting cadence that holds, and ad spend allocated against measured return.",
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
    backArt: "social-media",
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
    backArt: "youtube",
  },

  /* ---------------- Studio ---------------- */
  {
    id: "mizar",
    track: "studio",
    title: "Mizar",
    summary:
      "AI business assistant with a built-in AI receptionist. Made for mobile service professionals.",
    capabilities: [
      "Answers calls and messages while you are on the job",
      "Collects the details and books the visit",
      "Keeps your day in order, by voice",
      "Built for beauticians, painters, vets and every pro who comes to the customer",
    ],
    tint: "#0a0e1a",
    tintHover: "#0a0e1a",
    mark: "#4ea3ec",
    icon: AudioLines,
    logo: {
      src: "/images/services/mizar-logo.webp",
      alt: "Mizar",
      /* Drawn as an animated SVG on the tile; the picture is the fallback. */
      animated: true,
      width: 1192,
      height: 344,
    },
    backImage: {
      image: "/images/services/mizar-back.webp",
      alt: "The Mizar app on a phone showing a new urgent lead, with a call back button and a take the job button.",
      width: 690,
      height: 800,
      fit: "cover",
      position: "50% 42%",
      background: "#090f1e",
      bullets: [
        "Answers calls and messages for you",
        "Collects the details and books the job",
        "Keeps your day in order, by voice",
      ],
    },
    badge: "In build",
    link: {
      href: site.whatsapp.mizarHref,
      cta: "Message us for early access",
      external: true,
    },
  },
  {
    id: "ai",
    track: "studio",
    title: "AI-integrated solutions",
    summary:
      "Production AI systems with evaluation and guardrails: retrieval over private data, agents that complete real workflows, and deployments built to survive security and compliance review.",
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
    backImage: {
      image: "/images/services/ai-back.webp",
      alt: "Four AI products we have built: FluxorX, Veridoc, PulsarIQ and DentiVue.",
      width: 870,
      height: 540,
      fit: "cover",
      position: "50% 50%",
      background: "#05070d",
      bullets: [
        "We build RAG systems over your private data",
        "Autonomous agents that verify their own work",
        "Self-hosted AI for regulated teams",
        "Vision AI with privacy built in",
      ],
    },
    link: { href: site.whatsapp.aiHref, cta: "Contact us about enterprise AI", external: true },
  },
  {
    id: "geo-aeo",
    track: "studio",
    title: "Generative and answer engine optimization",
    summary:
      "Visibility inside AI answers and assistants, not just the results page: structured, citable content and monitoring of how models describe you.",
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
    backArt: "geo-aeo",
  },
  {
    id: "growth",
    track: "studio",
    title: "Growth marketing",
    summary:
      "Technical SEO, content and paid search run as one programme and measured against pipeline and revenue, not impressions.",
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
    backArt: "growth",
  },
  {
    id: "brand",
    track: "studio",
    title: "Brand identity and creative",
    summary:
      "The system underneath the logo: naming, voice, colour, type and the rules that keep it consistent at every touchpoint.",
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
    gallery: {
      href: "/design",
      cta: "Enter the design studio",
      image: designTileHero.src,
      alt: designTileHero.alt,
      width: designTileHero.width,
      height: designTileHero.height,
    },
  },
  {
    id: "ai-content",
    track: "studio",
    title: "AI content and video creation",
    summary:
      "AI-assisted writing and video production for teams that need volume without losing a single consistent voice, with review gates before anything ships.",
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
    backArt: "ai-content",
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
    samples: {
      cta: "See samples",
      heading: "Commercials by BizBuzz",
      videos: [
        { src: "/video/eventbox-1.mp4", poster: "/video/eventbox-1.jpg", title: "The Event Box, commercial 1", length: "0:26" },
        { src: "/video/eventbox-2.mp4", poster: "/video/eventbox-2.jpg", title: "The Event Box, commercial 2", length: "0:56" },
        { src: "/video/sindh-youth.mp4", poster: "/video/sindh-youth.jpg", title: "Sindh Youth Innovation and Incubation Competition", length: "1:09" },
      ],
    },
  },
  {
    id: "web",
    track: "studio",
    title: "Web and product design",
    summary:
      "Sites and product interfaces that carry the positioning rather than describe it. Engineered for Core Web Vitals and for the load you will have in a year, not the load you have today.",
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
    backArt: "web",
  },
];

export const localServices = services.filter((s) => s.track === "local");
export const studioServices = services.filter((s) => s.track === "studio");
