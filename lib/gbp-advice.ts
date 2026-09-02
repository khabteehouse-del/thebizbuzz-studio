/*
  Written advice for every weak answer, held as plain text.

  No API, no key, no billing, no rate limit, no failure mode. Every
  visitor gets the same quality of plan, instantly, forever.

  This is where the team's actual local search knowledge lives. Waqas
  should own this file. Rewrite any of it in his words and the tool gets
  better without a single line of code changing.

  Structure: for each question id, advice keyed by the answer given.
  action  what to do, imperative, specific enough to start today
  why     what it costs them if they do not
*/

export type Advice = {
  action: string;
  why: string;
};

type AdviceMap = Record<string, Record<string, Advice>>;

export const advice: AdviceMap = {
  verified: {
    claimed: {
      action:
        "Finish verification this week. Google will send a postcard, a phone call or an email depending on your business type, and the whole thing takes about ten minutes of your time once the code arrives.",
      why: "Until you are verified you cannot edit most of your own listing, and anyone can suggest changes to it that go live without your approval.",
    },
    no: {
      action:
        "Search your business name on Google while signed in to the account you want to own the listing. If a dashboard appears, claim it. If nothing appears, create the profile from scratch at business.google.com.",
      why: "An unclaimed listing is the single most expensive gap on this list. Google still shows it, but with whatever information it has scraped, and competitors can suggest edits to it.",
    },
  },

  category: {
    broad: {
      action:
        "Change your primary category to the most specific one that describes what you actually do most of. Look at the three businesses ranking above you and see what they use.",
      why: "Primary category is the strongest single ranking factor you control. Broad categories put you in a much larger pool competing for much less relevant searches.",
    },
    unsure: {
      action:
        "Open your profile, find Business category, and read what is currently set. Then pick the most specific option that matches your main service.",
      why: "Most profiles are still on whatever category was chosen at signup, often by someone who was guessing. It is a two minute fix with an outsized effect.",
    },
  },

  secondary: {
    few: {
      action:
        "Add two or three more secondary categories covering services you genuinely offer but that your primary category does not capture.",
      why: "Each legitimate secondary category is another set of searches you can appear in without competing against your own primary listing.",
    },
    none: {
      action:
        "Add three secondary categories for services you actually provide. Only real ones. Google penalises category stuffing and customers notice when a listing overclaims.",
      why: "You are currently only visible for one type of search when you probably serve several.",
    },
  },

  nap: {
    mostly: {
      action:
        "Search your business name and phone number in quotes on Google and list every site that shows old details. Fix or remove them, starting with the directories that rank highest.",
      why: "Old listings with a previous address or number split your authority and occasionally send customers to a place you no longer occupy.",
    },
    no: {
      action:
        "Write down your exact business name, address and phone as they appear on your Google profile. That is now the master version. Then audit every directory, social profile and page on your own site against it.",
      why: "Google reads inconsistency as uncertainty about whether you are a real, stable business, and ranks you accordingly.",
    },
  },

  reviews: {
    some: {
      action:
        "Set a target of five new reviews a month and ask every satisfied customer at the point they are happiest, not days later by email.",
      why: "You are past the credibility threshold but still below the businesses taking the top three map positions in most categories.",
    },
    few: {
      action:
        "Ask your ten most loyal customers this week, in person or on WhatsApp, with a direct link to your review form. Not a request to leave a review somewhere, an actual link.",
      why: "Under fifteen reviews, most people assume the business is either new or not busy. Both cost you the click.",
    },
    none: {
      action:
        "Get your first five reviews this week from customers you already know well. Send them the direct review link rather than asking them to search for you.",
      why: "A listing with no reviews reads as unproven no matter how long you have been trading. This is the fastest change on the list.",
    },
  },

  responses: {
    negative: {
      action:
        "Reply to every review, including the good ones. Two sentences is enough. Thank them, mention something specific they said.",
      why: "Replying only to complaints makes your profile look defensive. Replying to everything shows an owner who is present and paying attention.",
    },
    rarely: {
      action:
        "Reply to every review from the last three months, then set a reminder to check weekly. Keep replies short and never argue, even when you are right.",
      why: "Response rate is a ranking signal, and a well handled negative review often persuades more customers than a five star one.",
    },
  },

  asking: {
    "ad-hoc": {
      action:
        "Turn asking into a fixed step. Same moment every time: after the appointment, at payment, or when you hand over the work. Give them the direct link on a card or by message.",
      why: "Occasional asking produces occasional reviews. A steady stream is what actually moves you up the map pack.",
    },
    no: {
      action:
        "Get your review link from your profile, shorten it, and put it three places: on a printed card at the counter, in your invoice or receipt, and saved as a WhatsApp quick reply.",
      why: "Almost nobody leaves a review unprompted. The businesses ranking above you are not better liked, they just ask.",
    },
  },

  photos: {
    some: {
      action:
        "Add ten more photos and then keep adding two or three a month. Interior, exterior, your team, and the work itself. Real photos from a phone beat stock every time.",
      why: "Profiles with regularly updated photos get noticeably more calls and direction requests than static ones.",
    },
    few: {
      action:
        "Take fifteen photos this week: the front of the building so people can find it, the inside so they know what to expect, your team, and your actual work.",
      why: "A near empty photo section makes people wonder whether the business is still operating.",
    },
    none: {
      action:
        "Add at least ten photos today, starting with the exterior taken from the street. That one photo does more than any other to help someone actually find you.",
      why: "No photos is the second most common reason a customer picks the competitor listed under you.",
    },
  },

  posts: {
    sometimes: {
      action:
        "Post weekly. It does not need to be clever: an offer, a new service, a busy day, a finished job. Fifteen minutes on a Monday covers it.",
      why: "Posts show Google the profile is actively managed, and they occupy space on your listing that would otherwise be empty.",
    },
    never: {
      action:
        "Publish one post this week and put a recurring reminder in your calendar. Photo, two lines, done.",
      why: "An inactive profile ranks below an active one with otherwise identical information.",
    },
  },

  services: {
    partial: {
      action:
        "Complete the list with a short description for each service, and add prices or price ranges where you can.",
      why: "People compare before they call. A listing without prices loses to one with them, even when the priced option is more expensive.",
    },
    none: {
      action:
        "Add every service you offer with a one line description each. This takes about half an hour and only needs doing once.",
      why: "Your services list is searchable. Leaving it empty means you are invisible for every search that names a specific service rather than your category.",
    },
  },

  hours: {
    basic: {
      action:
        "Add holiday and special hours ahead of time, particularly Eid, Ramadan timings and any day you close early.",
      why: "Someone who drives to a closed business writes a one star review about it, and that review outlives the mistake by years.",
    },
    no: {
      action:
        "Fix your regular hours today, then add special hours for the next three months of holidays.",
      why: "Google shows Hours may differ on profiles it does not trust, which is visible to every person who looks you up.",
    },
  },

  website: {
    social: {
      action:
        "Point the website field at a proper site with your services, location and a way to contact you. A single well built page is enough.",
      why: "A social page as your website suggests a side operation rather than an established business, and you cannot control what else the visitor sees there.",
    },
    no: {
      action:
        "Get a one page site up with your services, address, hours and a phone number, then link it from the profile.",
      why: "The website link is one of the few places on your listing where you control the whole message rather than filling in Google's fields.",
    },
  },
};

/* Everything already strong gets a maintenance note instead */
export const maintenance: Advice = {
  action:
    "Keep doing what you are doing here, and check it once a quarter.",
  why: "Profiles drift. Categories get suggested, hours go stale, and competitors catch up.",
};

export function adviceFor(
  questionId: string,
  answerValue: string
): Advice | null {
  return advice[questionId]?.[answerValue] ?? null;
}
