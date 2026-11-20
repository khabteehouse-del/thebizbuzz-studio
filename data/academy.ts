/*
  BizBuzz AI Academy: the single source for the /academy page, the homepage
  strip and the course schema.

  Course content is taken from the BizBuzz_AI_Training_Programs PDF.
  Prices: the PDF carried a 50% friend rate, so the full prices here are
  double that, and the live offer is 25% off the full price. Edit the
  two numbers in a plan and everything else follows.
*/

export const ACADEMY_WA_NUMBER = "923133330908";
export const ACADEMY_PHONE_DISPLAY = "0313 3330908";
export const ACADEMY_OFFER_PERCENT = 25;

export function academyWhatsapp(message: string): string {
  return `https://wa.me/${ACADEMY_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const academyJoinHref = academyWhatsapp(
  "Hi BizBuzz, I want to join the AI Academy."
);

export function formatPkr(amount: number): string {
  return `PKR ${amount.toLocaleString("en-US")}`;
}

export type AcademyPlan = {
  id: string;
  number: string;
  name: string;
  level: string;
  badge: string;
  weeks: number;
  sessions: number;
  sessionLength: string;
  workload: string;
  fullPrice: number;
  covers: string[];
  benefit: string;
  outcome: string;
};

export function offerPrice(plan: AcademyPlan): number {
  return Math.round((plan.fullPrice * (100 - ACADEMY_OFFER_PERCENT)) / 100);
}

export function planHref(plan: AcademyPlan): string {
  return academyWhatsapp(
    `Hi BizBuzz, I want to enroll in the ${plan.name} plan at the AI Academy.`
  );
}

export const academyPlans: AcademyPlan[] = [
  {
    id: "essentials",
    number: "01",
    name: "AI Essentials",
    level: "Easy | Beginner",
    badge: "Start here",
    weeks: 4,
    sessions: 8,
    sessionLength: "1 hour",
    workload: "PT8H",
    fullPrice: 6000,
    covers: [
      "Introduction to Generative AI and Large Language Models (LLMs)",
      "Using ChatGPT, Claude and Gemini effectively",
      "Prompt Engineering: writing clear, useful instructions",
      "AI-assisted writing, research and everyday productivity",
      "AI image and video generation fundamentals",
    ],
    benefit:
      "Use AI to save time, improve the quality of everyday work, generate ideas and create content more efficiently.",
    outcome: "Confident everyday AI user",
  },
  {
    id: "productivity",
    number: "02",
    name: "AI Productivity & Automation",
    level: "Moderate | Intermediate",
    badge: "Level up",
    weeks: 6,
    sessions: 12,
    sessionLength: "1 hour",
    workload: "PT12H",
    fullPrice: 12000,
    covers: [
      "Everything covered in AI Essentials",
      "Advanced Prompt Engineering and structured AI workflows",
      "Claude Projects and AI-assisted work processes",
      "AI-assisted coding and building with Lovable",
      "n8n workflow automation fundamentals",
      "Working with APIs and connecting AI tools",
      "Build practical website or automation projects",
    ],
    benefit:
      "Create simple websites, automate repetitive tasks, connect tools and offer practical digital services with AI assistance.",
    outcome: "Practical AI productivity and automation skills",
  },
  {
    id: "solutions",
    number: "03",
    name: "AI Solutions Development",
    level: "Advanced | Builder",
    badge: "For builders",
    weeks: 8,
    sessions: 16,
    sessionLength: "1.5 hours",
    workload: "PT24H",
    fullPrice: 24000,
    covers: [
      "Everything covered in AI Productivity & Automation",
      "Python fundamentals for AI application development",
      "LLM APIs, integrations and application workflows",
      "RAG: connecting AI to trusted knowledge sources",
      "Vector databases and knowledge retrieval concepts",
      "AI Agents and agentic workflows",
      "LangGraph and MCP fundamentals",
      "Supabase and backend integration",
      "Build a functional AI-powered application",
    ],
    benefit:
      "Develop a foundation for building AI assistants, knowledge-based applications and automated solutions. Progress toward freelance or junior development opportunities through continued practice.",
    outcome: "Practical foundation in AI solutions development",
  },
];

export const academyFacts = [
  { value: "3", label: "Learning paths, beginner to builder" },
  { value: "4 to 8", label: "Weeks, depending on the path" },
  { value: "8 to 16", label: "Guided sessions" },
  { value: "100%", label: "Online, learn from anywhere" },
];

export const academyGains = [
  {
    title: "Work smarter",
    text: "Use AI to research, write, organise information and complete routine tasks faster.",
  },
  {
    title: "Create more",
    text: "Generate content, images, videos, ideas and digital experiences with modern AI tools.",
  },
  {
    title: "Build practical skills",
    text: "Create websites, connect services and automate repetitive workflows.",
  },
  {
    title: "Develop a portfolio",
    text: "Complete hands-on exercises and projects that demonstrate what you can do.",
  },
  {
    title: "Explore opportunities",
    text: "Use your skills as a foundation for freelance services, workplace productivity or further technical learning.",
  },
];

export const academyTools = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Prompt engineering",
  "AI image and video",
  "Lovable",
  "n8n automation",
  "APIs",
  "Python",
  "LLM APIs",
  "RAG",
  "Vector databases",
  "AI agents",
  "LangGraph",
  "MCP",
  "Supabase",
];

export const academyFaq: { q: string; a: string }[] = [
  {
    q: "Who is the AI Academy for?",
    a: "Students, professionals and business owners who want to use AI in real work. There are three paths, so you can start at the level that matches you today.",
  },
  {
    q: "I have never used AI. Where do I start?",
    a: "Start with AI Essentials. It is built for beginners and covers the basics of generative AI, ChatGPT, Claude and Gemini, and writing clear prompts. You can move up to the next path when you are ready.",
  },
  {
    q: "How do the online sessions work?",
    a: "Training is online and practical, with guided exercises and projects instead of lengthy theory. Once you choose your plan, a class schedule with session-by-session topics is prepared for you.",
  },
  {
    q: "Do the plans build on each other?",
    a: "Yes. Each plan includes everything from the previous one, so you can start with the essentials and continue to the next path whenever you choose.",
  },
  {
    q: "Is the fee per session or for the whole course?",
    a: "All prices shown are total course fees in Pakistani Rupees (PKR). The launch offer takes 25% off the full price of each plan.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes. You earn a BizBuzz certificate of completion by completing the course, passing a practical assessment and submitting the required project. It is a certificate issued by BizBuzz. It is not a government-accredited or university qualification.",
  },
  {
    q: "How do I enroll?",
    a: "Message us on WhatsApp, tell us your goal, and we will guide you to the plan that fits you.",
  },
];

export const academyInstructor = {
  name: "Faraz Akhtar",
  role: "Founder of BizBuzz and AI Solutions Engineer",
  points: [
    "20+ years in enterprise IT",
    "Builds production AI systems for real clients",
    "Former university lecturer",
    "Practical, tool-first teaching, not lengthy theory",
  ],
};
