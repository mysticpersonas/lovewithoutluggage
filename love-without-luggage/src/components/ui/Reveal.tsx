"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Flips to true once the element scrolls into view, and stays true.
 * Reduced-motion visitors get `true` immediately, so nothing waits to appear.
 */
export function useInView<T extends Element>(rootMargin = "0px 0px -18% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in ms. */
  delay?: number;
  /** "fade" rises + fades in; "none" only sets data-in, for children that animate themselves. */
  variant?: "fade" | "none";
  rootMargin?: string;
};

/**
 * Scroll-storytelling primitive. Sets `data-in="true"` when visible; CSS in
 * globals.css (`.reveal`, `.strike`, `.draw`, `.pop`) does the actual motion.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade",
  rootMargin,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>(rootMargin);
  return (
    <div
      ref={ref}
      data-in={inView}
      className={`${variant === "fade" ? "reveal" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
