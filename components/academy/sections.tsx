import Image from "next/image";
import {
  ACADEMY_OFFER_PERCENT,
  ACADEMY_PHONE_DISPLAY,
  academyFacts,
  academyFaq,
  academyGains,
  academyInstructor,
  academyJoinHref,
  academyPlans,
  academyTools,
  formatPkr,
  offerPrice,
  planHref,
} from "@/data/academy";
import { site } from "@/data/site";
import {
  ArrowIcon,
  CapIcon,
  CheckIcon,
  ChatIcon,
  ClockIcon,
  GainIcon,
} from "./icons";

/*
  Sections of the /academy page. Plain server components: no client script
  is needed, the FAQ uses native <details> and every motion is CSS only.
  All styling lives in app/academy/academy.css, scoped to .ac.
*/

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`ac-eyebrow${light ? " ac-eyebrow--light" : ""}`}>{children}</p>;
}

export function AcademyHero() {
  return (
    <section className="ac-hero" aria-labelledby="ac-title">
      <div className="ac-hero-media">
        <Image
          src="/images/academy/banner.webp"
          alt="Instructor Faraz Akhtar with a group of students learning AI beneath a glowing graduation cap"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="ac-hero-img"
        />
        <div className="ac-hero-shade" aria-hidden="true" />
      </div>

      <div className="shell ac-hero-inner">
        <div className="ac-hero-copy">
          <p className="ac-chip">
            <CapIcon width={16} height={16} /> BizBuzz AI Academy
          </p>
          <h1 id="ac-title" className="ac-h1">
            Learn AI.
            <br />
            <span>Build with AI.</span>
          </h1>
          <p className="ac-hero-lead">
            Practical online AI courses for students, professionals and business
            owners across Pakistan and beyond. From confident everyday use to
            building real AI-powered solutions.
          </p>
          <div className="ac-hero-actions">
            <a
              className="ac-btn ac-btn--white"
              href={academyJoinHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChatIcon width={18} height={18} /> Enroll on WhatsApp
            </a>
            <a className="ac-btn ac-btn--outline" href="#plans">
              See the 3 learning paths <ArrowIcon width={18} height={18} />
            </a>
          </div>
          <ul className="ac-hero-ticks">
            <li>
              <CheckIcon width={16} height={16} /> Hands-on projects
            </li>
            <li>
              <CheckIcon width={16} height={16} /> BizBuzz certificate
            </li>
            <li>
              <CheckIcon width={16} height={16} /> {ACADEMY_OFFER_PERCENT}% launch offer
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function AcademyFacts() {
  return (
    <section className="ac-facts-wrap" aria-label="Academy at a glance">
      <div className="shell">
        <ul className="ac-facts">
          {academyFacts.map((f) => (
            <li key={f.label}>
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AcademyGains() {
  return (
    <section className="ac-sec" id="gain">
      <div className="shell">
        <Eyebrow>What you will gain</Eyebrow>
        <h2 className="ac-h2">Become capable of using AI independently</h2>
        <p className="ac-lead">
          The aim is simple: you use AI on your own, on real tasks. Training
          focuses on practical tools, guided exercises and projects, not
          lengthy AI theory.
        </p>
        <ul className="ac-gains">
          {academyGains.map((g, i) => (
            <li key={g.title} className="ac-gain">
              <span className="ac-gain-ico">
                <GainIcon index={i} width={26} height={26} />
              </span>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AcademyPlans() {
  return (
    <section className="ac-sec ac-plans" id="plans" aria-labelledby="ac-plans-title">
      <div className="ac-plans-glow" aria-hidden="true" />
      <div className="shell">
        <Eyebrow light>Choose your learning path</Eyebrow>
        <h2 id="ac-plans-title" className="ac-h2 ac-h2--light">
          Three paths. Each one builds on the last.
        </h2>
        <p className="ac-lead ac-lead--light">
          Start with the essentials and move up when you are ready. All prices
          are total course fees in Pakistani Rupees (PKR).
        </p>

        <div className="ac-offer-bar">
          <strong>{ACADEMY_OFFER_PERCENT}% launch offer</strong>
          <span>on every plan, shown below against the full price</span>
        </div>

        <div className="ac-plan-grid">
          {academyPlans.map((plan) => (
            <article key={plan.id} className="ac-plan">
              <header>
                <div className="ac-plan-top">
                  <span className="ac-plan-num">{plan.number}</span>
                  <span className="ac-plan-badge">{plan.badge}</span>
                </div>
                <h3>{plan.name}</h3>
                <p className="ac-plan-level">{plan.level}</p>
                <p className="ac-plan-time">
                  <ClockIcon width={16} height={16} />
                  {plan.weeks} weeks, {plan.sessions} sessions, {plan.sessionLength} each
                </p>
              </header>

              <div className="ac-price">
                <span className="ac-price-was" aria-label={`Full price ${formatPkr(plan.fullPrice)}`}>
                  {formatPkr(plan.fullPrice)}
                </span>
                <span className="ac-price-now">{formatPkr(offerPrice(plan))}</span>
                <span className="ac-price-note">{ACADEMY_OFFER_PERCENT}% off, total course fee</span>
              </div>

              <p className="ac-plan-h">What we will cover</p>
              <ul className="ac-plan-list">
                {plan.covers.map((c) => (
                  <li key={c}>
                    <CheckIcon width={16} height={16} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <p className="ac-plan-h">How this benefits you</p>
              <p className="ac-plan-benefit">{plan.benefit}</p>

              <p className="ac-plan-outcome">
                <span>Learning outcome</span>
                {plan.outcome}
              </p>

              <a
                className="ac-btn ac-btn--solid ac-btn--block"
                href={planHref(plan)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enroll in this plan <ArrowIcon width={18} height={18} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
  Placeholder for the SEO course. Only what has been confirmed is shown: it is
  coming, it is taught by the BizBuzz SEO specialist, and details come later.
  No price, dates or topic list until they are decided.
*/
export function AcademySeoSoon() {
  return (
    <section className="ac-sec ac-soon-sec" id="seo-course" aria-labelledby="ac-soon-title">
      <div className="shell">
        <div className="ac-soon">
          <span className="ac-soon-tag">Coming soon</span>
          <h2 id="ac-soon-title" className="ac-soon-title">
            Search Engine Optimization (SEO) course
          </h2>
          <p className="ac-soon-text">
            SEO is one of the most in-demand digital skills today. A new SEO
            course is coming to the BizBuzz AI Academy, taught by our SEO
            specialist.
          </p>
          <p className="ac-soon-note">Courses will be announced shortly.</p>
        </div>
      </div>
    </section>
  );
}

export function AcademyJourney() {
  const steps = [
    { n: "1", title: "Use AI with confidence", plan: academyPlans[0].name },
    { n: "2", title: "Automate and create", plan: academyPlans[1].name },
    { n: "3", title: "Build AI solutions", plan: academyPlans[2].name },
  ];
  return (
    <section className="ac-sec ac-journey" id="journey">
      <div className="shell">
        <Eyebrow>Your learning journey</Eyebrow>
        <h2 className="ac-h2">From first prompt to your first AI product</h2>
        <p className="ac-lead">
          You do not have to decide everything today. Begin where you are and
          keep climbing, each path includes everything from the one before.
        </p>
        <ol className="ac-path">
          <span className="ac-path-line" aria-hidden="true" />
          {steps.map((s) => (
            <li key={s.n} className="ac-step">
              <span className="ac-step-node">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.plan}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AcademyTools() {
  return (
    <section className="ac-sec ac-tools" id="tools" aria-label="What you will work with">
      <div className="shell">
        <Eyebrow>What you will work with</Eyebrow>
        <h2 className="ac-h2">Real tools, used on real projects</h2>
        <ul className="ac-pills">
          {academyTools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AcademyInstructor() {
  return (
    <section className="ac-sec ac-instructor" id="instructor">
      <div className="shell ac-instructor-grid">
        <div className="ac-instructor-photo">
          <Image
            src="/images/team/faraz.jpg"
            alt={`${academyInstructor.name}, ${academyInstructor.role}`}
            width={900}
            height={1125}
            sizes="(min-width: 900px) 420px, 80vw"
            quality={80}
          />
        </div>
        <div>
          <Eyebrow>Meet your instructor</Eyebrow>
          <h2 className="ac-h2">{academyInstructor.name}</h2>
          <p className="ac-instructor-role">{academyInstructor.role}</p>
          <p className="ac-lead">
            You learn from someone who builds with these tools every day, not
            from a slide deck. Every session is practical, and every plan ends
            with something you have made yourself.
          </p>
          <ul className="ac-ticks">
            {academyInstructor.points.map((p) => (
              <li key={p}>
                <CheckIcon width={18} height={18} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function AcademyConnect() {
  const items = [
    {
      title: "Personal guidance",
      text: "Message us, tell us your goal, and we guide you to the path that fits you.",
    },
    {
      title: "Hands-on, every session",
      text: "Guided exercises and projects throughout the course, so you learn by doing.",
    },
    {
      title: "Your schedule, sorted",
      text: "Once you choose a plan, we prepare a class schedule with session-by-session topics.",
    },
  ];
  return (
    <section className="ac-sec ac-connect" id="connect">
      <svg className="ac-net" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g className="ac-net-lines">
          <path d="M40 330 L260 150 L470 280 L690 90 L900 240 L1160 110" />
          <path d="M120 60 L260 150 L380 40 L470 280 L610 360 L690 90" />
          <path d="M610 360 L900 240 L1040 380 L1160 110" />
        </g>
        <g className="ac-net-dots">
          {[
            [40, 330],
            [260, 150],
            [470, 280],
            [690, 90],
            [900, 240],
            [1160, 110],
            [120, 60],
            [380, 40],
            [610, 360],
            [1040, 380],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" style={{ animationDelay: `${(i % 5) * 0.55}s` }} />
          ))}
        </g>
      </svg>
      <div className="shell ac-connect-inner">
        <Eyebrow light>You are not learning alone</Eyebrow>
        <h2 className="ac-h2 ac-h2--light">Learn with guidance, not guesswork</h2>
        <ul className="ac-connect-grid">
          {items.map((it) => (
            <li key={it.title}>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AcademyCertificate() {
  return (
    <section className="ac-sec ac-cert" id="certificate">
      <div className="shell ac-cert-grid">
        <div>
          <Eyebrow>BizBuzz certificate</Eyebrow>
          <h2 className="ac-h2">Finish the course. Earn the certificate.</h2>
          <p className="ac-lead">
            You earn a BizBuzz certificate of completion by completing the
            course, passing a practical assessment and submitting the required
            project. It names the course you completed and the learning
            outcome.
          </p>
          <p className="ac-note">
            This is a certificate of completion issued by BizBuzz. It is not a
            government-accredited or university qualification.
          </p>
        </div>
        <div className="ac-cert-card" aria-hidden="true">
          <div className="ac-cert-inner">
            <span className="ac-cert-seal">
              <CapIcon width={30} height={30} />
            </span>
            <p className="ac-cert-brand">BizBuzz AI Academy</p>
            <p className="ac-cert-title">Certificate of Completion</p>
            <span className="ac-cert-rule" />
            <p className="ac-cert-line">Awarded for completing the course and the practical project</p>
            <p className="ac-cert-name">Your name here</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AcademyFaq() {
  return (
    <section className="ac-sec ac-faq" id="faq">
      <div className="shell ac-faq-inner">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="ac-h2">Before you enroll</h2>
        <div className="ac-faq-list">
          {academyFaq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AcademyFinalCta() {
  return (
    <section className="ac-final" id="enroll" aria-labelledby="ac-final-title">
      <div className="shell ac-final-inner">
        <h2 id="ac-final-title" className="ac-final-title">
          The world is learning AI.
          <br />
          <span>Are you?</span>
        </h2>
        <p className="ac-final-lead">
          Message us on WhatsApp, tell us your goal, and we will guide you to
          the right path. The {ACADEMY_OFFER_PERCENT}% launch offer is on now.
        </p>
        <div className="ac-final-actions">
          <a
            className="ac-btn ac-btn--white ac-btn--lg"
            href={academyJoinHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChatIcon width={20} height={20} /> Enroll on WhatsApp
          </a>
        </div>
        <p className="ac-final-contact">
          WhatsApp {ACADEMY_PHONE_DISPLAY} <span aria-hidden="true">|</span> {site.url.replace("https://", "")}
        </p>
      </div>
    </section>
  );
}
