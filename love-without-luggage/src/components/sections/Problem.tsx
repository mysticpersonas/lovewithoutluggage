"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { problem } from "@/content/site";
import MeshPlum from "@/components/ui/MeshPlum";
import Rich from "@/components/ui/Rich";
import { StoryIcon } from "@/components/ui/icons";

type Point = { x: number; y: number };

/** Where the path's glowing tip sits, as a fraction of viewport height. */
const READ_LINE = 0.62;
/** Corner radius where the path turns — big enough to feel like a winding road. */
const TURN_RADIUS = 56;

/*
  Builds the journey path through every stop.
  Between two stops it drops straight down, sweeps across in the gap between
  rows, then drops into the next stop — so the line never cuts through text.
  If two stops share an x (mobile), it is simply a straight line.
*/
function buildPath(points: Point[], turns: number[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dx = b.x - a.x;
    if (Math.abs(dx) < 1) {
      d += ` L ${b.x} ${b.y}`;
      continue;
    }
    const y = turns[i];
    const s = Math.sign(dx);
    const r = Math.max(0, Math.min(TURN_RADIUS, Math.abs(dx) / 2, y - a.y, b.y - y));
    d +=
      ` L ${a.x} ${y - r} Q ${a.x} ${y} ${a.x + s * r} ${y}` +
      ` L ${b.x - s * r} ${y} Q ${b.x} ${y} ${b.x} ${y + r} L ${b.x} ${b.y}`;
  }
  return d;
}

export default function Problem() {
  const { heading, beats, resolution } = problem;

  const mapRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const endRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);

  // y position + path length at each stop — lets the tip track the reading line
  const anchors = useRef<{ y: number; len: number }[]>([]);
  const [d, setD] = useState("");
  // How many stops the tip has reached (beats + the end point)
  const [reached, setReached] = useState(0);

  /* ---- scroll: move the glowing tip, light up the stops it has passed ---- */
  const update = useCallback(() => {
    const map = mapRef.current;
    const progress = progressRef.current;
    const A = anchors.current;
    if (!map || !progress || A.length < 2) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tipY = reduce ? Infinity : window.innerHeight * READ_LINE - map.getBoundingClientRect().top;

    let len = 0;
    if (tipY >= A[A.length - 1].y) len = A[A.length - 1].len;
    else if (tipY > A[0].y) {
      const i = A.findIndex((a, k) => k < A.length - 1 && tipY < A[k + 1].y);
      const t = (tipY - A[i].y) / (A[i + 1].y - A[i].y);
      len = A[i].len + t * (A[i + 1].len - A[i].len);
    }

    const total = A[A.length - 1].len || 1;
    progress.style.strokeDashoffset = String(1 - len / total);
    setReached(A.filter((a) => tipY >= a.y - 2).length);
  }, []);

  /* ---- layout: measure every stop and rebuild the path ---- */
  const measure = useCallback(() => {
    const map = mapRef.current;
    const measurer = measureRef.current;
    const end = endRef.current;
    const rows = rowRefs.current;
    const nodes = nodeRefs.current;
    if (!map || !measurer || !end || nodes.some((n) => !n)) return;

    const box = map.getBoundingClientRect();
    const centre = (el: Element): Point => {
      const r = el.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
    };

    const points = [...nodes.map((n) => centre(n!)), centre(end)];
    // Each turn sits halfway between the bottom of one row and the top of the next thing
    const turns = points.slice(0, -1).map((_, i) => {
      const bottom = rows[i]!.getBoundingClientRect().bottom - box.top;
      const nextEl = i + 1 < rows.length ? rows[i + 1]! : end;
      const top = nextEl.getBoundingClientRect().top - box.top;
      return (bottom + top) / 2;
    });

    anchors.current = points.map((p, i) => {
      measurer.setAttribute("d", buildPath(points.slice(0, i + 1), turns));
      return { y: p.y, len: i === 0 ? 0 : measurer.getTotalLength() };
    });
    setD(buildPath(points, turns));
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(map);
    // Fonts change line wraps, so re-measure once they've loaded
    document.fonts?.ready.then(() => {
      measure();
      onScroll();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure, update]);

  // After a new path renders, place the tip immediately
  useEffect(() => {
    if (d) update();
  }, [d, update]);

  const endReached = reached > beats.length;

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="relative isolate overflow-hidden"
    >
      <MeshPlum className="absolute inset-0 -z-20" />
      {/* Feather the top and bottom into the page ground — no seam with the hero above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--ground-deep)_0%,rgba(15,9,17,0.55)_14%,rgba(15,9,17,0.2)_32%,rgba(15,9,17,0.2)_70%,rgba(15,9,17,0.6)_88%,var(--ground-deep)_100%)]"
      />

      <div className="shell py-[clamp(96px,16vh,176px)]">
        <h2
          id="problem-heading"
          className="mx-auto max-w-[20ch] text-balance text-center font-serif text-[clamp(2rem,3.3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.02em] text-ink [font-variation-settings:'SOFT'_100]"
        >
          <Rich value={heading} emClassName="font-light italic text-accent" />
        </h2>

        {/* ---- The journey map ---- */}
        <div ref={mapRef} className="relative mx-auto mt-[clamp(64px,11vh,120px)] max-w-[1000px]">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            {/* Invisible — only used to measure partial path lengths */}
            <path ref={measureRef} fill="none" stroke="none" />
            {d && (
              <>
                {/* The road ahead: a faint dotted track */}
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(248,241,236,0.18)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeDasharray="1 7"
                />
                {/* The road travelled: champagne line that draws itself as you scroll */}
                <path
                  ref={progressRef}
                  d={d}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1 1"
                  style={{
                    strokeDashoffset: 1,
                    filter: "drop-shadow(0 0 6px rgba(230,200,156,0.6))",
                  }}
                />
              </>
            )}
          </svg>

          <ol className="relative flex flex-col gap-[clamp(72px,12vh,136px)]">
            {beats.map((beat, i) => {
              const on = reached > i;
              const flip = i % 2 === 1; // desktop: stops alternate sides, like a winding road
              return (
                <li
                  key={i}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className={`flex items-start gap-5 [--node:48px] sm:gap-7 sm:[--node:56px] ${
                    flip ? "lg:flex-row-reverse lg:pr-[6%] lg:text-right" : "lg:pl-[6%]"
                  }`}
                >
                  <span
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    className={`grid h-[var(--node)] w-[var(--node)] shrink-0 place-items-center rounded-full border bg-ground-deep transition-[color,border-color,box-shadow] duration-700 ease-out ${
                      on
                        ? "border-[rgba(230,200,156,0.7)] text-accent shadow-[0_0_32px_rgba(230,200,156,0.35)]"
                        : "border-hairline text-ink-faint"
                    }`}
                  >
                    <StoryIcon name={beat.icon} size={26} />
                  </span>
                  {/* padding-top centres the first line on the node, at any font size */}
                  <p
                    className={`max-w-[30ch] pt-[max(0px,calc((var(--node)-1.4em)/2))] font-serif text-[clamp(1.375rem,1.8vw,1.625rem)] font-normal leading-[1.4] tracking-[-0.01em] text-ink transition-[opacity,transform] duration-700 ease-out [font-variation-settings:'SOFT'_100] ${
                      on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-35"
                    }`}
                  >
                    <Rich value={beat.text} emClassName="font-light italic text-accent" />
                  </p>
                </li>
              );
            })}
          </ol>

          {/* ---- Where the road ends: the reframe ---- */}
          <div className="mt-[clamp(72px,12vh,136px)] flex flex-col items-center text-center">
            <span
              ref={endRef}
              aria-hidden="true"
              className={`h-3 w-3 rounded-full transition-[background-color,box-shadow] duration-700 ease-out ${
                endReached
                  ? "bg-accent shadow-[0_0_0_6px_rgba(230,200,156,0.15),0_0_28px_rgba(230,200,156,0.6)]"
                  : "border border-hairline bg-ground-deep"
              }`}
            />
            <div
              className={`transition-[opacity,transform] duration-700 ease-out ${
                endReached ? "translate-y-0 opacity-100" : "translate-y-3 opacity-35"
              }`}
            >
              <p className="mx-auto mt-8 max-w-[22ch] text-balance font-serif text-[clamp(1.625rem,2.6vw,2.125rem)] font-normal leading-[1.15] tracking-[-0.02em] text-ink [font-variation-settings:'SOFT'_100]">
                <Rich value={resolution.tagline} emClassName="font-light italic text-accent" />
              </p>
              <p className="mx-auto mt-6 max-w-[36rem] text-pretty text-[17px] leading-[1.6] text-ink-soft sm:text-[18px]">
                <Rich value={resolution.statement} emClassName="font-semibold not-italic text-ink" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
