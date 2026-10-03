"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/content/site";
import Rich from "@/components/ui/Rich";
import { STAGE_VISUALS, TopoMap } from "./JourneyVisuals";

/*
  The 6-week journey as a pinned map.
  The section is tall (one screen per stage); inside it a full-screen "stage"
  sticks while you scroll, and scroll position moves you along the route:
  one stage at a time, each with its own verb, line and scene, plus a map rail
  at the bottom that fills as you travel. Different from the winding path
  (Problem) and the bento (Overview): here the reader stands still and the
  journey comes to them.
*/

export default function Journey() {
  const { eyebrow, heading, stages } = journey;
  const last = stages.length - 1;

  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const topoRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      // Nodes sit at p = 0, 1/3, 2/3, 1 — switch stage halfway between them
      setStage(Math.round(p * last));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
      if (topoRef.current) topoRef.current.style.transform = `translate3d(0, ${(-p * 80).toFixed(1)}px, 0)`;
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
  }, [last]);

  // Clicking a stop on the map scrolls to that stage
  const goTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: section.offsetTop + (travel * i) / last, behavior: "smooth" });
  };

  // Entering stages rise from below; passed stages drift up and out
  const state = (i: number) =>
    i === stage
      ? "opacity-100 translate-y-0"
      : i < stage
        ? "pointer-events-none opacity-0 -translate-y-6"
        : "pointer-events-none opacity-0 translate-y-6";

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-labelledby="journey-heading"
      className="relative h-[400svh] bg-ground-deep"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Map texture + a warm pool of light behind the scene */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
          <div ref={topoRef} className="absolute inset-x-0 -bottom-24 -top-4 will-change-transform">
            <TopoMap />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_68%_52%,rgba(122,58,96,0.22)_0%,rgba(15,9,17,0)_100%),linear-gradient(180deg,var(--ground-deep)_0%,rgba(15,9,17,0)_18%,rgba(15,9,17,0)_82%,var(--ground-deep)_100%)]" />
        </div>

        <div className="shell relative flex h-full flex-col pb-[clamp(16px,3.5svh,40px)] pt-[calc(var(--nav-h)+clamp(8px,2svh,24px))]">
          {/* Header */}
          <header className="text-center">
            <p className="inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-faint sm:text-[13px]">
              <span className="dot" aria-hidden="true" />
              {eyebrow}
              <span className="dot" aria-hidden="true" />
            </p>
            <h2
              id="journey-heading"
              className="mt-3 font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] font-normal leading-[1.15] tracking-[-0.02em] text-ink [font-variation-settings:'SOFT'_100]"
            >
              <Rich value={heading} emClassName="font-light italic text-accent" />
            </h2>
          </header>

          {/* Stage: scene + words */}
          <div className="mx-auto grid w-full max-w-[1120px] flex-1 grid-cols-1 content-center items-center gap-[clamp(12px,3svh,40px)] lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* Scene (stacked; only the active one is visible and drawn) */}
            <div className="relative mx-auto aspect-square h-[clamp(150px,30svh,380px)] lg:order-2 lg:h-[clamp(220px,46svh,420px)]">
              <span
                aria-hidden="true"
                className="absolute inset-[8%] rounded-full border border-hairline bg-[radial-gradient(circle,rgba(230,200,156,0.06)_0%,rgba(15,9,17,0)_70%)]"
              />
              {STAGE_VISUALS.map((Visual, i) => (
                <div
                  key={i}
                  data-in={i === stage}
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${i === stage ? "opacity-100" : "opacity-0"}`}
                >
                  <Visual />
                </div>
              ))}
            </div>

            {/* Words (stacked in one grid cell so the layout never jumps) */}
            <div className="grid text-center lg:order-1 lg:text-left" aria-live="polite">
              {stages.map((s, i) => (
                <div
                  key={s.verb}
                  aria-hidden={i !== stage}
                  className={`[grid-area:1/1] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${state(i)}`}
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-faint sm:text-[13px]">
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mx-2 opacity-50">/</span>
                    {String(stages.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-serif text-[clamp(2.75rem,6.4vw,5.75rem)] font-light italic leading-[1] tracking-[-0.03em] text-accent [font-variation-settings:'SOFT'_100]">
                    {s.verb}
                  </h3>
                  <p className="mx-auto mt-[clamp(10px,2svh,20px)] max-w-[26ch] text-pretty font-serif text-[clamp(1.125rem,1.9vw,1.625rem)] font-normal leading-[1.35] text-ink [font-variation-settings:'SOFT'_100] lg:mx-0">
                    {s.rest}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Map rail: four stops, the route fills as you scroll */}
          <nav aria-label="Journey stages" className="mx-auto w-full max-w-[880px]">
            <div className="relative grid grid-cols-4">
              <span
                aria-hidden="true"
                className="absolute left-[12.5%] right-[12.5%] top-[11px] h-px bg-[repeating-linear-gradient(90deg,rgba(248,241,236,0.22)_0_4px,transparent_4px_10px)]"
              />
              <span
                ref={fillRef}
                aria-hidden="true"
                className="absolute left-[12.5%] right-[12.5%] top-[10.5px] h-[2px] origin-left scale-x-0 bg-accent shadow-[0_0_10px_rgba(230,200,156,0.6)]"
              />
              {stages.map((s, i) => {
                const reached = i <= stage;
                return (
                  <button
                    key={s.verb}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === stage ? "step" : undefined}
                    className="group relative flex flex-col items-center gap-2.5 rounded-full"
                  >
                    <span
                      className={`grid h-[23px] w-[23px] place-items-center rounded-full border transition-[border-color,background-color,box-shadow] duration-500 ${
                        reached
                          ? "border-[rgba(230,200,156,0.8)] bg-ground-deep shadow-[0_0_16px_rgba(230,200,156,0.45)]"
                          : "border-hairline bg-ground-deep group-hover:border-[rgba(248,241,236,0.35)]"
                      }`}
                    >
                      <span
                        className={`h-[7px] w-[7px] rounded-full transition-colors duration-500 ${reached ? "bg-accent" : "bg-[rgba(248,241,236,0.25)]"}`}
                      />
                    </span>
                    <span
                      className={`text-[12px] font-medium tracking-[0.02em] transition-colors duration-500 sm:text-[13.5px] ${
                        i === stage ? "text-ink" : "text-ink-faint group-hover:text-ink-soft"
                      }`}
                    >
                      {s.verb}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
