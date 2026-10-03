import { footer } from "@/content/site";

/*
  Footer: brand + link columns, a giant faint wordmark that spans edge to edge,
  then the legal line. The wordmark is SVG text with a fixed textLength, so it
  fills the full width exactly at every screen size, with no clipping and no gaps.
*/

const SERIF = "font-serif font-normal tracking-[-0.02em] text-ink [font-variation-settings:'SOFT'_100]";

export default function Footer() {
  const c = footer;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline bg-ground-deep">
      <div className="shell">
        {/* Top: brand + columns */}
        <div className="grid gap-10 py-[clamp(48px,6vw,88px)] md:grid-cols-[2fr_1fr] md:gap-8">
          <div className="max-w-[24rem]">
            <p className={`${SERIF} text-[clamp(1.5rem,2.2vw,1.875rem)] leading-tight`}>
              {c.brand.replace("™", "")}
              {c.brand.includes("™") && <sup className="ml-0.5 text-[0.45em] text-ink-faint">™</sup>}
            </p>
            <p className="mt-4 text-[15.5px] leading-[1.6] text-ink-soft">{c.tagline}</p>
            <a
              href={c.cta.href}
              className="group mt-7 inline-flex h-11 items-center gap-2.5 rounded-full border border-hairline bg-glass pl-5 pr-4 text-[14.5px] font-medium text-ink transition-[background-color,color,border-color] duration-300 ease-out hover:border-transparent hover:bg-ink hover:text-accent-ink"
            >
              {c.cta.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {c.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink-faint">{col.title}</p>
              <ul className="mt-6 flex flex-col gap-4">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-[16px] text-ink-soft transition-colors duration-300 ease-out hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Giant wordmark, edge to edge */}
      <div aria-hidden="true" className="px-[clamp(12px,1.6vw,24px)]">
        <svg viewBox="0 0 1000 88" className="block h-auto w-full select-none">
          <defs>
            <linearGradient id="footer-wordmark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(248,241,236,0.075)" />
              <stop offset="100%" stopColor="rgba(248,241,236,0.025)" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="79"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontSize="108"
            fontWeight="800"
            letterSpacing="-4"
            className="font-sans"
            fill="url(#footer-wordmark)"
          >
            {c.wordmark}
          </text>
        </svg>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-hairline">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-[14px] text-ink-faint">
            © {year} {c.legal}
          </p>
          <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-ink-faint">{c.signoff}</p>
        </div>
      </div>
    </footer>
  );
}
