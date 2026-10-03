// Shared types. Section content shapes are defined as copy is added.

/** A run of text where some words carry emphasis (rendered in the accent / bold). */
export type RichText = Array<{ text: string; em?: boolean }>;

export type Link = { label: string; href: string };

export type NavContent = {
  links: Link[];
};

export type HeroContent = {
  eyebrow: { system: string; poweredBy: string };
  headline: RichText;
  subheadline: RichText;
  cta: Link;
  trust: string[];
};

export type StoryIcon = "broken-heart" | "heart" | "question" | "suitcase";

export type ProblemContent = {
  heading: RichText;
  /** The journey: each beat is a stop on the path, in reading order. */
  beats: Array<{ icon: StoryIcon; text: RichText }>;
  /** Where the path ends — the reframe. */
  resolution: { tagline: RichText; statement: RichText };
};
export type ProgramOverviewContent = {
  eyebrow: string;
  /** Beat 1: clear away what it isn't (each line gets struck through on scroll) */
  notIntro: string;
  nots: string[];
  /** ...then say what it is */
  headline: RichText;
  kicker: string;
  description: RichText;
  /** Beat 2: the two levels */
  levelsHeading: RichText;
  levels: Array<{
    label: string;
    title: string;
    body: string;
    outcomes: string[];
    visual: "persona" | "reset";
  }>;
};
export type JourneyContent = {
  eyebrow: string;
  heading: RichText;
  stages: Array<{ verb: string; rest: string }>;
};

export type Person = "travis" | "michelle";

export type ProgramStructureContent = {
  eyebrow: string;
  heading: RichText;
  lede: string;
  blend: string;
  immersion: { label: string; title: RichText };
  format: Array<{ label: string; value: string; note?: string }>;
  phases: Array<{
    weeks: string;
    name: string;
    quote: string;
    kickoff?: { label: string; title: string; meta: string; body: string };
    cadence: string;
    receiveLabel: string;
    sessions: Array<{
      step?: string;
      kind: "individual" | "joint";
      tag: string;
      title: string;
      detail?: string;
      people: Person[];
    }>;
    focusLabel: string;
    focus: string[];
    goal: string;
  }>;
  cta: Link;
};
export type ManifestoContent = {
  eyebrow: string;
  /** Each line lights up word by word as you scroll; `size` sets its weight in the story */
  lines: Array<{ text: RichText; size: "lead" | "body" | "turn" | "close" }>;
  guarantee: {
    photo: string;
    photoAlt: string;
    caption: string;
    label: string;
    heading: RichText;
    body: string;
  };
  cta: Link;
};
export type GuidesContent = {
  eyebrow: string;
  heading: RichText;
  guides: Array<{
    name: string;
    role: string;
    photo: string;
    credentials: string[];
    highlights: Array<{ value: string; label: string }>;
    summary: string;
    quote: string;
    leads: string[];
  }>;
};
export type FooterContent = {
  brand: string;
  tagline: string;
  cta: Link;
  columns: Array<{ title: string; links: Array<Link & { external?: boolean }> }>;
  legal: string;
  signoff: string;
  /** the giant wordmark along the bottom */
  wordmark: string;
};
