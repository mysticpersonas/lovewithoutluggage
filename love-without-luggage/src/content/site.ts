import type {
  NavContent,
  HeroContent,
  ProblemContent,
  ProgramOverviewContent,
  JourneyContent,
  ProgramStructureContent,
  ManifestoContent,
  GuidesContent,
  FooterContent,
} from "@/lib/types";

// TODO: replace with the real checkout / booking URL once confirmed.
const RESERVE_HREF = "#reserve";

export const nav: NavContent = {
  links: [
    { label: "Home", href: "#top" },
    { label: "The Program", href: "#program" },
    { label: "Your Guides", href: "#guides" },
    { label: "Join", href: "#join" },
  ],
};

export const hero: HeroContent = {
  eyebrow: {
    system: "MIND Persona System",
    poweredBy: "powered by Mystic Personas",
  },
  headline: [
    { text: "Heal", em: true },
    { text: " your " },
    { text: "past", em: true },
    { text: " so it does not sabotage your " },
    { text: "relationship", em: true },
    { text: "." },
  ],
  subheadline: [
    { text: "A 6-week live coaching journey for " },
    { text: "couples", em: true },
    {
      text: " ready to release past relationship trauma, break emotional cycles, and build love rooted in safety, clarity, and trust.",
    },
  ],
  cta: { label: "Reserve Your Spot", href: RESERVE_HREF },
  trust: [
    "6-week live coaching",
    "Led by Dr. Travis & Michelle Fox",
  ],
};

export const problem: ProblemContent = {
  heading: [
    { text: "Still carrying the " },
    { text: "hurt", em: true },
    { text: " from your past, affecting your relationships?" },
  ],
  beats: [
    {
      icon: "broken-heart",
      text: [
        {
          text: "The heartbreak, the betrayal, the loss of trust. It lingers, shaping how you see yourself and how you show up in love.",
        },
      ],
    },
    {
      icon: "heart",
      text: [{ text: "Maybe you find yourself questioning your worth." }],
    },
    {
      icon: "question",
      text: [{ text: "Maybe you can’t fully trust, even when you want to." }],
    },
    {
      icon: "suitcase",
      text: [
        { text: "You’re not broken. You’re carrying baggage that was never meant to be yours forever, " },
        { text: "and you can set it down.", em: true },
      ],
    },
  ],
  resolution: {
    tagline: [
      { text: "You’re Not Just Healing. You’re " },
      { text: "Rewriting Your Love Story.", em: true },
    ],
    statement: [
      { text: "Whether you’re fresh out of heartbreak… or still carrying wounds from years ago, " },
      { text: "Love Without Luggage", em: true },
      { text: " is the journey to finally set down what was never yours to carry." },
    ],
  },
};
// Program overview + "Not Therapy. Not Tarot. Not Woo." merged into one story.
// Lines that repeated the Problem section's ending ("Whether you're…", "rewrite
// your love story") are dropped; the two outcome lists are folded into the levels.
export const programOverview: ProgramOverviewContent = {
  eyebrow: "The Program",
  notIntro: "This isn’t",
  nots: [
    "just another relationship course.",
    "a “think positive” mindset trick.",
    "therapy, tarot, or woo.",
  ],
  headline: [
    { text: "This is " },
    { text: "emotional rewiring", em: true },
    { text: " for couples." },
  ],
  kicker: "This is where you change the pattern for good.",
  description: [
    { text: "Your Relationship Reset with Mind Personas is a guided, step-by-step repatterning experience, led by " },
    { text: "Dr. Travis & Michelle Fox", em: true },
    { text: ", designed to help you reclaim trust, identity, and emotional truth, so you can create love without the baggage." },
  ],
  levelsHeading: [
    { text: "You’ll move through " },
    { text: "two powerful levels.", em: true },
  ],
  levels: [
    {
      label: "Level 1",
      title: "Rebuild your relationship with yourself",
      body: "Release negative self-talk, and uncover how past connections shaped your self-worth.",
      outcomes: [
        "Untangle the negative thought patterns that have shaped past relationships",
        "Heal the parts of you love couldn’t reach before",
      ],
      visual: "persona",
    },
    {
      label: "Level 2",
      title: "Identify and heal your triggers",
      body: "So they no longer control how you love or who you choose.",
      outcomes: [
        "Understand the triggers that keep love feeling unsafe",
      ],
      visual: "reset",
    },
  ],
};
// "In this 6-week journey, you'll:" as a four-stop map. The verbs lead each
// stage; these four lines live here only (removed from the level cards above).
export const journey: JourneyContent = {
  eyebrow: "Your 6-week journey",
  heading: [
    { text: "In this " },
    { text: "6-week journey", em: true },
    { text: ", you’ll:" },
  ],
  stages: [
    { verb: "Identify", rest: "your unique Relationship Persona and stress response style." },
    { verb: "Spot", rest: "the Shadow Patterns blocking intimacy, trust, and connection." },
    { verb: "Interrupt", rest: "emotional spirals before they turn into shutdowns or blow-ups." },
    { verb: "Replace", rest: "old reactive scripts with deeply aligned, love-forward responses." },
  ],
};

// The 6-week roadmap. Copy is verbatim from the content file, lightly
// re-punctuated (no em dashes) and split into calendar-sized pieces.
export const programStructure: ProgramStructureContent = {
  eyebrow: "The roadmap",
  heading: [
    { text: "Your 6-Week " },
    { text: "Relationship Reset", em: true },
  ],
  lede: "A profound, guided journey designed to help couples release what’s been carried for far too long, rebuild trust through truth, and reconnect at the soul level.",
  blend: "This program blends masculine and feminine facilitation, trauma-informed Mystic Persona insights, and deeply attuned relational healing.",
  immersion: {
    label: "LOVE Without Luggage",
    title: [
      { text: "A 6-Week Couples Healing Immersion with " },
      { text: "Dr. Travis & Michelle Fox", em: true },
    ],
  },
  format: [
    { label: "Format", value: "6 Weeks" },
    { label: "Frequency", value: "2 sessions", note: "per week" },
    { label: "Session length", value: "45–60 min", note: "each" },
  ],
  phases: [
    {
      weeks: "Weeks 1–3",
      name: "The Deep Healing Phase",
      quote: "These aren’t my beliefs. These are what I adopted to survive.",
      kickoff: {
        label: "Week 1 · Kickoff",
        title: "Live group call",
        meta: "30 min · with Dr. Travis & Michelle Fox",
        body: "Relationship mapping: what do you as partners want to achieve within the next 6 weeks?",
      },
      cadence: "2 sessions per week",
      receiveLabel: "Each week you receive: individual sessions (two separate calls)",
      sessions: [
        { kind: "individual", tag: "1:1", title: "Husband + Travis", people: ["travis"] },
        { kind: "individual", tag: "1:1", title: "Wife + Michelle", people: ["michelle"] },
      ],
      focusLabel: "These sessions focus on",
      focus: [
        "Identifying wounds, unmet needs, and emotional patterns",
        "Understanding each partner’s Core, Shadow, and Oracle personas",
        "Trauma-informed attunement and nervous system pacing",
        "Releasing old narratives and “relationship baggage”",
        "Separation of truth from triggers",
        "Constellation readings + relational energy mapping",
      ],
      goal: "Create rapid clarity, break repeating cycles, and open space for genuine reconnection.",
    },
    {
      weeks: "Weeks 4–6",
      name: "Integration + Reconnection Phase",
      quote: "If I can see it, I can change it.",
      cadence: "2 sessions per week",
      receiveLabel: "Each week includes",
      sessions: [
        {
          step: "1",
          kind: "individual",
          tag: "1:1",
          title: "One individual session",
          detail: "Husband + Travis · Wife + Michelle",
          people: ["travis", "michelle"],
        },
        {
          step: "2",
          kind: "joint",
          tag: "Joint",
          title: "One joint couples session",
          detail: "Michelle + Travis together, with Husband + Wife together",
          people: ["travis", "michelle"],
        },
      ],
      focusLabel: "These sessions focus on",
      focus: [
        "Communication rewiring using the Mystic Persona framework",
        "Repair + reconnection rituals",
        "Emotional safety building",
        "Conflict de-escalation tools",
        "Partnership agreements",
        "Heart-centered action steps",
        "Moving from Shadow → Core → Oracle relational patterns",
      ],
      goal: "Practice new relational skills together in a held, safe, guided environment.",
    },
  ],
  cta: { label: "Drop the baggage today", href: RESERVE_HREF },
};
// The closing manifesto. Verbatim copy, em dashes rewritten as commas.
export const manifesto: ManifestoContent = {
  eyebrow: "Why Mind Personas™",
  lines: [
    {
      size: "lead",
      text: [
        { text: "You don’t need another relationship program telling you to “communicate better” or “just move on.”" },
      ],
    },
    {
      size: "lead",
      text: [
        { text: "You need a path that helps you " },
        { text: "take back your emotional authority", em: true },
        { text: " and trust yourself again." },
      ],
    },
    {
      size: "body",
      text: [
        { text: "Most systems give you someone else’s rules, someone else’s blueprint, but that’s exactly what got you stuck in patterns that weren’t yours to begin with." },
      ],
    },
    {
      size: "turn",
      text: [
        { text: "Mind Personas™", em: true },
        { text: " is different." },
      ],
    },
    {
      size: "body",
      text: [
        { text: "We guide you through a proven, relationship-healing system, built from real trauma-to-triumph journeys, so you can break free from old survival beliefs, rewire your responses, and create a connection blueprint that works for " },
        { text: "you.", em: true },
      ],
    },
    {
      size: "body",
      text: [{ text: "No more forcing yourself into someone else’s steps." }],
    },
    {
      size: "close",
      text: [
        { text: "This time, you’re the " },
        { text: "author", em: true },
        { text: " of how your story ends." },
      ],
    },
  ],
  closing: {
    photo: "/images/travis-michelle.jpg",
    photoAlt: "Dr. Travis Fox and Michelle Fox, laughing together",
    caption: "Dr. Travis & Michelle Fox",
    label: "LOVE Without Luggage",
    heading: [
      { text: "A 6-Week Couples Healing Immersion with " },
      { text: "Dr. Travis & Michelle Fox.", em: true },
    ],
    body: "Live 1:1 and joint couples sessions, two each week, for six weeks.",
  },
  cta: { label: "Join now", href: RESERVE_HREF },
};
// Bios trimmed to what proves expertise: credentials, proof points, one line
// on the approach, their core idea, and what each leads in the program.
export const guides: GuidesContent = {
  eyebrow: "Your guides",
  heading: [
    { text: "Who will " },
    { text: "guide", em: true },
    { text: " us?" },
  ],
  guides: [
    {
      name: "Dr. Travis Fox",
      role: "Co-Creator, Love Without Luggage™",
      photo: "/images/travis-portrait.jpg",
      credentials: ["PhD, Psychology", "Clinical Hypnotherapist", "NLP Master Trainer", "Emmy Award-Winning Producer"],
      highlights: [
        { value: "25+", label: "years guiding individuals & couples" },
        { value: "1M+", label: "people guided through subconscious transformation" },
      ],
      summary:
        "Helps people recognize the survival roles stress pushes them into (protector, pursuer, withdrawer, fixer) and step out of them with clarity and dignity.",
      quote:
        "Why do people carry emotional patterns into relationships that no longer serve them, and how can those patterns be released without blame?",
      leads: [
        "Relational identity and attachment-pattern modeling",
        "Emotional state-recognition and reset frameworks",
        "Keeping the work practical, respectful, and emotionally safe",
      ],
    },
    {
      name: "Michelle S. Fox",
      role: "Co-Creator, Love Without Luggage™",
      photo: "/images/michelle-portrait.jpg",
      credentials: ["Somatic Hypnotherapist", "Trauma & Identity Integration Guide", "Certified MindPersona® Mapping Practitioner"],
      highlights: [
        { value: "Creator", label: "of HypnoAlchemy™" },
        { value: "Architect", label: "of the Mind Personas Human Identity Architecture" },
      ],
      summary:
        "Translates complex trauma into clear, compassionate language that helps people feel safe, seen, and understood, without re-living the past.",
      quote:
        "People don’t bring “baggage” into relationships. They bring unrecognized nervous-system states.",
      leads: [
        "Somatic state recognition and nervous-system stabilization",
        "Emotional pattern interruption during conflict",
        "Identity repair and self-trust restoration",
      ],
    },
  ],
};
export const footer: FooterContent = {
  brand: "Love Without Luggage™",
  tagline: "A 6-week live coaching journey for couples ready to release the past and love without fear.",
  cta: { label: "Reserve your spot", href: RESERVE_HREF },
  columns: [
    {
      title: "The program",
      links: [
        { label: "Home", href: "#top" },
        { label: "The Roadmap", href: "#program" },
        { label: "Your Guides", href: "#guides" },
        { label: "Join", href: "#join" },
      ],
    },
  ],
  legal: "Mystic Personas. All rights reserved.",
  signoff: "Heal the past · Love freely",
  wordmark: "LOVEW/OLUGGAGE",
};
