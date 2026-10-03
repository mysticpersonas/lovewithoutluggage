"use client";

import { useEffect, useRef, useState } from "react";
import { programStructure } from "@/content/site";
import Rich from "@/components/ui/Rich";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import FacePile from "@/components/ui/FacePile";

/*
  The 6-week roadmap, as a live calendar. Free scroll — nothing is pinned.
  · A six-week ribbon sticks under the nav while you're in the roadmap and
    lights up week by week as you read (tap a week to jump to it).
  · Faint calendar columns run down the page, aligned to those six weeks.
  · Each phase reads like a calendar: the left column (phase, quote, goal)
    stays in view while its sessions, shown as calendar events with the
    coaches' faces, scroll past on the right.
*/

const WEEKS = 6;
const SERIF = "font-serif font-normal tracking-[-0.02em] text-ink [font-variation-settings:'SOFT'_100]";
const EM = "font-light italic text-accent";
const LABEL = "text-[12px] font-semibold uppercase tracking-[0.14em]";

export default function ProgramStructure() {
  const c = programStructure;
  const perPhase = WEEKS / c.phases.length;

  const phaseRefs = useRef<(HTMLElement | null)[]>([]);
  const fillRef = useRef<HTMLSpanElement>(null);
  // 0 = not started yet; 1..6 = current week
  const [week, setWeek] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const line = window.innerHeight * 0.5; // the "reading line"
      let progress = 0; // 0..6, continuous
      phaseRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (line - r.top) / r.height));
        if (r.top < line) progress = i * perPhase + p * perPhase;
      });
      setWeek(progress <= 0 ? 0 : Math.min(WEEKS, Math.floor(progress) + 1));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress / WEEKS})`;
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
  }, [perPhase]);

  const goToWeek = (w: number) => {
    const phase = phaseRefs.current[Math.floor((w - 1) / perPhase)];
    if (!phase) return;
    const local = ((w - 1) % perPhase) / perPhase;
    const top = phase.getBoundingClientRect().top + window.scrollY + local * phase.offsetHeight;
    window.scrollTo({ top: top - window.innerHeight * 0.5 + 8, behavior: "smooth" });
  };

  return (
    <section id="program" aria-labelledby="program-heading" className="relative isolate bg-ground-deep">
      {/* Calendar columns: six faint week lines running down the page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="shell h-full">
          <div className="mx-auto grid h-full max-w-[1120px] grid-cols-6 border-r border-[rgba(248,241,236,0.045)] [mask-image:linear-gradient(180deg,transparent_0%,#000_18%,#000_88%,transparent_100%)]">
            {Array.from({ length: WEEKS }, (_, i) => (
              <span key={i} className="h-full border-l border-[rgba(248,241,236,0.045)]" />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(50%_25%_at_50%_10%,rgba(122,58,96,0.18)_0%,rgba(15,9,17,0)_100%)]" />
      </div>

      <div className="shell py-[clamp(96px,14vh,160px)]">
        {/* ---------- Intro ---------- */}
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <p className="inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-faint sm:text-[13px]">
            <span className="dot" aria-hidden="true" />
            {c.eyebrow}
            <span className="dot" aria-hidden="true" />
          </p>
          <h2 id="program-heading" className={`${SERIF} mt-4 text-balance text-[clamp(2rem,3.4vw,2.875rem)] leading-[1.1]`}>
            <Rich value={c.heading} emClassName={EM} />
          </h2>
          <p className="mx-auto mt-5 max-w-[40rem] text-pretty text-[17px] leading-[1.65] text-ink sm:text-[18px]">{c.lede}</p>
          <p className="mx-auto mt-3 max-w-[40rem] text-pretty text-[15.5px] leading-[1.65] text-ink-soft sm:text-[16px]">{c.blend}</p>
        </Reveal>

        {/* ---------- At a glance ---------- */}
        <Reveal delay={120} className="mx-auto mt-[clamp(40px,6vh,64px)] max-w-[1120px]">
          <div className="panel grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_2fr] lg:items-center lg:gap-10">
            <div>
              <p className={`${LABEL} text-accent`}>{c.immersion.label}</p>
              <p className={`${SERIF} mt-2 text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.3]`}>
                <Rich value={c.immersion.title} emClassName="font-light italic text-accent" />
              </p>
            </div>
            <dl className="grid grid-cols-3 divide-x divide-[rgba(248,241,236,0.1)] rounded-[14px] border border-white/[0.06] bg-white/[0.02]">
              {c.format.map((f) => (
                <div key={f.label} className="px-3 py-4 text-center sm:px-5 sm:py-5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint sm:text-[12px]">{f.label}</dt>
                  <dd className={`${SERIF} mt-1.5 text-[clamp(1.125rem,2vw,1.625rem)] leading-tight`}>{f.value}</dd>
                  {f.note && <dd className="text-[12.5px] text-ink-faint sm:text-[13px]">{f.note}</dd>}
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* ---------- The calendar ---------- */}
        <div className="relative mx-auto max-w-[1120px]">
          {/*
            Sticky week bar. Full-bleed and solid from the very top of the screen
            (it sits under the floating nav), so nothing you've scrolled past can
            peek out above it. A soft fade below its edge keeps the hand-off clean.
          */}
          <div className="sticky top-0 z-30 mx-[calc(50%-50vw)] mt-[clamp(16px,3vh,40px)] bg-ground-deep pt-[var(--nav-h)]">
            <div className="shell">
              <div className="relative mx-auto flex max-w-[1120px] items-center gap-3 py-3 sm:gap-5 sm:py-4">
                <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint sm:hidden">
                  Week
                </span>
                {c.phases.map((ph, pi) => (
                  <div key={ph.weeks} className="flex min-w-0 flex-1 items-center gap-3">
                    {pi > 0 && <span aria-hidden="true" className="h-6 w-px shrink-0 bg-hairline" />}
                    <span className="hidden shrink-0 text-[11.5px] font-medium uppercase tracking-[0.12em] text-ink-faint lg:inline">
                      {ph.name.replace(/^The /, "").replace(/ Phase$/, "")}
                    </span>
                    <div className="grid flex-1 grid-cols-3 gap-1.5 sm:gap-2">
                      {Array.from({ length: perPhase }, (_, k) => {
                        const w = pi * perPhase + k + 1;
                        const state = w === week ? "now" : w < week ? "done" : "next";
                        return (
                          <button
                            key={w}
                            type="button"
                            onClick={() => goToWeek(w)}
                            aria-current={state === "now" ? "step" : undefined}
                            aria-label={`Week ${w}, ${ph.name}`}
                            className={`h-9 rounded-full border text-[13px] font-medium transition-[background-color,border-color,color] duration-300 ease-out sm:h-10 sm:text-[13.5px] ${
                              state === "now"
                                ? "border-[rgba(230,200,156,0.75)] bg-[rgba(230,200,156,0.12)] text-accent"
                                : state === "done"
                                  ? "border-[rgba(230,200,156,0.25)] text-ink"
                                  : "border-white/[0.08] text-ink-faint hover:border-white/[0.16] hover:text-ink-soft"
                            }`}
                          >
                            <span className="hidden sm:inline">Week </span>
                            {w}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {/* progress line along the bottom edge */}
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-hairline" />
                <span
                  ref={fillRef}
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent shadow-[0_0_8px_rgba(230,200,156,0.6)]"
                />
              </div>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-full h-8 bg-[linear-gradient(180deg,var(--ground-deep),rgba(15,9,17,0))]"
            />
          </div>

          {/* Phases */}
          {c.phases.map((ph, pi) => (
            <article
              key={ph.weeks}
              ref={(el) => {
                phaseRefs.current[pi] = el;
              }}
              aria-labelledby={`phase-${pi}`}
              className="grid gap-8 pt-[clamp(48px,8vh,96px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
            >
              {/* Left: phase, quote, goal — stays in view while sessions scroll by */}
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+112px)] lg:self-start">
                <Reveal>
                  <p className={`${LABEL} text-accent`}>{ph.weeks}</p>
                  <h3 id={`phase-${pi}`} className={`${SERIF} mt-2 text-[clamp(1.75rem,2.8vw,2.375rem)] leading-[1.12]`}>
                    {ph.name}
                  </h3>
                  <blockquote className="relative mt-6 border-l-2 border-[rgba(230,200,156,0.5)] pl-5">
                    <p className="font-serif text-[clamp(1.25rem,1.9vw,1.5rem)] font-light italic leading-[1.4] text-ink [font-variation-settings:'SOFT'_100]">
                      “{ph.quote}”
                    </p>
                  </blockquote>
                  <div className="mt-8 rounded-[16px] border border-[rgba(230,200,156,0.28)] bg-[linear-gradient(160deg,rgba(230,200,156,0.1)_0%,rgba(230,200,156,0.02)_100%)] p-5">
                    <p className={`${LABEL} text-accent`}>Goal</p>
                    <p className="mt-2 text-[16px] font-medium leading-[1.55] text-ink sm:text-[17px]">{ph.goal}</p>
                  </div>
                </Reveal>
              </div>

              {/* Right: the week, as calendar events */}
              <div className="flex flex-col gap-4">
                {ph.kickoff && (
                  <Reveal>
                    <div className="panel relative overflow-hidden p-5 pl-6 sm:p-6 sm:pl-7">
                      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-[linear-gradient(180deg,#f6e3c4,#b8925f)]" />
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className={`${LABEL} text-accent`}>{ph.kickoff.label}</p>
                          <p className={`${SERIF} mt-1.5 text-[clamp(1.25rem,1.7vw,1.375rem)]`}>{ph.kickoff.title}</p>
                          <p className="mt-0.5 text-[13.5px] text-ink-faint">{ph.kickoff.meta}</p>
                        </div>
                        <FacePile variant="card" />
                      </div>
                      <p className="mt-4 text-[15.5px] leading-[1.6] text-ink-soft">{ph.kickoff.body}</p>
                    </div>
                  </Reveal>
                )}

                <Reveal className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[14.5px] text-ink-soft">{ph.receiveLabel}</p>
                  <span className="rounded-full border border-[rgba(230,200,156,0.35)] px-3 py-1 text-[12.5px] font-medium text-accent">
                    {ph.cadence}
                  </span>
                </Reveal>

                {ph.sessions.map((s, si) => (
                  <Reveal key={s.title} delay={si * 100}>
                    <div className="panel relative overflow-hidden p-5 pl-6 sm:p-6 sm:pl-7">
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-[3px] ${
                          s.kind === "joint"
                            ? "bg-[repeating-linear-gradient(180deg,#e6c89c_0_6px,rgba(230,200,156,0.35)_6px_12px)]"
                            : "bg-[rgba(230,200,156,0.55)]"
                        }`}
                      />
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          {s.step && (
                            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hairline text-[13px] text-ink-soft">
                              {s.step}
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className="flex items-center gap-2 text-[12px] text-ink-faint">
                              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 font-semibold uppercase tracking-[0.1em] text-ink-soft">
                                {s.tag}
                              </span>
                              45–60 min
                            </p>
                            <p className={`${SERIF} mt-1.5 text-[clamp(1.125rem,1.6vw,1.3125rem)] leading-snug`}>{s.title}</p>
                          </div>
                        </div>
                        <FacePile variant="card" people={s.people} />
                      </div>
                      {s.detail && <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">{s.detail}</p>}
                    </div>
                  </Reveal>
                ))}

                <Reveal className="mt-6">
                  <p className={`${LABEL} text-ink-faint`}>{ph.focusLabel}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {ph.focus.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-[14px] leading-snug text-ink-soft sm:text-[14.5px]"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </article>
          ))}
        </div>

        {/* ---------- CTA ---------- */}
        <Reveal className="mt-[clamp(80px,12vh,136px)] flex justify-center">
          <Button href={c.cta.href} className="btn-glow">
            {c.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
