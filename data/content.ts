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
    body: "Before design or code, we work out what the company actually sells, who decides to buy, and what is currently getting in the way. Most projects fail here rather than in execution.",
  },
  {
    id: "02",
    title: "Define the system",
    body: "We agree the shape of the work up front: what gets built, what it needs to do, how success is measured. Written down, so nobody is guessing three weeks in.",
  },
  {
    id: "03",
    title: "Build in checkpoints",
    body: "Work ships in phases, each one a working state you can see and react to. No four-week silences ending in a reveal that misses.",
  },
  {
    id: "04",
    title: "Hand over properly",
    body: "You get the code, the accounts, the documentation and the ability to run it without us. We would rather be kept than depended on.",
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
      "Production systems, not demonstrations. Retrieval over your own documents, agents that complete real workflows, automation wired into what you already run. Our own products are public and you can use them before deciding whether we know what we are doing.",
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
