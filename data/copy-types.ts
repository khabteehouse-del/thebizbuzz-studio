import type { IndustryKey } from "@/data/i18n";

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
};

export type IndustryCopy = {
  name: string;
  /* Which service this page leads with, shown as a small label */
  focus: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Mark: string;
  intro: string;
  painsTitle: string;
  pains: Feature[];
  includedTitle: string;
  included: string[];
  closing: string;
};

export type Copy = {
  htmlLang: string;
  locale: string;
  nav: {
    websites: string;
    localSeo: string;
    gbp: string;
    industries: string;
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
    inDevelopment: string;
    illustration: string;
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
    chips: string[];
    heroCardTitle: string;
    heroCardChips: string[];
    soundsTitle: string;
    sounds: Feature[];
    servicesEyebrow: string;
    servicesTitle: string;
    servicesIntro: string;
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
    proofEyebrow: string;
    proofTitle: string;
    proofText: string;
    proofLink: string;
    proofNote: string;
    whyTitle: string;
    why: Feature[];
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
  };
  industriesIndex: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    h1Mark: string;
    intro: string;
    otherTitle: string;
    otherText: string;
  };
  industries: Record<IndustryKey, IndustryCopy>;
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
    topics: { audit: string; website: string; seo: string; gbp: string };
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
    industriesTitle: string;
    companyTitle: string;
    remote: string;
    poweredBy: string;
    rights: string;
  };
  notFound: { title: string; text: string; back: string };
};
