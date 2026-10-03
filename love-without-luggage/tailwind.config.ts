import type { Config } from "tailwindcss";

// Every value points at a token in src/styles/tokens.css — no raw hex here.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        glass: "var(--glass)",
        hairline: "var(--hairline)",
        ground: "var(--ground)",
        "ground-deep": "var(--ground-deep)",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
      maxWidth: {
        shell: "var(--shell)",
      },
      spacing: {
        gutter: "var(--gutter)",
        nav: "var(--nav-h)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
      keyframes: {
        // No `to` block: the element's own resting state is the destination,
        // which is why the animation uses fill-mode `both`.
        settle: {
          from: { opacity: "0", transform: "translateY(16px)" },
        },
      },
      animation: {
        settle: "settle 1s var(--ease-out) both",
      },
    },
  },
  plugins: [],
};

export default config;
