export type Project = {
  id: string;
  name: string;
  category: string;
  problem: string;
  solution: string;
  stack: string[];
  /* Leave image as null to render a placeholder block instead */
  image: string | null;
  live: string | null;
  repo: string | null;
};

export const projects: Project[] = [
  {
    id: "fluxorx",
    name: "FluxorX",
    category: "Enterprise AI systems",
    problem:
      "Enterprise AI dashboards fail in two ways. They hallucinate on business-critical numbers, or they cannot handle open-ended questions.",
    solution:
      "A dual-tier architecture that solves both. Deterministic queries for metrics that must be exact, Claude reasoning for everything conversational. Ships with observability, MCP tool exposure and cloud-native deployment across Docker, Azure and Kubernetes.",
    stack: ["Claude", "MCP", "Docker", "Azure", "Kubernetes"],
    image: "/images/work/fluxorx.jpg",
    live: "https://fluxorx.vercel.app",
    repo: "https://github.com/khabteehouse-del/fluxorx",
  },
  {
    id: "veridoc",
    name: "VeriDoc",
    category: "Autonomous AI agents",
    problem:
      "Contract review is slow, expensive and inconsistent. Off-the-shelf models speed it up but hallucinate conclusions the contract never contained.",
    solution:
      "A four-step LangGraph agent that extracts clauses, assesses risk, generates summaries and produces a final report. Every conclusion is verified against source data before it reaches the user.",
    stack: ["LangGraph", "Claude", "Next.js", "Vercel"],
    image: "/images/work/veridoc.jpg",
    live: "https://veridoc-two.vercel.app",
    repo: "https://github.com/khabteehouse-del/veridoc",
  },
  {
    id: "pulsariq",
    name: "PulsarIQ",
    category: "Self-hosted enterprise RAG",
    problem:
      "Enterprises want to search internal documents in natural language, but cannot send that data to external model APIs.",
    solution:
      "Cited answers in under two seconds, with a self-hosted deployment path for regulated environments where data cannot leave the client's own infrastructure.",
    stack: ["RAG", "Vector search", "Self-hosted", "Enterprise RBAC"],
    image: "/images/work/pulsariq.jpg",
    live: "https://pulsariq.vercel.app",
    repo: "https://github.com/khabteehouse-del/pulsariq",
  },
  {
    id: "dentivue",
    name: "DentiVue",
    category: "Clinical vision AI",
    problem:
      "Dental patients need to see potential outcomes before committing to a procedure. Standard AI tools regenerate entire faces, which is a privacy risk, or produce results that look nothing like the patient.",
    solution:
      "Regenerates only the mouth region, client-side, preserving patient identity. Pairs the visual with Claude-generated clinical reasoning, positioned as patient communication rather than medical diagnosis.",
    stack: ["Vision AI", "Claude", "Client-side inference"],
    image: null,
    live: "https://project-dentivue.lovable.app",
    repo: null,
  },
];
