// Inline SVG icons — currentColor, no icon library.

import type { StoryIcon as StoryIconName } from "@/lib/types";

type IconProps = { size?: number };

// Line icons for the story path. One stroke weight, round caps — they read as
// one family, and as quiet marks on a journey rather than illustrations.
const STORY_PATHS: Record<StoryIconName, React.ReactNode> = {
  "broken-heart": (
    <>
      <path d="M12 19.5s-7.5-4.4-7.5-10.1A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7.5 2.4c0 5.7-7.5 10.1-7.5 10.1Z" />
      <path d="m12 7-1.6 3.6 2.6 1.6-1.6 3.4" />
    </>
  ),
  heart: (
    <path d="M12 19.5s-7.5-4.4-7.5-10.1A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7.5 2.4c0 5.7-7.5 10.1-7.5 10.1Z" />
  ),
  question: (
    <>
      <path d="M9.2 9.3a2.9 2.9 0 1 1 4.1 2.6c-.8.4-1.3 1.1-1.3 2v.6" />
      <path d="M12 17.6v.1" />
    </>
  ),
  suitcase: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="2.2" />
      <path d="M9.2 8V6.3c0-.7.5-1.2 1.2-1.2h3.2c.7 0 1.2.5 1.2 1.2V8M8.5 8v11M15.5 8v11" />
    </>
  ),
};

export function StoryIcon({ name, size = 22 }: IconProps & { name: StoryIconName }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {STORY_PATHS[name]}
    </svg>
  );
}

export function MenuIcon({ open = false, size = 21 }: IconProps & { open?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        // Two bars, not three — the closed state is deliberately minimal.
        <path d="M4 9h16M4 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function CheckIcon({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
