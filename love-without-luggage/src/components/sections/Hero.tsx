"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/content/site";
import Button from "@/components/ui/Button";
import Rich from "@/components/ui/Rich";

const HERO_VIDEO = { webm: "/hero.webm", mp4: "/hero.mp4" };
const HERO_POSTER_URL = "/hero-poster.jpg";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause(); // stays on the poster frame
      return;
    }
    // Some browsers block autoplay until nudged.
    video.play()?.catch(() => {});
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[radial-gradient(100%_70%_at_50%_45%,var(--ground)_0%,var(--ground-deep)_100%)] pb-[clamp(20px,3.5svh,32px)]"
    >
      {/* Media layer: video → colour tint → scrim. Purely decorative. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Poster = the video's first frame, so the hero paints instantly and the
            video takes over seamlessly. WebM (~0.3MB) first, MP4 (~0.65MB) fallback for Safari. */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-[center_58%]"
          poster={HERO_POSTER_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={HERO_VIDEO.webm} type="video/webm" />
          <source src={HERO_VIDEO.mp4} type="video/mp4" />
        </video>
        <div className="hero-tint absolute inset-0" />
        <div className="hero-scrim absolute inset-0" />
      </div>

      {/*
        Copy block fills the space between the nav and the trust row and centres itself.
        Every size and gap below scales with viewport HEIGHT (svh) as well as width,
        so the whole hero — trust row included — fits one screen on any device.
      */}
      <div className="shell flex flex-1 flex-col items-center justify-center pb-[clamp(16px,3svh,40px)] pt-nav text-center">
        {/* Eyebrow: small sans caps, +tracking — a label, not a sentence */}
        <p className="animate-settle text-[11px] font-medium uppercase leading-[1.6] tracking-[0.14em] text-ink-faint sm:text-[12px]">
          {hero.eyebrow.system}
          <span className="dot mx-3 hidden align-middle sm:inline-block" aria-hidden="true" />
          <span className="block sm:inline">{hero.eyebrow.poweredBy}</span>
        </p>

        {/* H1: serif, tight leading, italic blush on the emotional words.
            Size = smaller of width-based and height-based, capped 32–60px. */}
        <h1 className="animate-settle mt-[clamp(14px,2.6svh,24px)] max-w-[22ch] text-balance font-serif text-[clamp(2rem,min(4.6vw,6.8svh),3.75rem)] font-normal leading-[1.1] tracking-[-0.02em] text-ink [animation-delay:100ms] [font-variation-settings:'SOFT'_100] [text-shadow:0_2px_32px_rgba(15,9,17,0.55)]">
          <Rich value={hero.headline} emClassName="font-light italic text-accent" />
        </h1>

        {/* Sub: sans, 16–18px, 1.6 leading, ~56 characters per line — the readable sweet spot */}
        <p className="animate-settle mt-[clamp(14px,2.6svh,24px)] max-w-[33rem] text-pretty text-[16px] leading-[1.6] text-ink-soft [animation-delay:200ms] [text-shadow:0_1px_20px_rgba(15,9,17,0.7)] sm:text-[clamp(16px,2.1svh,18px)]">
          <Rich value={hero.subheadline} emClassName="font-semibold not-italic text-ink" />
        </p>

        <Button
          href={hero.cta.href}
          className="btn-glow animate-settle mt-[clamp(24px,4.4svh,40px)] [animation-delay:300ms]"
        >
          {hero.cta.label}
        </Button>
      </div>

      {/* Trust row: stacked on phones, one dotted line from sm up */}
      <ul className="shell animate-settle flex flex-col items-center gap-1.5 [animation-delay:440ms] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-2">
        {hero.trust.map((item, i) => (
          <li key={item} className="inline-flex items-center gap-5">
            {i > 0 && <span className="dot hidden sm:block" aria-hidden="true" />}
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-soft sm:text-[14px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
