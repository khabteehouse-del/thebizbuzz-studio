export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "google-business-profile-not-showing-up",
    title: "Why Your Google Business Profile Isn't Showing Up in Local Search",
    description:
      "The most common reasons local businesses disappear from the map pack, and the fixes that actually move the needle.",
    date: "2026-09-20",
    readTime: "5 min read",
    tags: ["Local SEO", "Google Business Profile"],
    body: [
      "A business can have a great product and still be invisible online. The most common cause is a Google Business Profile that was set up once and never touched again. Google rewards activity: recent photos, fresh posts, answered questions, and reviews that get a response.",
      "Category selection matters more than most owners realize. Choosing a broad category over a specific one is one of the fastest ways to lose ranking to a competitor who picked correctly. A dental clinic listed as \"Health\" instead of \"Dental Clinic\" is competing in the wrong race entirely.",
      "Citations, meaning your business name, address and phone number appearing consistently across directories, also play a role. Inconsistent listings (a wrong old address on one site, a different phone number on another) quietly erode trust signals that Google uses to rank local results.",
      "The fix is rarely a redesign. It's usually a proper setup, a consistent posting habit, and a review strategy that doesn't rely on asking once and hoping. Most of what we cover in a listing audit takes an afternoon to fix, not a month.",
    ],
  },
  {
    slug: "what-ai-integrated-actually-means",
    title: "AI-Integrated Websites: What It Actually Means",
    description:
      "Past the buzzword: what a genuinely AI-integrated business system looks like versus a chatbot bolted onto a homepage.",
    date: "2026-09-10",
    readTime: "4 min read",
    tags: ["AI Systems", "Product"],
    body: [
      "\"AI-integrated\" gets used to describe everything from a genuinely useful retrieval system to a chatbot widget that answers three FAQ questions badly. The difference isn't the technology, it's whether the system is grounded in your actual data and verified before it reaches a user.",
      "A real AI-integrated system does specific jobs: answering questions from your own documents instead of guessing, automating a workflow that used to take a person hours, or surfacing insight from data you already have but never had time to analyze.",
      "The guardrails matter as much as the model. Citation verification, bounded retries, and clear escalation paths to a human are what separate a production system from a demo that looks impressive in a five-minute call and falls apart on real use.",
      "If a vendor can't explain what happens when the AI is wrong, that's the question to ask before signing anything.",
    ],
  },
];