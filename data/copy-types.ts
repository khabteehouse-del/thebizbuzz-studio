/*
  The shape of every piece of text on the site. English and Spanish both
  have to fill this shape completely, so a missing Spanish line is a build
  error, never a silent gap on the live page.
*/

export type Feature = { title: string; text: string };
export type Step = { title: string; text: string };
export type Faq = { q: string; a: string };

export type ServiceCopy = {
  navLabel: string;
  title: string;
  cardLine: string;
  bullets: string[];
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /* The part of h1 that gets the highlighter swipe. Must appear inside h1. */
  h1Mark: string;
  intro: string;
  featuresTitle: string;
  features: Feature[];
  stepsTitle: string;
  steps: Step[];
  fitTitle: string;
  fit: string[];
  ctaTitle: string;
  ctaText: string;
  /* One optional plain line shown under the intro */
  note?: string;
};

export type LegalSection = { title: string; text: string[] };

export type LegalCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  h1Mark: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export type Copy = {
  htmlLang: string;
  locale: string;
  nav: {
    services: string;
    mizar: string;
    about: string;
    cta: string;
    switchLabel: string;
    switchAria: string;
    menuOpen: string;
    menuClose: string;
    home: string;
  };
  common: {
    learnMore: string;
    freeAudit: string;
    bookConsultation: string;
    seeServices: string;
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1Before: string;
    h1Mark: string;
    h1After: string;
    sub: string;
    note: string;
    soundsTitle: string;
    sounds: Feature[];
    servicesEyebrow: string;
    servicesTitle: string;
    servicesIntro: string;
    servicesGroupFind: string;
    servicesGroupGet: string;
    auditEyebrow: string;
    auditTitle: string;
    auditText: string;
    auditPoints: string[];
    stepsEyebrow: string;
    stepsTitle: string;
    steps: Step[];
    industriesEyebrow: string;
    industriesTitle: string;
    industriesIntro: string;
    mizarBadge: string;
    mizarTitle: string;
    mizarText: string;
    mizarCta: string;
    faqEyebrow: string;
    faqTitle: string;
    faqs: Faq[];
    finalTitle: string;
    finalText: string;
  };
  services: {
    websites: ServiceCopy;
    localSeo: ServiceCopy;
    gbp: ServiceCopy;
    ads: ServiceCopy;
    video: ServiceCopy;
  };
  mizar: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    h1: string;
    h1Mark: string;
    intro: string;
    notice: string;
    forTitle: string;
    forList: string[];
    doesTitle: string;
    doesIntro: string;
    does: Feature[];
    languageNote: string;
    formTitle: string;
    formText: string;
    formButton: string;
    formDone: string;
    parentLine: string;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1: string;
    h1Mark: string;
    intro: string;
    storyTitle: string;
    story: string[];
    valuesTitle: string;
    values: Feature[];
    familyTitle: string;
    familyIntro: string;
    familyParent: Feature;
    familyAgency: Feature;
    familyProduct: Feature;
    honestTitle: string;
    honestText: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1: string;
    h1Mark: string;
    intro: string;
    nextTitle: string;
    next: Step[];
    languageNote: string;
    remoteNote: string;
  };
  form: {
    title: string;
    topicLabel: string;
    topics: {
      audit: string;
      website: string;
      seo: string;
      gbp: string;
      ads: string;
      video: string;
    };
    nameLabel: string;
    contactLabel: string;
    businessLabel: string;
    optional: string;
    messageLabel: string;
    messageHint: string;
    submit: string;
    sending: string;
    privacy: string;
    doneTitle: string;
    doneText: string;
    errName: string;
    errContact: string;
    errMessage: string;
    errSend: string;
    errGeneric: string;
  };
  footer: {
    tagline: string;
    servicesTitle: string;
    companyTitle: string;
    privacy: string;
    terms: string;
    remote: string;
    poweredBy: string;
    rights: string;
  };
  legal: { privacy: LegalCopy; terms: LegalCopy };
  notFound: { title: string; text: string; back: string };
};
