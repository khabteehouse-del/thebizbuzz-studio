export type Tier = "partner" | "specialist";

export type Member = {
  id: string;
  /*
    partner    equity holders and founders, shown in the main row
    specialist works with the team, no ownership implied anywhere
  */
  tier: Tier;
  name: string;
  role: string;
  focus: string;
  /* Drop a photo at public/images/team/<id>.jpg and set this to that path */
  image: string | null;
  /* Empty string hides the link. Add a URL and it appears. */
  linkedin: string;
};

export const team: Member[] = [
  {
    id: "faraz",
    tier: "partner",
    name: "Faraz Akhtar",
    role: "Co-Founder, Head of Technology and AI Solutions",
    focus:
      "Two decades in enterprise IT, now building production AI systems. Owns the technical direction of every engagement.",
    image: "/images/team/faraz.jpg",
    linkedin: "",
  },
  {
    id: "amrit",
    tier: "partner",
    name: "Amrit Hayat",
    role: "Co-Founder, Head of Brand and Creative",
    focus:
      "Leads identity, art direction and the creative system that keeps a brand consistent across every surface.",
    image: "/images/team/amrit.jpg",
    linkedin: "",
  },
  {
    id: "waqas",
    tier: "partner",
    name: "Waqas Sheikh",
    role: "Head of SEO and Search Growth",
    focus:
      "Technical search, content strategy and the measurement that ties both back to pipeline.",
    image: null,
    linkedin: "",
  },
  {
    id: "farhan",
    tier: "partner",
    name: "Farhan Ahmed Qureshi",
    role: "Regional Director, UAE",
    focus:
      "Client relationships and business development across the Emirates and the wider Gulf.",
    image: "/images/team/farhan.jpg",
    linkedin: "",
  },
  {
    id: "ghosia",
    tier: "specialist",
    name: "Ghosia Qureshi",
    role: "Content Writing Specialist",
    focus:
      "Writes the words that carry the work: site copy, service pages, campaigns and the long-form content behind search.",
    image: "/images/team/ghosia.jpg",
    linkedin: "",
  },
];

export const partners = team.filter((m) => m.tier === "partner");
export const specialists = team.filter((m) => m.tier === "specialist");
