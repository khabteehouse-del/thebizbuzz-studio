/*
  Design gallery data.

  Add a piece by copying an entry, putting its image(s) in
  public/images/design/<category>/ as WebP (about 1600px wide), and giving
  the real width and height of the file so the page never jumps while
  images load.

  A piece with more than one image is a set: it shows as one card and the
  viewer steps through its images.

  Titles are the brand or job name only. Nothing here claims who the work
  was for. If a piece is client work and the client agrees to be named,
  add a `client` field and show it in the gallery.
*/

export type DesignCategory = "brand" | "logo" | "print";

export type DesignImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Design = {
  id: string;
  title: string;
  category: DesignCategory;
  /* One short line on what the piece shows. */
  caption: string;
  /* The first image is the cover. */
  images: DesignImage[];
};

export const designCategories: { id: DesignCategory; label: string }[] = [
  { id: "brand", label: "Brand identity" },
  { id: "logo", label: "Logos" },
  { id: "print", label: "Flyers and posters" },
];

export const designCredit = "BizBuzz Design Team";

const dir = "/images/design";

export const designs: Design[] = [
  /* ---------------- Brand identity ---------------- */
  {
    id: "astoria",
    title: "Astoria Fashion Design",
    category: "brand",
    caption: "Identity board and letterhead in navy and gold",
    images: [
      {
        src: `${dir}/brand/astoria-board.webp`,
        alt: "Astoria Fashion Design brand board: logo, stickers, stationery, gift boxes, pattern, tags and apparel in navy and gold",
        width: 1600,
        height: 1066,
      },
      {
        src: `${dir}/brand/astoria-letterhead.webp`,
        alt: "Astoria Fashion Design letterhead in dark and light versions on a white wooden desk",
        width: 1600,
        height: 1200,
      },
    ],
  },
  {
    id: "elite-estates",
    title: "Elite Estates",
    category: "brand",
    caption: "Real estate identity in gold on deep navy",
    images: [
      {
        src: `${dir}/brand/elite-estates-board.webp`,
        alt: "Elite Estates brand board: gold house-shaped logo on tote bag, letterhead, embossed card, signage and a building facade",
        width: 1600,
        height: 1066,
      },
    ],
  },
  {
    id: "funky-vogue",
    title: "Funky Vogue",
    category: "brand",
    caption: "Dark fashion identity with a neon green accent",
    images: [
      {
        src: `${dir}/brand/funky-vogue-board.webp`,
        alt: "Funky Vogue brand board: flame mark, stationery, boxes, pattern, tag and shopping bag in black and neon green",
        width: 1600,
        height: 1066,
      },
      {
        src: `${dir}/brand/funky-vogue-logo.webp`,
        alt: "Funky Vogue logo in neon green with a white flame mark on a black background",
        width: 1600,
        height: 1131,
      },
    ],
  },
  {
    id: "pooch-shop",
    title: "Pooch Shop",
    category: "brand",
    caption: "Playful pet brand system with palette and type",
    images: [
      {
        src: `${dir}/brand/pooch-board.webp`,
        alt: "Pooch Shop brand board: dog-face logo, coral and turquoise palette, pattern, apparel, business cards and typeface sample",
        width: 1600,
        height: 1066,
      },
    ],
  },
  {
    id: "minae",
    title: "Minae",
    category: "brand",
    caption: "Business cards for a fashion label",
    images: [
      {
        src: `${dir}/brand/minae-cards.webp`,
        alt: "Minae business cards, one navy with a coral figure logo and one white, stacked on a black surface",
        width: 1600,
        height: 1200,
      },
    ],
  },
  {
    id: "hair-secret",
    title: "Hair Secret",
    category: "brand",
    caption: "Appointment cards for a hair studio",
    images: [
      {
        src: `${dir}/brand/hair-secret-cards.webp`,
        alt: "Hair Secret appointment cards in black and white on a pale grey background",
        width: 1600,
        height: 1200,
      },
    ],
  },

  /* ---------------- Logos ---------------- */
  {
    id: "craft-campus",
    title: "Craft Campus",
    category: "logo",
    caption: "Logo pressed into a blue jacket",
    images: [
      {
        src: `${dir}/logo/craft-campus.webp`,
        alt: "Craft Campus logo with an orange kite mark pressed into blue technical fabric",
        width: 1600,
        height: 1066,
      },
    ],
  },
  {
    id: "glamzes-tools",
    title: "Glamzes Tools",
    category: "logo",
    caption: "Crossed hammers mark on a hanging shop sign",
    images: [
      {
        src: `${dir}/logo/glamzes-tools.webp`,
        alt: "Glamzes Tools logo with crossed hammers on a cream hanging shop sign",
        width: 1600,
        height: 1063,
      },
    ],
  },
  {
    id: "golden-hop",
    title: "The Golden Hop",
    category: "logo",
    caption: "Brewery badge on a gold bottle label",
    images: [
      {
        src: `${dir}/logo/golden-hop.webp`,
        alt: "The Golden Hop brewery logo on a gold label on a dark beer bottle beside a full glass",
        width: 1080,
        height: 1620,
      },
    ],
  },
  {
    id: "wolfpack",
    title: "Wolfpack 626",
    category: "logo",
    caption: "Streetball crest with a 3D wordmark",
    images: [
      {
        src: `${dir}/logo/wolfpack.webp`,
        alt: "Wolfpack 626 basketball logo with five husky heads and a basketball above a blue 3D wordmark on an outdoor court",
        width: 1024,
        height: 1024,
      },
    ],
  },
  {
    id: "master-king",
    title: "Master King",
    category: "logo",
    caption: "Esports mascot logo in black and gold",
    images: [
      {
        src: `${dir}/logo/master-king.webp`,
        alt: "Master King esports logo with a boar mascot in a gold-edged shield on a black background",
        width: 1200,
        height: 1200,
      },
    ],
  },

  /* ---------------- Flyers and posters ---------------- */
  {
    id: "glow-fest",
    title: "Glow Fest",
    category: "print",
    caption: "Neon club night flyer",
    images: [
      {
        src: `${dir}/print/glow-fest.webp`,
        alt: "Glow Fest club night flyer with a glitter-painted face and neon outlined title, shown with two blurred copies behind",
        width: 1600,
        height: 1148,
      },
    ],
  },
  {
    id: "electric-vibes",
    title: "Electric Vibes Party",
    category: "print",
    caption: "Tropical party flyer in green and gold",
    images: [
      {
        src: `${dir}/print/electric-vibes.webp`,
        alt: "Electric Vibes Party flyer with a woman in a straw hat holding a cocktail on a green tropical background",
        width: 1600,
        height: 1148,
      },
    ],
  },
  {
    id: "iron-pulse",
    title: "Iron Pulse Fitness",
    category: "print",
    caption: "Gym flyer in black, neon green and red",
    images: [
      {
        src: `${dir}/print/iron-pulse.webp`,
        alt: "Iron Pulse Fitness flyer with a black and white gym photo, neon green headline and a red services panel",
        width: 1600,
        height: 1066,
      },
    ],
  },
  {
    id: "big-sale",
    title: "Big Sale",
    category: "print",
    caption: "Fashion sale poster on an amber gradient",
    images: [
      {
        src: `${dir}/print/big-sale.webp`,
        alt: "Big Sale fashion poster with two women in trench coats on an orange background and a 30 percent off callout",
        width: 1600,
        height: 1148,
      },
    ],
  },
  {
    id: "keys-to-luxury",
    title: "Keys to Luxury",
    category: "print",
    caption: "Real estate flyer in deep green and gold",
    images: [
      {
        src: `${dir}/print/keys-to-luxury.webp`,
        alt: "Keys to Luxury real estate flyer in deep green with circular interior photos, partly covered by a rolled copy",
        width: 1600,
        height: 1066,
      },
    ],
  },
  {
    id: "house-of-opportunities",
    title: "House of Opportunities",
    category: "print",
    caption: "Clean real estate flyer in two layouts",
    images: [
      {
        src: `${dir}/print/house-of-opportunities.webp`,
        alt: "House of Opportunities real estate flyer in light grey with three rounded interior photos, shown in two layouts",
        width: 1600,
        height: 1055,
      },
    ],
  },
  {
    id: "play-as-legends",
    title: "Play as Legends",
    category: "print",
    caption: "Sports poster in black and green",
    images: [
      {
        src: `${dir}/print/play-as-legends.webp`,
        alt: "Sports poster of a football player in a helmet holding the ball, in black and white on dark green, with two blurred copies behind",
        width: 1600,
        height: 1200,
      },
    ],
  },
];

/* The image shown on the back of the Brand identity tile on the home page. */
export const designTileHero = {
  src: `${dir}/print/play-as-legends.webp`,
  alt: "Sports poster of a football player in a helmet holding the ball, in black and white on dark green",
  width: 1600,
  height: 1200,
};
