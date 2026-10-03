"use client";

import { useEffect, useRef } from "react";

type BgVideoProps = {
  webm: string;
  mp4: string;
  poster: string;
  className?: string;
};

/*
  Decorative looping background video.
  · Plays only while on screen (saves battery and CPU), pauses off screen.
  · Reduced-motion visitors see the still poster frame.
*/
export default function BgVideo({ webm, mp4, poster, className = "" }: BgVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play()?.catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
