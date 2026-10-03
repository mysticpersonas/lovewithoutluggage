"use client";

import { useEffect, useRef } from "react";
import { manifesto } from "@/content/site";
import type { RichText } from "@/lib/types";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Rich from "@/components/ui/Rich";

/*
  The closing manifesto, read like a slow exhale.
  Each line starts dim and lights up word by word as you scroll, at your
  reading pace, so it's never a wall of text. A thin gold line marks the
  turn ("Mind Personas™ is different."), and the last line lands large,
  with "author" in gold, right before the final call to action.

  Performance: one scroll listener sets a single --p (0..1) per line; each
  word's opacity is pure CSS from --p, its index --i and the line's word count --n.
*/

const SIZES = {
  lead: "font-serif text-[clamp(1.625rem,2.8vw,2.375rem)] font-normal leading-[1.3] tracking-[-0.015em] [font-variation-settings:'SOFT'_100]",
  body: "font-sans text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.65]",
  turn: "font-serif text-[clamp(2rem,3.6vw,3rem)] font-normal leading-[1.15] tracking-[-0.02em] [font-variation-settings:'SOFT'_100]",
  close:
    "font-serif text-[clamp(2.125rem,4.4vw,3.75rem)] font-normal leading-[1.12] tracking-[-0.025em] [font-variation-settings:'SOFT'_100]",
};
const EM = {
  lead: "font-light italic text-accent",
  body: "font-semibold text-ink",
  turn: "font-light italic text-accent",
  close: "font-light italic text-accent",
};
const GAP = { lead: "mt-6 sm:mt-8", body: "mt-6 sm:mt-8", turn: "mt-0", close: "mt-[clamp(40px,6vw,88px)]" };

function Words({ value, emClassName }: { value: RichText; emClassName: string }) {
  let i = 0;
  return (
    <>
      {value.map((part, pi) =>
        part.text.split(/(\s+)/).map((w, wi) => {
          if (!w) return null;
          if (/^\s+$/.test(w)) return <span key={`${pi}-${wi}`}>{w}</span>;
          const idx = i++;
          return (
            <span
              key={`${pi}-${wi}`}
              className={`manifesto-word ${part.em ? emClassName : ""}`}
              style={{ "--i": idx } as React.CSSProperties}
            >
              {w}
            </span>
          );
        }),
      )}
    </>
  );
}

const countWords = (v: RichText) => v.reduce((n, p) => n + p.text.split(/\s+/).filter(Boolean).length, 0);

export default function Manifesto() {
  const c = manifesto;
  const g = c.closing;
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      lineRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        // starts lighting when the line's top reaches 88% of the screen, done by ~45%
        const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.88 - r.top) / (vh * 0.43 + r.height * 0.5)));
        el.style.setProperty("--p", p.toFixed(3));
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="manifesto" aria-label={c.eyebrow} className="relative isolate overflow-hidden bg-ground-deep">
      {/* warm light gathering toward the closing line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_28%_at_50%_82%,rgba(122,58,96,0.26)_0%,rgba(15,9,17,0)_100%),radial-gradient(30%_14%_at_50%_80%,rgba(230,200,156,0.07)_0%,rgba(15,9,17,0)_100%)]"
      />

      <div className="shell py-[clamp(44px,9vw,144px)]">
        <div className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
          <p className="mb-8 inline-flex sm:mb-12 items-center gap-3 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-faint sm:text-[13px]">
            <span className="dot" aria-hidden="true" />
            {c.eyebrow}
            <span className="dot" aria-hidden="true" />
          </p>

          {c.lines.map((line, i) => (
            <div key={i} className={i === 0 ? "" : GAP[line.size]}>
              {/* the turn: a thin gold line leads into it */}
              {line.size === "turn" && (
                <span
                  aria-hidden="true"
                  className="mx-auto my-[clamp(32px,5vw,72px)] block h-14 w-px bg-[linear-gradient(180deg,rgba(230,200,156,0),#e6c89c)]"
                />
              )}
              <p
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className={`text-balance text-ink ${SIZES[line.size]} ${line.size === "body" ? "mx-auto max-w-[38rem] text-pretty" : ""}`}
                style={{ "--n": countWords(line.text), "--p": 0 } as React.CSSProperties}
              >
                <Words value={line.text} emClassName={EM[line.size]} />
              </p>
            </div>
          ))}
        </div>

        {/* ---------- Closing card: their photo + the program in one line + the last call to action ---------- */}
        <div
          id="join"
          className="mx-auto mt-[clamp(40px,6vw,88px)] max-w-[1000px] scroll-mt-[calc(var(--nav-h)+16px)]"
        >
          <div className="panel grid overflow-hidden md:grid-cols-[1fr_1.05fr] md:bg-[#160d19]">
            <figure className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
              <Image
                src={g.photo}
                alt={g.photoAlt}
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover object-[50%_30%]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[#2a1530] opacity-[0.16] mix-blend-multiply" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,9,17,0)_55%,rgba(22,13,25,0.85)_100%)] md:bg-[linear-gradient(90deg,rgba(22,13,25,0)_60%,rgba(22,13,25,0.9)_100%)]"
              />
              <figcaption className="absolute bottom-4 left-5 text-[13px] font-medium text-ink-soft md:bottom-5 md:left-6">
                {g.caption}
              </figcaption>
            </figure>

            <div className="flex flex-col items-center justify-center p-7 text-center sm:p-10 md:items-start md:text-left">
              <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                <span className="dot opacity-100" aria-hidden="true" />
                {g.label}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(1.875rem,3vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.02em] text-ink [font-variation-settings:'SOFT'_100]">
                <Rich value={g.heading} emClassName="font-light italic text-accent" />
              </h2>
              <p className="mt-4 max-w-[26rem] text-[16px] leading-[1.6] text-ink-soft sm:text-[17px]">{g.body}</p>
              <Button href={c.cta.href} className="btn-glow mt-8">
                {c.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
