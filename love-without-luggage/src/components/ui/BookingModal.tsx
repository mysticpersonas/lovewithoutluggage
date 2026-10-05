"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
  Booking modal. Every link to `#book` on the page (hero, roadmap, closing card,
  footer) opens this instead of jumping. It holds the LeadConnector booking widget:
  · Loaded only on first open, so the page stays fast. It stays mounted after that,
    so reopening is instant and a half-filled booking isn't lost.
  · form_embed.js (from the provider) auto-sizes the iframe to the calendar.
  · Desktop: a centered panel. Phone: a full-height sheet.
  · Esc / backdrop / ✕ closes; page scroll is locked while open; focus returns
    to the button that opened it.
  · Visiting the site with #book in the URL opens it directly (shareable link).
*/

export const BOOKING_HASH = "#book";
const WIDGET_ID = "EGJZWxeam6kMiN5ZIeHK";
const WIDGET_SRC = `https://api.leadconnectorhq.com/widget/booking/${WIDGET_ID}`;
const EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";

function loadEmbedScript() {
  if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return;
  const s = document.createElement("script");
  s.src = EMBED_SCRIPT;
  s.async = true;
  document.body.appendChild(s);
}

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // widget mounted (after first open)
  const [loaded, setLoaded] = useState(false); // iframe finished loading
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const show = useCallback((from?: HTMLElement | null) => {
    returnFocus.current = from ?? (document.activeElement as HTMLElement | null);
    setMounted(true);
    setOpen(true);
    loadEmbedScript();
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    if (window.location.hash === BOOKING_HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    returnFocus.current?.focus?.();
  }, []);

  // Any click on a link to #book opens the modal
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.(`a[href="${BOOKING_HASH}"]`);
      if (!a) return;
      e.preventDefault();
      show(a as HTMLElement);
    };
    document.addEventListener("click", onClick);
    if (window.location.hash === BOOKING_HASH) show(null);
    return () => document.removeEventListener("click", onClick);
  }, [show]);

  // Esc to close, lock page scroll, move focus into the dialog
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, hide]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] transition-[opacity,visibility] duration-300 ease-out ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close booking"
        onClick={hide}
        className="absolute inset-0 h-full w-full cursor-default bg-[rgba(8,4,10,0.72)] backdrop-blur-[10px]"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className={`absolute inset-x-0 bottom-0 flex max-h-[94svh] flex-col overflow-hidden rounded-t-[24px] border border-hairline bg-ground shadow-[0_-20px_60px_rgba(8,4,10,0.6)] transition-transform duration-500 ease-out sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[90svh] sm:w-[min(760px,calc(100vw-48px))] sm:rounded-[24px] ${
          open ? "translate-y-0 sm:-translate-x-1/2 sm:-translate-y-1/2" : "translate-y-8 sm:-translate-x-1/2 sm:-translate-y-[46%]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 sm:px-7 sm:py-5">
          <div>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-accent">Love Without Luggage™</p>
            <h2
              id="booking-title"
              className="mt-1 font-serif text-[clamp(1.375rem,2.4vw,1.75rem)] font-normal leading-tight tracking-[-0.02em] text-ink [font-variation-settings:'SOFT'_100]"
            >
              Reserve your <em className="font-light italic text-accent">spot</em>
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={hide}
            aria-label="Close booking"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline bg-glass text-ink transition-colors duration-300 hover:border-[rgba(248,241,236,0.3)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Widget: the provider's calendar is light, so it sits on a cream card
            that reads as part of the design rather than a white box */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-5">
          <div className="relative min-h-[560px] overflow-hidden rounded-[16px] bg-white">
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center bg-[#f8f1ec]" aria-live="polite">
                <span className="flex flex-col items-center gap-3 text-[14px] text-[#5a3d4f]">
                  <span className="h-7 w-7 animate-spin rounded-full border-2 border-[#e6c89c] border-t-transparent" />
                  Loading calendar…
                </span>
              </div>
            )}
            <iframe
              id={`${WIDGET_ID}_1791204210562`}
              src={WIDGET_SRC}
              title="Book your Love Without Luggage session"
              allow="payment"
              scrolling="no"
              onLoad={() => setLoaded(true)}
              className="block min-h-[560px] w-full border-0"
              style={{ overflow: "hidden" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
