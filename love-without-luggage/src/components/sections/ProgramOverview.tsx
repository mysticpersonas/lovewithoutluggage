import { programOverview } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import Rich from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/icons";
import FacePile from "@/components/ui/FacePile";
import BgVideo from "@/components/ui/BgVideo";
import { PersonaVisual, ResetVisual } from "./ProgramOverviewVisuals";

/*
  Program overview + positioning, told as two scroll beats:
    1. Clear the ground — what this is NOT (each line gets struck through)
    2. Show the path — the two levels, as a bento pair
  Each beat is short on its own, so the reader is never handed a wall of text.
*/

const VISUALS = { persona: PersonaVisual, reset: ResetVisual };

const H2 =
  "font-serif font-normal leading-[1.12] tracking-[-0.02em] text-ink [font-variation-settings:'SOFT'_100]";
const EM = "font-light italic text-accent";

export default function ProgramOverview() {
  const c = programOverview;

  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative isolate overflow-hidden bg-ground-deep"
    >
      {/* Soft plum light from above + a hint of grain, so the page keeps its warmth after the shader */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--ground-deep)_0%,rgba(15,9,17,0)_14%),radial-gradient(60%_32%_at_50%_16%,rgba(122,58,96,0.2)_0%,rgba(15,9,17,0)_100%),radial-gradient(50%_30%_at_50%_62%,rgba(90,42,74,0.18)_0%,rgba(15,9,17,0)_100%)]"
      />

      <div className="shell py-[clamp(40px,8vw,128px)]">
        {/* ---------- Beat 1: what it isn't → what it is ---------- */}
        <div className="relative mx-auto flex max-w-[52rem] flex-col items-center text-center">
          {/*
            Background video: rose-gold strands of light. "Screen" blending drops its
            black out, so the plum page shows through and there's no box edge.
            Soft fades on every side, plus a darker centre so the text always reads.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[14%] -top-[18%] left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden [mask-image:radial-gradient(60%_47%_at_50%_50%,#000_45%,transparent_100%)]"
          >
            <BgVideo
              webm="/rewiring.webm"
              mp4="/rewiring.mp4"
              poster="/rewiring-poster.jpg"
              className="h-full w-full object-cover opacity-70 mix-blend-screen [filter:saturate(0.85)_sepia(0.15)_hue-rotate(-8deg)]"
            />
            {/* Calmer behind the paragraph, so body text always reads cleanly */}
            <div className="absolute inset-0 bg-[radial-gradient(34%_20%_at_50%_70%,rgba(15,9,17,0.75)_0%,rgba(15,9,17,0)_100%)]" />
          </div>

          <Reveal>
            <p className="inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-faint sm:text-[13px]">
              <span className="dot" aria-hidden="true" />
              {c.eyebrow}
              <span className="dot" aria-hidden="true" />
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-8">
            <p className="font-serif text-[clamp(1.125rem,1.6vw,1.375rem)] font-light italic text-ink-faint">
              {c.notIntro}
            </p>
          </Reveal>

          <ul className="mt-3 flex flex-col gap-1.5 sm:gap-2">
            {c.nots.map((line, i) => (
              <li key={line}>
                {/* Each line is struck through as it scrolls into view, one after another */}
                <Reveal variant="none" delay={i * 220} rootMargin="0px 0px -30% 0px">
                  <span
                    className={`strike font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] font-normal leading-[1.35] tracking-[-0.015em] text-ink [font-variation-settings:'SOFT'_100]`}
                  >
                    {line}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-[clamp(36px,5vw,72px)]" rootMargin="0px 0px -25% 0px">
            <h2 id="overview-heading" className={`${H2} text-[clamp(2rem,3.4vw,2.875rem)]`}>
              <Rich value={c.headline} emClassName={EM} />
            </h2>
            <p className="mt-5 text-[17px] font-medium text-ink sm:text-[19px]">{c.kicker}</p>
            <p className="mx-auto mt-3 max-w-[38rem] text-pretty text-[16px] leading-[1.65] text-ink-soft sm:text-[17px]">
              <Rich
                value={c.description}
                emClassName="font-semibold not-italic text-ink"
                beforeEm={() => <FacePile />}
              />
            </p>
          </Reveal>
        </div>

        {/* ---------- Beat 2: the two levels ---------- */}
        <div className="mt-[clamp(48px,8vw,128px)]">
          <Reveal className="text-center">
            <h3 className={`${H2} mx-auto max-w-[20ch] text-balance text-[clamp(1.75rem,2.8vw,2.375rem)]`}>
              <Rich value={c.levelsHeading} emClassName={EM} />
            </h3>
          </Reveal>

          <div className="relative mx-auto mt-[clamp(28px,4vw,56px)] grid max-w-[1120px] gap-5 lg:grid-cols-2 lg:gap-6">
            {c.levels.map((level, i) => {
              const Visual = VISUALS[level.visual];
              return (
                <Reveal key={level.label} delay={i * 160} className="h-full">
                  <article className="panel flex h-full flex-col p-5 sm:p-7 lg:p-8">
                    <div className="relative h-[170px] overflow-hidden rounded-[14px] border border-white/[0.06] bg-white/[0.02] sm:h-[200px]">
                      <Visual />
                    </div>

                    <p className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                      <span className="dot opacity-100" aria-hidden="true" />
                      {level.label}
                    </p>
                    <h4 className={`${H2} mt-3 text-[clamp(1.375rem,2vw,1.75rem)] leading-[1.2]`}>{level.title}</h4>
                    <p className="mt-2.5 text-[16px] leading-[1.6] text-ink-soft">{level.body}</p>

                    <ul className="mt-6 flex flex-col gap-3.5 border-t border-hairline pt-6">
                      {level.outcomes.map((o) => (
                        <li key={o} className="flex items-start gap-3 text-[15px] leading-[1.55] text-ink-soft sm:text-[15.5px]">
                          <span className="mt-[3px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[rgba(230,200,156,0.5)] text-accent">
                            <CheckIcon size={10} />
                          </span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}

            {/* Level 1 → Level 2 connector (desktop) */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[110px] z-10 hidden h-11 w-11 -translate-x-1/2 place-items-center rounded-full bg-[linear-gradient(160deg,#f6e3c4_0%,#e6c89c_55%,#b8925f_100%)] text-accent-ink shadow-[0_0_0_6px_rgba(15,9,17,0.9),0_8px_28px_rgba(230,200,156,0.35)] lg:grid"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
