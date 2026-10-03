/* ---------------------------------------------------------------
   ProgramOverview — the two level visuals. Inline SVG only.
   Monochrome cream + one champagne accent, so they read as part of
   the same system as the story path above.
   Motion comes from `.draw` / `.pop` in globals.css, triggered when
   the parent <Reveal> sets data-in="true".
--------------------------------------------------------------- */

/* --- Level 1: persona map -------------------------------------
   "Rebuild your relationship with yourself" → you at the centre,
   your personas around you, finally in view. */

const CHIPS = [
  { label: "Core", x: 62, y: 46, w: 64, lit: true, d: 500 },
  { label: "Shadow", x: 266, y: 72, w: 78, lit: false, d: 650 },
  { label: "Oracle", x: 84, y: 160, w: 70, lit: false, d: 800 },
];

export function PersonaVisual() {
  return (
    <svg viewBox="0 0 360 200" className="h-full w-full" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="pv-disc" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f6e3c4" />
          <stop offset="60%" stopColor="#e6c89c" />
          <stop offset="100%" stopColor="#b8925f" />
        </radialGradient>
        <radialGradient id="pv-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(230,200,156,0.35)" />
          <stop offset="100%" stopColor="rgba(230,200,156,0)" />
        </radialGradient>
      </defs>

      <circle cx="180" cy="100" r="70" fill="url(#pv-halo)" />

      {/* inner ring draws in; outer dashed ring slowly turns */}
      <circle
        className="draw"
        pathLength={1}
        cx="180"
        cy="100"
        r="46"
        stroke="rgba(248,241,236,0.22)"
        strokeWidth="1"
      />
      <g className="spin-slow" style={{ transformOrigin: "180px 100px", animation: "spin-slow 60s linear infinite" }}>
        <circle cx="180" cy="100" r="78" stroke="rgba(248,241,236,0.14)" strokeWidth="1" strokeDasharray="3 6" />
      </g>

      {/* connectors from each persona to the self */}
      {CHIPS.map((c) => (
        <path
          key={c.label}
          className="draw"
          pathLength={1}
          style={{ "--draw-d": `${c.d - 200}ms` } as React.CSSProperties}
          d={`M ${c.x + c.w / 2} ${c.y} L 180 100`}
          stroke={c.lit ? "rgba(230,200,156,0.55)" : "rgba(248,241,236,0.16)"}
          strokeWidth="1"
          strokeDasharray={c.lit ? undefined : "2 4"}
        />
      ))}

      <circle cx="180" cy="100" r="25" fill="url(#pv-disc)" style={{ filter: "drop-shadow(0 6px 18px rgba(230,200,156,0.45))" }} />
      <text x="180" y="104.5" textAnchor="middle" className="font-serif" fontSize="13" fill="#2a1520">
        You
      </text>

      {CHIPS.map((c) => (
        <g key={c.label} className="pop" style={{ "--pop-d": `${c.d}ms` } as React.CSSProperties}>
          <rect
            x={c.x}
            y={c.y - 13}
            width={c.w}
            height="26"
            rx="13"
            fill="#1d1220"
            stroke={c.lit ? "rgba(230,200,156,0.7)" : "rgba(248,241,236,0.16)"}
          />
          <circle cx={c.x + 14} cy={c.y} r="3" fill={c.lit ? "#e6c89c" : "rgba(248,241,236,0.35)"} />
          <text
            x={c.x + 24}
            y={c.y + 4}
            className="font-sans"
            fontSize="11.5"
            fontWeight="500"
            fill={c.lit ? "#f8f1ec" : "rgba(248,241,236,0.6)"}
          >
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* --- Level 2: spiral → pause → reset ---------------------------
   "Interrupt emotional spirals before they turn into shutdowns or
   blow-ups" → a line that escalates, gets interrupted, then settles. */

const BASE = 112;

function wave(from: number, to: number, fn: (x: number, t: number) => number) {
  let d = "";
  for (let x = from; x <= to; x += 2) {
    const t = (x - from) / (to - from);
    d += `${x === from ? "M" : "L"} ${x} ${fn(x, t).toFixed(1)} `;
  }
  return d.trim();
}

// Escalating: amplitude and frequency both climb, like a conversation spiralling
const SPIRAL = wave(16, 196, (x, t) => BASE + (4 + 46 * t * t) * Math.sin(x * 0.09 + t * t * 7));
// Settled: a slow, shrinking breath after the reset
const CALM = wave(216, 344, (x, t) => BASE + (11 * (1 - t) + 3) * Math.sin((x - 216) * 0.075));

export function ResetVisual() {
  return (
    <svg viewBox="0 0 360 200" className="h-full w-full" fill="none" aria-hidden="true">
      <line x1="16" y1={BASE} x2="344" y2={BASE} stroke="rgba(248,241,236,0.06)" strokeWidth="1" />

      <path
        className="draw"
        pathLength={1}
        d={SPIRAL}
        stroke="rgba(248,241,236,0.42)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* the interruption */}
      <g className="pop" style={{ "--pop-d": "1100ms" } as React.CSSProperties}>
        <line x1="206" y1="44" x2="206" y2="176" stroke="rgba(230,200,156,0.6)" strokeWidth="1" strokeDasharray="3 4" />
        <rect x="178" y="22" width="56" height="24" rx="12" fill="#e6c89c" />
        <text x="206" y="38" textAnchor="middle" className="font-sans" fontSize="11" fontWeight="600" fill="#2a1520">
          Pause
        </text>
      </g>

      <path
        className="draw"
        pathLength={1}
        d={CALM}
        style={{ "--draw-d": "1300ms", filter: "drop-shadow(0 0 6px rgba(230,200,156,0.55))" } as React.CSSProperties}
        stroke="#e6c89c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g className="pop" style={{ "--pop-d": "400ms" } as React.CSSProperties}>
        <text x="20" y="182" className="font-sans" fontSize="10" letterSpacing="1.4" fill="rgba(248,241,236,0.45)">
          SPIRAL
        </text>
      </g>
      <g className="pop" style={{ "--pop-d": "2000ms" } as React.CSSProperties}>
        <text x="340" y="182" textAnchor="end" className="font-sans" fontSize="10" letterSpacing="1.4" fill="#e6c89c">
          RESET
        </text>
      </g>
    </svg>
  );
}
