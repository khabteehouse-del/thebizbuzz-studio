/*
  Content for the detail page of each service, at /services/<slug>.
  FIRST DRAFT for review: facts, tools and claims must be checked by the
  team before this goes live. Keyword targets will come from the SEO lead.
  No prices anywhere: every page ends in "Get a quote".
  The Mizar page is a product description only: no plans, no prices.
  `banner` is the slot for the finished picture. Until a picture is added
  the page shows a drawn banner in the service's own colours.
*/

export type ServicePage = {
  /* Matches the id in data/services.ts */
  id: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  lead: string;
  whoFor: string[];
  whatWeDo: { h: string; p: string }[];
  process: { h: string; p: string }[];
  deliverables: string[];
  /* Omitted on pages that should not show a tool list (Mizar). */
  tech?: { group: string; items: string[] }[];
  faqs: { q: string; a: string }[];
  related: string[];
  banner?: { src: string; alt: string; width: number; height: number };
};

export const servicePages: ServicePage[] = [
  {
    id: "gbp",
    slug: "google-business-profile",
    seoTitle: "Google Business Profile Management",
    seoDescription:
      "Setup, optimization and monthly management of your Google Business Profile so nearby customers find you, call you and ask for directions.",
    lead:
      "Your Google Business Profile is the card people see when they search for what you sell, near where they are. We set it up properly, keep it current and turn it into calls, direction requests and bookings.",
    whoFor: [
      "Clinics, salons, restaurants, showrooms and shops with a physical address",
      "Service businesses that travel to the customer and want to appear in their area",
      "Businesses with a profile that is unclaimed, suspended, duplicated or half filled in",
      "Owners who want one person accountable for what Google shows about them",
    ],
    whatWeDo: [
      {
        h: "Claim, verify and clean up",
        p: "We claim or recover the listing, handle verification, merge duplicates and fix wrong names, addresses and phone numbers so every detail matches your real business.",
      },
      {
        h: "Categories, services and attributes",
        p: "The primary category decides which searches you appear for. We choose it carefully, add the secondary categories that apply, list every service and set the attributes customers filter by.",
      },
      {
        h: "Photos, posts and products",
        p: "A complete profile with real photos, regular posts, offers and a product or service list gets more taps than a bare one. We plan the content and publish it on a steady schedule.",
      },
      {
        h: "Questions, messages and reviews",
        p: "We seed and answer the Questions section, set up messaging where it helps, and reply to reviews in your voice, so the profile looks active and cared for.",
      },
      {
        h: "Reporting you can read",
        p: "Each month you get calls, direction requests, website taps and the searches that found you, in plain numbers with a short note on what we will do next.",
      },
    ],
    process: [
      { h: "Audit", p: "We check what Google shows today, how competitors appear and where you are losing taps." },
      { h: "Fix the foundation", p: "Name, address, phone, categories, hours, services and attributes are corrected first." },
      { h: "Build out", p: "Photos, description, products and the first round of posts go live." },
      { h: "Maintain and grow", p: "Weekly posting, review replies, question handling and monthly reporting." },
    ],
    deliverables: [
      "A complete, verified and consistent profile",
      "Category and service strategy written down",
      "A posting calendar and published posts",
      "Review reply templates in your tone",
      "Monthly performance report",
    ],
    tech: [
      { group: "Google tools", items: ["Google Business Profile Manager", "Google Search Console", "Google Analytics 4", "Looker Studio reports"] },
      { group: "Tracking", items: ["UTM tagged profile links", "Call and direction tracking", "Review monitoring"] },
    ],
    faqs: [
      { q: "How long until I see results?", a: "Fixes to a broken or incomplete profile can change what people see within weeks. Ranking gains usually build over two to three months of steady work." },
      { q: "Do you need access to my Google account?", a: "No. You add us as a manager on the profile, and you can remove us at any time." },
      { q: "My profile was suspended. Can you help?", a: "Yes. We review why it was suspended, correct the cause and file the reinstatement request. We cannot promise the outcome, because Google makes that decision." },
      { q: "Is there a free check?", a: "Yes. Our free Google listing check on this site scans your profile in about a minute." },
    ],
    related: ["local-seo", "reviews", "local-web"],
  },
  {
    id: "local-seo",
    slug: "local-search-and-maps",
    seoTitle: "Local SEO and Map Pack Ranking",
    seoDescription:
      "Local search work that helps your business appear in the map pack for what people near you actually search: citations, on-page local SEO and tracking.",
    lead:
      "When someone nearby searches for what you offer, three businesses appear on the map. Local SEO is the work of making yours one of them, and proving it with numbers.",
    whoFor: [
      "Businesses that depend on customers within a city or a few neighbourhoods",
      "Multi-branch businesses that need each location to rank for its own area",
      "Companies that rank on the map but not in the normal results, or the other way round",
    ],
    whatWeDo: [
      {
        h: "Keyword and area research",
        p: "We find the searches that bring paying customers, by service and by neighbourhood, including the wording people really use, not the wording we would like them to use.",
      },
      {
        h: "On-page local SEO",
        p: "Service pages, location pages, titles, headings, internal links and local schema so search engines understand what you do and where.",
      },
      {
        h: "Citations and consistency",
        p: "Your name, address and phone number listed identically across the directories and maps that matter, with duplicates and old details removed.",
      },
      {
        h: "Local links and mentions",
        p: "Relevant local sources that point to you, such as partners, associations, local press and community pages.",
      },
      {
        h: "Rank tracking by location",
        p: "We track where you appear from different points in your city, not one average number, so you see where you win and where you do not.",
      },
    ],
    process: [
      { h: "Baseline", p: "Current rankings, listings and site health recorded before any change." },
      { h: "Plan", p: "A written plan listing the pages, listings and links we will work on, in order of impact." },
      { h: "Execute", p: "Fixes and new pages go live in small batches so we can see what moved the numbers." },
      { h: "Review monthly", p: "Rankings, calls, direction requests and form leads reported together." },
    ],
    deliverables: [
      "Keyword map by service and area",
      "Optimized service and location pages",
      "Citation clean-up report",
      "Local schema markup",
      "Monthly ranking and lead report",
    ],
    tech: [
      { group: "Research and tracking", items: ["Google Search Console", "Google Analytics 4", "Local rank grid tracking", "Keyword research tools"] },
      { group: "Site and markup", items: ["Next.js or WordPress sites", "JSON-LD LocalBusiness schema", "XML sitemaps"] },
    ],
    faqs: [
      { q: "What is the map pack?", a: "The group of three local businesses shown with a map above the normal results for searches with local intent." },
      { q: "Can you guarantee first place?", a: "No one honest can. We commit to the work, the reporting and the targets we agree together." },
      { q: "Do I need a website for local SEO?", a: "It helps a lot. If you do not have one, our website service builds one that is ready for local search." },
    ],
    related: ["gbp", "reviews", "geo-aeo"],
  },
  {
    id: "reviews",
    slug: "reviews-and-reputation",
    seoTitle: "Reviews and Reputation Management",
    seoDescription:
      "A steady, honest system for collecting more Google reviews, replying well and protecting your reputation online.",
    lead:
      "Reviews decide who gets the call. We build a simple routine that makes it easy for happy customers to leave one, and a calm way to deal with the rest.",
    whoFor: [
      "Businesses with few reviews or an uneven rating",
      "Owners who are too busy to ask for reviews consistently",
      "Brands that want a professional way to answer negative feedback",
    ],
    whatWeDo: [
      { h: "A review request routine", p: "A short message or card sent at the moment the customer is happiest, with a direct link so leaving a review takes seconds." },
      { h: "Replies in your voice", p: "Every review gets a reply that sounds like you: warm for praise, calm and specific for criticism." },
      { h: "Handling negative reviews", p: "We separate fair complaints from policy violations, help you resolve the first, and report the second to the platform." },
      { h: "Reputation reporting", p: "Rating trend, new reviews, themes in what customers praise or complain about, and what to change in the business." },
    ],
    process: [
      { h: "Review audit", p: "Where you stand today against nearby competitors." },
      { h: "Set up the routine", p: "Links, message wording and who sends them." },
      { h: "Run and reply", p: "Requests go out, replies are posted within a day or two." },
      { h: "Learn from it", p: "Monthly themes shared so the feedback improves the business itself." },
    ],
    deliverables: [
      "Direct review link and QR code",
      "Request message templates",
      "Reply guidelines in your tone",
      "Monthly reputation summary",
    ],
    tech: [
      { group: "Tools", items: ["Google Business Profile", "QR code and short link generation", "WhatsApp and SMS templates", "Review monitoring alerts"] },
    ],
    faqs: [
      { q: "Can you remove bad reviews?", a: "Only reviews that break the platform's rules can be removed, and the platform decides. We report those properly." },
      { q: "Do you write reviews for us?", a: "No. Fake reviews break the rules and harm your business when they are found. We make it easier for real customers to write real ones." },
    ],
    related: ["gbp", "local-seo", "social-media"],
  },
  {
    id: "local-web",
    slug: "websites-that-convert",
    seoTitle: "Websites That Convert for Local Businesses",
    seoDescription:
      "Fast, clear websites for clinics, salons, shops and service businesses, built to turn visitors into calls, bookings and WhatsApp messages.",
    lead:
      "A local business website has one job: make the next step obvious. We build sites that load fast on a phone, say clearly what you do and make it easy to call, book or message you.",
    whoFor: [
      "Local businesses with no website or an outdated one",
      "Clinics and studios that need booking and enquiry forms that work",
      "Shops and service companies that get most visitors from a phone",
    ],
    whatWeDo: [
      { h: "Structure for search and for people", p: "A clear page for each main service, a contact page, and the trust details customers look for: address, hours, reviews and photos." },
      { h: "Built for phones first", p: "Large tap targets, fast loading and the call and WhatsApp buttons always within reach." },
      { h: "Enquiry and booking paths", p: "Forms, click to call, WhatsApp links and booking tools connected so no enquiry gets lost." },
      { h: "Local SEO built in", p: "Titles, headings, schema and speed set up from day one, so the site is ready for search." },
    ],
    process: [
      { h: "Brief", p: "Your services, audience, competitors and the actions you want visitors to take." },
      { h: "Design", p: "Page layouts agreed before building starts, on phone and on desktop." },
      { h: "Build", p: "Development, content, images and tracking." },
      { h: "Launch and review", p: "Testing, go live, and a check of the first weeks of data." },
    ],
    deliverables: [
      "Responsive website",
      "Contact, booking and WhatsApp paths",
      "Basic on-page SEO and sitemap",
      "Analytics and conversion tracking",
    ],
    tech: [
      { group: "Build", items: ["Next.js and React", "Tailwind CSS", "Vercel hosting"] },
      { group: "Performance and SEO", items: ["Image optimization", "Core Web Vitals checks", "JSON-LD schema", "XML sitemaps"] },
      { group: "Tracking", items: ["Google Analytics 4", "Google Search Console"] },
    ],
    faqs: [
      { q: "Do I own the website?", a: "Yes. You own the domain and the content, and we hand over access on request." },
      { q: "How long does a website take?", a: "Most local business sites take a few weeks from agreed content to launch." },
      { q: "Can you update it later?", a: "Yes, either as small one-off changes or inside a monthly plan." },
    ],
    related: ["local-seo", "web", "gbp"],
  },
  {
    id: "social-media",
    slug: "social-media-management",
    seoTitle: "Social Media Management",
    seoDescription:
      "Planning, content and posting for Instagram, Facebook, TikTok and LinkedIn, with simple monthly reporting.",
    lead:
      "Posting every day is not a strategy. We plan content around what your customers care about, produce it, publish it and report on what it did for the business.",
    whoFor: [
      "Businesses that post randomly or not at all",
      "Brands that want a consistent look and voice across channels",
      "Owners who want leads from social, not just likes",
    ],
    whatWeDo: [
      { h: "Content planning", p: "A monthly calendar built around your services, offers, seasons and customer questions." },
      { h: "Creative production", p: "Designed posts, short videos and stories that fit your brand." },
      { h: "Publishing and community", p: "Scheduled posting and replies to comments and messages within agreed hours." },
      { h: "Reporting", p: "Reach, engagement, messages and enquiries, with what worked and what we will change." },
    ],
    process: [
      { h: "Brand and audience review", p: "Your voice, your customers and what competitors post." },
      { h: "Calendar", p: "Topics and formats agreed before production." },
      { h: "Produce and publish", p: "Content is approved by you, then scheduled." },
      { h: "Report and adjust", p: "Monthly review and next month's plan." },
    ],
    deliverables: ["Monthly content calendar", "Designed posts and short videos", "Scheduled publishing", "Monthly report"],
    tech: [
      { group: "Platforms", items: ["Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube Shorts"] },
      { group: "Tools", items: ["Scheduling tools", "Design and video editing software", "Platform analytics"] },
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "We pick the platforms where your customers are, usually one to three, instead of spreading thin across all of them." },
      { q: "Do I approve posts first?", a: "Yes. Nothing goes out without your approval unless you tell us otherwise." },
    ],
    related: ["ugc-ads", "brand", "growth"],
  },
  {
    id: "youtube",
    slug: "youtube-management-and-monetization",
    seoTitle: "YouTube Channel Management and Monetization",
    seoDescription:
      "Channel strategy, production support, optimization and monetization planning for creators and brands on YouTube.",
    lead:
      "A YouTube channel grows from a clear idea, consistent publishing and videos that people finish. We help with strategy, packaging and the steps toward monetization.",
    whoFor: [
      "Creators and brands starting or restarting a channel",
      "Channels that publish but are not growing",
      "Businesses that want YouTube to support sales or trust",
    ],
    whatWeDo: [
      { h: "Channel strategy", p: "Niche, audience, content pillars and a realistic publishing rhythm." },
      { h: "Titles, thumbnails and descriptions", p: "Packaging that earns the click and honestly reflects the video." },
      { h: "Production support", p: "Scripts, editing guidance and short form cuts from long videos." },
      { h: "Optimization and analytics", p: "Retention, click-through and traffic sources reviewed, with changes tested over time." },
      { h: "Monetization planning", p: "Meeting the program requirements, setting up the account correctly and adding income beyond ads when it fits." },
    ],
    process: [
      { h: "Channel review", p: "What is working, what is not and why." },
      { h: "Strategy", p: "Positioning, content plan and goals." },
      { h: "Publish and optimize", p: "Consistent releases with measured improvements." },
      { h: "Monetize", p: "Programs and revenue sources added as the channel qualifies." },
    ],
    deliverables: ["Channel strategy document", "Title and thumbnail guidance", "Content calendar", "Monthly analytics review"],
    tech: [
      { group: "Platform", items: ["YouTube Studio and analytics", "YouTube Partner Program requirements"] },
      { group: "Production", items: ["Video editing software", "Thumbnail design tools", "Short form repurposing"] },
    ],
    faqs: [
      { q: "Can you guarantee monetization?", a: "No. The platform sets the requirements and makes the decision. We help you meet them correctly." },
      { q: "Do you buy views or subscribers?", a: "Never. It breaks the rules and damages the channel." },
    ],
    related: ["ai-content", "social-media", "ugc-ads"],
  },
  {
    id: "mizar",
    slug: "mizar",
    seoTitle: "Mizar: AI Business Assistant for Mobile Professionals",
    seoDescription:
      "Mizar answers calls and messages, collects the details, helps book the job and keeps your day in order, for professionals who work at the customer's door.",
    lead:
      "Mizar is a business assistant in your pocket. It picks up the calls and messages you cannot answer while you are on the job, collects the details and keeps your day in order, by voice.",
    whoFor: [
      "Beauticians, painters, electricians, plumbers, vets and other professionals who go to the customer",
      "Owner-operators who lose calls while their hands are busy",
      "Small teams that want every enquiry written down in one place",
    ],
    whatWeDo: [
      { h: "Answers calls you miss", p: "When you cannot pick up, your assistant answers, asks the right questions and records the details of the enquiry." },
      { h: "Collects the details", p: "Name, number, what the customer needs and when, saved as a clear lead you can act on." },
      { h: "Keeps your day in order", p: "See your leads, jobs and messages together, and ask about them by voice while you work." },
      { h: "Stays inside clear limits", p: "The assistant does not quote prices or make promises for you. You make those decisions." },
    ],
    process: [
      { h: "A customer calls or messages", p: "If you are busy, the assistant answers." },
      { h: "The details are collected", p: "The enquiry appears in your app as a lead." },
      { h: "You decide", p: "Call back, take the job or pass. You stay in control." },
    ],
    deliverables: ["A mobile app for your leads, jobs and messages", "A business assistant that answers for you", "Voice access to your day"],
    faqs: [
      { q: "Is Mizar a real person?", a: "No. It is an automatic assistant, and callers are told so." },
      { q: "Does it give prices to customers?", a: "No. Prices and promises stay with you." },
      { q: "How do I get early access?", a: "Message us on WhatsApp and we will tell you what happens next." },
    ],
    related: ["ai", "local-web", "gbp"],
  },
  {
    id: "ai",
    slug: "ai-integrated-solutions",
    seoTitle: "AI-Integrated Solutions for Business",
    seoDescription:
      "Production AI systems with evaluation and guardrails: retrieval over private data, agents that complete real workflows and secure deployments.",
    lead:
      "Useful AI is mostly engineering around the model: good data, clear limits, tests and monitoring. We design and build AI systems that hold up in real operations and in security review.",
    whoFor: [
      "Companies with documents, tickets or records that staff waste time searching",
      "Teams that want an agent to complete a repeatable workflow",
      "Organizations that need AI inside strict privacy or compliance limits",
    ],
    whatWeDo: [
      { h: "Retrieval over private data", p: "Assistants that answer from your own documents, with sources shown, so answers can be checked." },
      { h: "Agents for real workflows", p: "Systems that take a request through several steps, such as reading, deciding, drafting and updating a record, with a person approving where it matters." },
      { h: "Evaluation and guardrails", p: "Test sets, scoring and rules for what the system may and may not do, run before launch and after every change." },
      { h: "Secure deployment", p: "Access control, logging and hosting choices that fit your data policy." },
      { h: "Integration", p: "Connecting the system to the tools your team already uses." },
    ],
    process: [
      { h: "Scope", p: "One workflow, written acceptance criteria and what success looks like." },
      { h: "Prototype on your data", p: "A small working version to test with real examples." },
      { h: "Evaluate", p: "Measured quality and failure cases before wider use." },
      { h: "Harden and deploy", p: "Security, monitoring and handover." },
    ],
    deliverables: ["Scoped build with written acceptance criteria", "Working system on your data", "Evaluation results", "Deployment and handover notes"],
    tech: [
      { group: "Models and orchestration", items: ["Large language model APIs", "LangGraph style agent workflows", "Prompt and output validation"] },
      { group: "Data and retrieval", items: ["PostgreSQL", "Vector search", "Document parsing"] },
      { group: "Application", items: ["Python and TypeScript", "REST APIs", "Docker", "Vercel or cloud hosting"] },
    ],
    faqs: [
      { q: "Can the data stay private?", a: "Yes. We choose hosting and model options that fit your data policy, including self-hosted setups where needed." },
      { q: "How do you stop wrong answers?", a: "Sources are shown, limits are written as rules, and the system is tested against known cases before it goes live." },
      { q: "Where do we start?", a: "With one small, valuable workflow, not a company-wide programme." },
    ],
    related: ["mizar", "geo-aeo", "growth"],
  },
  {
    id: "geo-aeo",
    slug: "generative-and-answer-engine-optimization",
    seoTitle: "Generative and Answer Engine Optimization (GEO and AEO)",
    seoDescription:
      "Make your business easier for AI assistants and answer engines to find, understand and quote, on top of normal search.",
    lead:
      "More people now get answers from AI assistants and answer boxes, not a list of links. We help your business be the clear, trustworthy source those systems quote.",
    whoFor: [
      "Businesses whose customers research before they buy",
      "Brands that want to appear in AI answers and featured results",
      "Companies with good content that is hard for machines to read",
    ],
    whatWeDo: [
      { h: "Answer-ready content", p: "Pages that state who you are, what you do and who you serve in plain, quotable sentences, with direct answers to real questions." },
      { h: "Structured data", p: "Schema markup that tells machines about your business, services, people and FAQs." },
      { h: "Entity and consistency work", p: "Your name, descriptions and details kept consistent across your site, profiles and mentions." },
      { h: "Visibility checks", p: "Regular tests of what AI assistants and search features say about you and your competitors." },
    ],
    process: [
      { h: "Visibility audit", p: "What assistants and answer boxes say today." },
      { h: "Fix and structure", p: "Content and markup improved." },
      { h: "Earn mentions", p: "Credible sources and profiles that reinforce your details." },
      { h: "Re-test", p: "Repeat the checks and report the change." },
    ],
    deliverables: ["Visibility audit", "Answer-ready content updates", "Schema markup", "Quarterly re-test report"],
    tech: [
      { group: "Markup", items: ["JSON-LD schema", "FAQ and Organization markup", "XML sitemaps"] },
      { group: "Checks", items: ["Google Search Console", "AI assistant and answer box testing"] },
    ],
    faqs: [
      { q: "Is this different from SEO?", a: "It builds on it. Good SEO is the base, and GEO and AEO add clarity for AI systems." },
      { q: "Can you guarantee mentions in AI answers?", a: "No. These systems change often. We improve your clarity and credibility and measure the result." },
    ],
    related: ["local-seo", "growth", "ai"],
  },
  {
    id: "growth",
    slug: "growth-marketing",
    seoTitle: "Growth Marketing and Paid Campaigns",
    seoDescription:
      "Measured growth marketing: paid campaigns, funnels and tracking that tie spend to leads and sales.",
    lead:
      "Growth is a loop of testing, measuring and doing more of what works. We set up the tracking first, then run campaigns we can judge in leads and sales, not impressions.",
    whoFor: [
      "Businesses ready to put money into ads and wanting it to be accountable",
      "Companies with traffic but weak conversion",
      "Founders who need a clear view of cost per lead",
    ],
    whatWeDo: [
      { h: "Tracking first", p: "Conversion tracking and reporting set up so every campaign can be judged." },
      { h: "Paid campaigns", p: "Search, social and video campaigns with tested offers and audiences." },
      { h: "Landing pages and funnels", p: "Pages and follow-up steps built for one clear action." },
      { h: "Testing and reporting", p: "Regular tests of ads and pages, with results shared in plain language." },
    ],
    process: [
      { h: "Goal and budget", p: "What a lead or sale is worth and what you can spend." },
      { h: "Set up", p: "Accounts, tracking, creative and pages." },
      { h: "Launch and test", p: "Small budgets first, scaling what works." },
      { h: "Report", p: "Cost per lead, lead quality and next steps." },
    ],
    deliverables: ["Tracking setup", "Campaign structure and creative", "Landing pages", "Monthly performance report"],
    tech: [
      { group: "Ad platforms", items: ["Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads"] },
      { group: "Measurement", items: ["Google Analytics 4", "Google Tag Manager", "Looker Studio dashboards"] },
    ],
    faqs: [
      { q: "Does the ad spend go through you?", a: "Ad spend is paid to the platform from your own account, so you always see where the money goes." },
      { q: "How soon will I see leads?", a: "Early signals come within weeks. A reliable picture usually takes a few months of testing." },
    ],
    related: ["ugc-ads", "local-web", "geo-aeo"],
  },
  {
    id: "brand",
    slug: "brand-identity-and-creative",
    seoTitle: "Brand Identity and Creative Design",
    seoDescription:
      "Logo, visual identity, brand guidelines and creative assets that make a business look and sound consistent.",
    lead:
      "A brand is a promise people can recognise at a glance. We design the identity and the everyday assets that carry it, so every touchpoint looks like the same company.",
    whoFor: [
      "New businesses that need an identity",
      "Established brands that look dated or inconsistent",
      "Companies launching a new product or market",
    ],
    whatWeDo: [
      { h: "Brand strategy", p: "Positioning, audience, personality and voice in a short written brief." },
      { h: "Visual identity", p: "Logo, colours, typography and supporting graphics." },
      { h: "Guidelines", p: "A clear guide so your team and suppliers use the identity correctly." },
      { h: "Creative assets", p: "Social templates, stationery, presentations and packaging." },
    ],
    process: [
      { h: "Discover", p: "Interviews, market review and goals." },
      { h: "Concepts", p: "Directions presented with reasoning." },
      { h: "Refine", p: "One direction developed with your feedback." },
      { h: "Deliver", p: "Final files and guidelines." },
    ],
    deliverables: ["Logo in all needed formats", "Colour and type system", "Brand guidelines", "Core creative assets"],
    tech: [
      { group: "Design", items: ["Adobe Illustrator and Photoshop", "Figma", "Vector and print-ready export"] },
    ],
    faqs: [
      { q: "Who owns the final design?", a: "You do, once the project is paid for." },
      { q: "How many concepts do we see?", a: "We agree the number at the start, so the process stays focused." },
    ],
    related: ["web", "social-media", "ai-content"],
  },
  {
    id: "ai-content",
    slug: "ai-content-and-video-creation",
    seoTitle: "AI Content and Video Creation",
    seoDescription:
      "Videos, voiceovers, images and written content produced with AI tools and finished by people, for faster output at consistent quality.",
    lead:
      "AI tools speed up production, but taste and checking still come from people. We combine both to make video, audio, images and copy that look professional and stay on brand.",
    whoFor: [
      "Brands that need more content than a small team can produce",
      "Businesses that want short videos and explainers at a manageable cost",
      "Creators who want help with scripting, voice and editing",
    ],
    whatWeDo: [
      { h: "Scripts and copy", p: "Drafted with AI, edited by people, checked for accuracy and tone." },
      { h: "Video and motion", p: "Short videos, explainers and promos assembled and edited to a finished standard." },
      { h: "Voiceover and audio", p: "Voice work and sound design for videos and ads." },
      { h: "Images and graphics", p: "Original visuals made to your brand guidelines." },
    ],
    process: [
      { h: "Brief", p: "Goal, audience, format and tone." },
      { h: "Draft", p: "Script and visual direction for approval." },
      { h: "Produce", p: "Generation, editing and sound." },
      { h: "Review and deliver", p: "Your feedback, then final files in the formats you need." },
    ],
    deliverables: ["Approved scripts", "Edited videos or audio", "Image and graphic sets", "Final files for each platform"],
    tech: [
      { group: "Creation", items: ["Generative image and video tools", "AI voice tools", "Professional video and audio editing software"] },
      { group: "Quality", items: ["Human review of every asset", "Brand guideline checks"] },
    ],
    faqs: [
      { q: "Do you use real people's faces or voices?", a: "Not without permission. We use original or licensed material only." },
      { q: "Will it look obviously AI?", a: "We edit and finish by hand so the result looks deliberate and on brand." },
    ],
    related: ["ugc-ads", "youtube", "brand"],
  },
  {
    id: "ugc-ads",
    slug: "ugc-ad-content",
    seoTitle: "UGC Ad Content for Social and Paid Campaigns",
    seoDescription:
      "Creator-style video ads that look native on TikTok, Instagram and YouTube, built to be tested and improved.",
    lead:
      "Ads that look like real recommendations often outperform polished ones. We produce creator-style video content built for testing across social and paid channels.",
    whoFor: [
      "E-commerce and service brands running paid social",
      "Teams that need fresh creative every month",
      "Brands that want to test several hooks and offers quickly",
    ],
    whatWeDo: [
      { h: "Concepts and hooks", p: "Angles built from what your customers care about, with several openings to test." },
      { h: "Scripting and production", p: "Short vertical videos with clear structure: hook, proof, offer and call to action." },
      { h: "Variations for testing", p: "Several cuts of each idea so the ad platform can find the strongest one." },
      { h: "Performance feedback", p: "Results reviewed to guide the next round of creative." },
    ],
    process: [
      { h: "Brief and research", p: "Product, customer and competitor ads." },
      { h: "Script", p: "Concepts and hooks approved by you." },
      { h: "Produce", p: "Filming or generation, editing and captions." },
      { h: "Test and learn", p: "Launch, read the results and iterate." },
    ],
    deliverables: ["Concept and hook list", "Finished vertical videos", "Variations for testing", "Creative performance notes"],
    tech: [
      { group: "Platforms", items: ["TikTok", "Instagram Reels", "YouTube Shorts", "Meta and TikTok ad managers"] },
      { group: "Production", items: ["Video editing software", "Captioning tools", "AI-assisted generation where appropriate"] },
    ],
    faqs: [
      { q: "Are the people in the videos real?", a: "We tell you how each video is made, and we never present invented testimonials as genuine customers." },
      { q: "Do you run the ads too?", a: "Yes, through our growth marketing service, or you can run them yourself." },
    ],
    related: ["growth", "social-media", "ai-content"],
  },
  {
    id: "web",
    slug: "web-and-product-design",
    seoTitle: "Web and Product Design",
    seoDescription:
      "Websites, web apps and product interfaces designed and built to production standard, with clear acceptance criteria.",
    lead:
      "Design and engineering work best together. We design the experience and build it, so what ships matches what was agreed, on phones and on desktops.",
    whoFor: [
      "Companies launching or rebuilding a website or web app",
      "Startups that need a product interface designed and built",
      "Teams whose current site is slow, hard to update or off-brand",
    ],
    whatWeDo: [
      { h: "UX and interface design", p: "User flows, wireframes and visual design tested on real screen sizes." },
      { h: "Front-end build", p: "Fast, accessible pages and interfaces built from the approved design." },
      { h: "Back-end and integrations", p: "Databases, sign-in, payments and the tools your team uses." },
      { h: "Performance and accessibility", p: "Speed, readability and keyboard and screen reader support checked before launch." },
    ],
    process: [
      { h: "Scope", p: "Goals, pages or screens and written acceptance criteria." },
      { h: "Design", p: "Layouts reviewed on phone and desktop." },
      { h: "Build", p: "Development in stages you can preview." },
      { h: "Launch and support", p: "Testing, deployment and a period of fixes." },
    ],
    deliverables: ["Design files", "Production website or web app", "Documentation and handover", "Post-launch support period"],
    tech: [
      { group: "Front end", items: ["Next.js and React", "TypeScript", "Tailwind CSS"] },
      { group: "Back end", items: ["Node.js", "PostgreSQL and Supabase", "REST APIs"] },
      { group: "Delivery", items: ["Vercel hosting", "Git version control", "Figma for design"] },
    ],
    faqs: [
      { q: "Do you build on WordPress?", a: "We choose the tool that fits the project. For most builds that is Next.js, with a content system where editors need one." },
      { q: "Will I be able to edit the site myself?", a: "Yes. We set up simple editing for the content you change often." },
    ],
    related: ["local-web", "brand", "ai"],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((p) => p.slug === slug);
}

export function servicePageSlug(id: string) {
  return servicePages.find((p) => p.id === id)?.slug;
}
