"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { guides } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import Rich from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/icons";

/*
  Who will guide us?
  · Phone: two stacked cards, portrait on top, read in order.
  · Desktop: one wide card per guide, sized to fit a single screen. Travis's card
    holds in place; Michelle's slides up and stacks over it, while his card
    gently recedes (scales down + dims) underneath.
*/

const SERIF = "font-serif font-normal tracking-[-0.02em] text-ink [font-variation-settings:'SOFT'_100]";
const LABEL = "text-[12px] font-semibold uppercase tracking-[0.14em]";

export default function Guides() {
  const c = guides;
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Desktop only: as the next card rises, the one beneath recedes
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const next = slotRefs.current[i + 1];
        if (!mq.matches || reduce || !next) {
          card.style.transform = "";
          card.style.filter = "";
          return;
        }
        const vh = window.innerHeight;
        // 0 when the next card starts entering, 1 when it has fully covered this one
        const t = Math.min(1, Math.max(0, (vh - next.getBoundingClientRect().top) / (vh * 0.85)));
        card.style.transform = `scale(${1 - 0.05 * t})`;
        card.style.filter = `brightness(${1 - 0.6 * t})`;
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
    <section id="guides" aria-labelledby="guides-heading" className="relative isolate bg-ground-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_30%_at_50%_8%,rgba(122,58,96,0.2)_0%,rgba(15,9,17,0)_100%)]"
      />

      <div className="shell py-[clamp(96px,14vh,160px)]">
        <Reveal className="text-center">
          <p className="inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-faint sm:text-[13px]">
            <span className="dot" aria-hidden="true" />
            {c.eyebrow}
            <span className="dot" aria-hidden="true" />
          </p>
          <h2 id="guides-heading" className={`${SERIF} mt-4 text-[clamp(2rem,3.4vw,2.875rem)] leading-[1.1]`}>
            <Rich value={c.heading} emClassName="font-light italic text-accent" />
          </h2>
        </Reveal>

        <div className="mx-auto mt-[clamp(40px,7vh,72px)] flex max-w-[1120px] flex-col gap-6 lg:gap-[18vh]">
          {c.guides.map((g, i) => (
            <div
              key={g.name}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              // All cards pin at the same spot, so the next one covers the last cleanly
              className="lg:sticky lg:top-[calc(var(--nav-h)+20px)]"
            >
              <Reveal delay={0}>
                <article
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="panel flex origin-top flex-col will-change-transform lg:h-[min(640px,calc(100svh-var(--nav-h)-40px))] lg:flex-row lg:bg-[#160d19]"
                >
                  {/* Portrait */}
                  <div className="relative aspect-[1/1] shrink-0 overflow-hidden sm:aspect-[6/5] lg:aspect-auto lg:h-full lg:w-[42%]">
                    <Image
                      src={g.photo}
                      alt={`Portrait of ${g.name}`}
                      fill
                      sizes="(min-width: 1024px) 470px, 100vw"
                      className="object-cover object-[50%_18%]"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-[#2a1530] opacity-[0.18] mix-blend-multiply" />
                    {/* fades down on phones, toward the text column on desktop */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,9,17,0)_45%,rgba(15,9,17,0.55)_72%,rgba(20,12,22,0.97)_100%)] lg:bg-[linear-gradient(90deg,rgba(22,13,25,0)_62%,rgba(22,13,25,0.9)_100%)]"
                    />
                    {/* name over the photo on phones only */}
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:hidden">
                      <p className={`${LABEL} text-accent`}>{g.role}</p>
                      <h3 className={`${SERIF} mt-2 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.1]`}>{g.name}</h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 pt-5 sm:p-8 sm:pt-6 lg:justify-center lg:p-10 lg:pl-8 [@media(min-width:1024px)_and_(max-height:800px)]:py-6">
                    {/* name in the text column on desktop */}
                    <div className="mb-5 hidden lg:block [@media(max-height:800px)]:mb-4">
                      <p className={`${LABEL} text-accent`}>{g.role}</p>
                      <h3 className={`${SERIF} mt-2 text-[clamp(1.75rem,min(2.6vw,4.4svh),2.5rem)] leading-[1.1]`}>{g.name}</h3>
                    </div>

                    <ul className="flex flex-wrap gap-2">
                      {g.credentials.map((cr) => (
                        <li
                          key={cr}
                          className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[13px] leading-none text-ink-soft"
                        >
                          {cr}
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-6 grid grid-cols-2 divide-x divide-[rgba(248,241,236,0.1)] border-y border-hairline lg:mt-5">
                      {g.highlights.map((h) => (
                        <div key={h.value} className="py-4 pr-4 [&:not(:first-child)]:pl-4 [@media(min-width:1024px)_and_(max-height:800px)]:py-3">
                          <dt className={`${SERIF} text-[clamp(1.5rem,2.2vw,1.875rem)] leading-none !text-accent`}>{h.value}</dt>
                          <dd className="mt-2 text-[13.5px] leading-snug text-ink-faint">{h.label}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="mt-6 text-[16px] leading-[1.65] text-ink-soft lg:mt-5 lg:text-[15.5px] [@media(min-width:1024px)_and_(max-height:800px)]:hidden">{g.summary}</p>

                    <blockquote className="mt-6 border-l-2 border-[rgba(230,200,156,0.5)] pl-5 lg:mt-5">
                      <p className="font-serif text-[clamp(1.125rem,1.5vw,1.25rem)] font-light italic leading-[1.45] text-ink [font-variation-settings:'SOFT'_100]">
                        “{g.quote}”
                      </p>
                    </blockquote>

                    <div className="mt-auto pt-8 lg:mt-0 lg:pt-6 [@media(min-width:1024px)_and_(max-height:800px)]:pt-4">
                      <p className={`${LABEL} text-ink-faint`}>Leads in the program</p>
                      <ul className="mt-4 flex flex-col gap-3 lg:mt-3 lg:gap-2">
                        {g.leads.map((l) => (
                          <li key={l} className="flex items-start gap-3 text-[15px] leading-[1.55] text-ink-soft lg:text-[14.5px]">
                            <span className="mt-[3px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[rgba(230,200,156,0.5)] text-accent">
                              <CheckIcon size={10} />
                            </span>
                            {l}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
