/*
  Pretty Jin Aesthetics demo. Every client fact lives here so it can be
  corrected in one place. Items marked CONFIRM came from screenshots of
  their Facebook page and must be checked with the client before launch.
*/

export const brand = {
  name: "Pretty Jin",
  full: "Pretty Jin Aesthetics",
  // CONFIRM: Facebook page username for Messenger. Handle taken from their Instagram/TikTok.
  bookUrl: "https://m.me/prettyjinaesthetics",
  // CONFIRM: page shows +63 930 239 9123, a story showed +63 930 399 1223.
  phone: "+63 930 239 9123",
  phoneHref: "tel:+639302399123",
  email: "prettyjinaesthetics@gmail.com",
  handle: "@prettyjinaesthetics",
  address: "#657 Anonas St., Amparo Subd., Brgy 179, North Caloocan",
  mapQuery: "657 Anonas St, Amparo Subdivision, Caloocan, Philippines",
  followers: "58K",
  recommend: "100%",
};

export type Variant = {
  id: string;
  name: string;
  tag: string;
  line: string;
  image: string;
  bg: string;
  ink: string;
  orb: string;
};

export const milkyway: Variant[] = [
  {
    id: "classic",
    name: "Classic",
    tag: "The starter glow",
    line: "Gentle brightening with a soft, cloud-like finish. The place to begin.",
    image: "/images/pretty-jin/milkyway-classic.webp",
    bg: "#F5EFE8",
    ink: "#6B4A45",
    orb: "#FFFFFF, #EFE3DA 55%, #D9C7BB",
  },
  {
    id: "pink",
    name: "Pink",
    tag: "Barbie glass skin",
    line: "A pinkish-white glow with a glassy, lit-from-within finish.",
    image: "/images/pretty-jin/milkyway-pink.webp",
    bg: "#F7D5DC",
    ink: "#8C3B55",
    orb: "#FFFFFF, #F7B9C8 50%, #E58AA5",
  },
  {
    id: "red",
    name: "Red",
    tag: "Clear and balanced",
    line: "Calms breakouts and balances oil for clearer, steadier skin.",
    image: "/images/pretty-jin/milkyway-red.webp",
    bg: "#F0C4BE",
    ink: "#8A3A36",
    orb: "#FFFFFF, #E9A39B 50%, #C96A66",
  },
  {
    id: "yellow",
    name: "Yellow",
    tag: "Age defy",
    line: "Firming care with a golden aura for skin that deserves extra support.",
    image: "/images/pretty-jin/milkyway-yellow.webp",
    bg: "#F4E1B4",
    ink: "#7A5A18",
    orb: "#FFFFFF, #F2D58F 50%, #D9A94A",
  },
];

export const services = [
  { name: "Waxing", note: "Clean, careful, quick.", image: "/images/pretty-jin/service-waxing.webp" },
  { name: "Body care", note: "Polish and glow.", image: "/images/pretty-jin/service-body-scrub.webp" },
  { name: "Body contouring", note: "Sculpt with confidence.", image: "/images/pretty-jin/service-body-contouring.webp" },
  { name: "Brows and ink", note: "Soft, natural strokes.", image: "/images/pretty-jin/service-brows.webp" },
  { name: "Lash and nail bar", note: "Finished to the details.", image: "/images/pretty-jin/service-lash-nail.webp" },
  { name: "Spa therapies", note: "Slow down. Unwind.", image: "/images/pretty-jin/service-spa-massage.webp" },
];

export const menu = [
  "Facials",
  "White Boost Drip",
  "Non-surgical procedures",
  "Laser treatments",
  "Waxing",
  "Brows and ink",
  "Body contouring",
  "Botox",
  "Threads",
  "Fillers",
  "Nail and lash bar",
  "Spa therapies",
];

export const journey = [
  { n: "01", title: "Message us", text: "Tell us your skin goals on Messenger. No forms, no pressure." },
  { n: "02", title: "Get advice", text: "We recommend what fits your skin and your budget." },
  { n: "03", title: "Glow", text: "Relax in a calm studio while we take care of the rest." },
];

export const marquee = [
  "Korean techniques",
  "Facials",
  "Laser",
  "Body contouring",
  "Brows and ink",
  "Lash and nail bar",
  "Spa therapies",
  "Milkyway glow",
];
