/*
  Site-wide values. The brand name is a PLACEHOLDER while the final name is
  decided. Change it here and the header, footer and page titles follow.
*/

export const site = {
  name: "Accentuate Your Revenues",
  shortName: "Accentuate",
  /* Placeholder domain. Not registered yet. */
  url: "https://accentuatebiz.com",
  parent: {
    name: "BizBuzz",
    url: "https://www.thebizbuzz.studio",
  },
  /*
    Keep false until the real domain is live and the content is final.
    While false, every page asks search engines not to index it, so the
    preview never competes with the finished site.
  */
  indexable: false,
} as const;
