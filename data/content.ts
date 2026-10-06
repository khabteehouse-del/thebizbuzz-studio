export type Step = {
  id: string;
  title: string;
  body: string;
};

/*
  A genuine sequence, which is why these carry numbers.
  Edit the copy here, the section picks it up.
*/
export const approach: Step[] = [
  {
    id: "01",
    title: "Understand the business",
    body: "Before design or code we establish what the company sells, who decides to buy, and what is constraining growth. Output: a written brief and the metrics the engagement will be judged on. Most projects fail here rather than in execution.",
  },
  {
    id: "02",
    title: "Define the system",
    body: "Architecture, scope and acceptance criteria are agreed in writing before build begins: what gets built, what it must do, how it is measured. Nobody is guessing three weeks in.",
  },
  {
    id: "03",
    title: "Build in checkpoints",
    body: "Work ships in phases, each a working state you can review. Progress is reported against the acceptance criteria, not against effort. No four-week silences ending in a reveal that misses.",
  },
  {
    id: "04",
    title: "Hand over properly",
    body: "Code, accounts, documentation and runbooks transfer to you, along with the ability to operate it without us. We would rather be retained than depended on.",
  },
];

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    id: "which-track",
    question: "I run a small local business. Am I too small for you?",
    answer:
      "No. Half of what we do is built for local businesses: clinics, salons, restaurants, showrooms and shops. Those engagements are priced for that market, not for the studio work. If you want to be found by people nearby, that is the local track and it is a real part of the business, not a favour.",
  },
  {
    id: "engagements",
    question: "What size of engagement do you take on?",
    answer:
      "On the local side, monthly retainers for Google Business Profile, local search and reviews, plus one-off website builds. On the studio side, projects rather than tasks: a brand and website build, an AI system, a search programme with a defined target.",
  },
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "Local work starts producing within weeks: a profile can be cleaned up in days, map ranking moves over one to three months. On the studio side, a marketing site is typically four to six weeks and a brand system three to five. AI systems vary with data and compliance, and we scope those before quoting.",
  },
  {
    id: "gbp-diy",
    question: "Can I not just do the Google Business Profile myself?",
    answer:
      "Yes, and for a lot of businesses that is the right answer. Run our free listing check, work through the plan it gives you, and you will get most of the way there without paying anyone. Come to us when you want it maintained every week rather than fixed once, or when you are competing against businesses who already have someone doing it.",
  },
  {
    id: "results-when",
    question: "How long before local work shows results?",
    answer:
      "A neglected profile usually shows movement in four to eight weeks: better positioning for your own name and category searches first, then the map pack. Reviews take longer because they depend on your customer volume. Anyone promising the top spot in a fortnight is guessing.",
  },
  {
    id: "remote",
    question: "You are in Karachi and Dubai. Does that work for us?",
    answer:
      "We work remotely by default and have delivered that way for years. Karachi covers Asian and European hours comfortably, and our UAE presence handles Gulf clients in person where it matters.",
  },
  {
    id: "ai",
    question: "What does AI-integrated actually mean here?",
    answer:
      "Production systems rather than demonstrations: retrieval over private documents, agents that complete real workflows, and automation wired into what you already run. Acceptance criteria and evaluation are defined before build. Our own systems are public, with measured results, so you can test them before deciding whether we know what we are doing.",
  },
  {
    id: "measure",
    question: "How do you measure success?",
    answer:
      "The metrics are written into the brief before work starts, and we report against those, not against activity. Local work: calls, direction requests, bookings and map pack position. Studio work: acceptance criteria met, performance budgets, and for growth programmes, qualified pipeline.",
  },
  {
    id: "security",
    question: "How do you handle security and data residency?",
    answer:
      "Where data cannot leave your infrastructure we deploy self-hosted, as in our own PulsarIQ build. Access control, logging and data residency are agreed in the scoping step, before any build begins.",
  },
  {
    id: "ownership",
    question: "Who owns the work?",
    answer:
      "You do. Code, designs, accounts and domains are yours on completion, in your own repositories and under your own billing. We do not hold client infrastructure hostage.",
  },
  {
    id: "start",
    question: "How do we start?",
    answer:
      "Send a note describing the business and what you are trying to change. If it looks like a fit we will set up a call, and if it does not we will tell you that instead of selling you something.",
  },
];
