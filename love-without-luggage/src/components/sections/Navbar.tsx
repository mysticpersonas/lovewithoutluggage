"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { LogoMark, MenuIcon } from "@/components/ui/icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock page scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      {/* Logo left, menu toggle right on phones. On desktop a 3-column grid keeps
          the link rail dead-centre with the logo on the left. */}
      <div className="shell flex min-h-nav items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          aria-label="Love Without Luggage, back to top"
          onClick={() => setOpen(false)}
          className="justify-self-start rounded-[12px] shadow-[0_6px_20px_rgba(8,4,10,0.45)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(230,200,156,0.18)]"
        >
          <LogoMark />
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center rounded-full border border-hairline bg-glass h-12 px-7 backdrop-blur-[18px] backdrop-saturate-[1.2] lg:flex"
        >
          {nav.links.map((link, i) => (
            <span key={link.href} className="inline-flex items-center">
              {i > 0 && <span className="dot mx-[clamp(12px,1.6vw,22px)]" aria-hidden="true" />}
              <a
                href={link.href}
                className="text-[15px] font-medium text-ink-soft transition-colors duration-300 ease-out hover:text-ink"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-glass text-ink backdrop-blur-[18px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="mx-gutter flex flex-col rounded-[22px] border border-hairline bg-[rgba(15,9,17,0.95)] px-5 pb-5 pt-2.5 backdrop-blur-[20px] lg:hidden"
        >
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/[0.07] px-1 py-3.5 text-base text-ink-soft last:border-b-0 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
