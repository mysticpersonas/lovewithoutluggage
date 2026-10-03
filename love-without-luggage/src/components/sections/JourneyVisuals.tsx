/* ---------------------------------------------------------------
   Journey — one scene per stage, told in the program's own language:
   the luggage you carry, two hearts, the conversations between them.
   Inline SVG line art. Each scene sits in a wrapper with
   data-in={active}, so `.draw` strokes draw in when the stage arrives
   and rewind when it leaves; `.pop` elements fade in on cue.
--------------------------------------------------------------- */

const FAINT = "rgba(248,241,236,0.34)";
const DIM = "rgba(248,241,236,0.16)";
const GOLD = "#e6c89c";
const INK = "#0f0911";
const glow = { filter: "drop-shadow(0 0 8px rgba(230,200,156,0.55))" };
const d = (ms: number) => ({ "--draw-d": `${ms}ms` }) as React.CSSProperties;
const p = (ms: number) => ({ "--pop-d": `${ms}ms` }) as React.CSSProperties;

function heart(cx: number, cy: number, s: number) {
  return (
    `M ${cx} ${cy + 0.9 * s} ` +
    `C ${cx - 1.5 * s} ${cy + 0.05 * s}, ${cx - 0.95 * s} ${cy - 1.05 * s}, ${cx} ${cy - 0.3 * s} ` +
    `C ${cx + 0.95 * s} ${cy - 1.05 * s}, ${cx + 1.5 * s} ${cy + 0.05 * s}, ${cx} ${cy + 0.9 * s} Z`
  );
}

function Suitcase({
  x, y, w, h, stroke = FAINT, fill = "none", delay = 0, animate = "draw",
}: {
  x: number; y: number; w: number; h: number; stroke?: string; fill?: string; delay?: number; animate?: "draw" | "pop";
}) {
  const hw = w * 0.32;
  const hx = x + (w - hw) / 2;
  const cls = animate === "draw" ? "draw" : "";
  const common = { stroke, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const g = (
    <>
      <rect className={cls} pathLength={1} style={d(delay)} x={x} y={y} width={w} height={h} rx={w * 0.1} fill={fill} {...common} />
      <path
        className={cls}
        pathLength={1}
        style={d(delay + 150)}
        d={`M ${hx} ${y} v ${-h * 0.14} a 5 5 0 0 1 5 -5 h ${hw - 10} a 5 5 0 0 1 5 5 v ${h * 0.14}`}
        {...common}
      />
      <path className={cls} pathLength={1} style={d(delay + 250)} d={`M ${x + w * 0.24} ${y} v ${h} M ${x + w * 0.76} ${y} v ${h}`} {...common} />
    </>
  );
  return animate === "pop" ? <g className="pop" style={p(delay)}>{g}</g> : g;
}

function Chip({ x, y, label, delay, gold = false }: { x: number; y: number; label: string; delay: number; gold?: boolean }) {
  const w = label.length * 7 + 34;
  return (
    <g className="pop" style={p(delay)}>
      <rect x={x - w / 2} y={y - 13} width={w} height="26" rx="13" fill={gold ? GOLD : "#1d1220"} stroke={gold ? "none" : "rgba(230,200,156,0.7)"} />
      {!gold && <circle cx={x - w / 2 + 14} cy={y} r="3" fill={GOLD} />}
      <text
        x={gold ? x : x - w / 2 + 24}
        y={y + 4}
        textAnchor={gold ? "middle" : "start"}
        className="font-sans"
        fontSize="11.5"
        fontWeight={gold ? 600 : 500}
        fill={gold ? "#2a1520" : "#f8f1ec"}
      >
        {label}
      </text>
    </g>
  );
}

/* 01 Identify — a light finds the suitcase you've been carrying,
   and what's inside rises into view: your own heart, and how it reacts. */
function Identify() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="jv-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(230,200,156,0.22)" />
          <stop offset="100%" stopColor="rgba(230,200,156,0)" />
        </linearGradient>
      </defs>
      <path className="pop" style={p(0)} d="M 136 26 L 184 26 L 246 262 L 74 262 Z" fill="url(#jv-beam)" />
      <line className="pop" style={p(100)} x1="56" y1="262" x2="264" y2="262" stroke={DIM} strokeWidth="1" />
      <Suitcase x={96} y={178} w={128} h={84} delay={150} />
      {/* what's inside rises out */}
      <path className="pop" style={p(800)} d="M 160 172 L 160 140" stroke={GOLD} strokeWidth="1.5" strokeDasharray="2 5" strokeLinecap="round" />
      <path className="draw" pathLength={1} style={{ ...d(900), ...glow }} d={heart(160, 112, 24)} stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
      <Chip x={160} y={60} label="What you carry" delay={1500} />
    </svg>
  );
}

/* 02 Spot — two hearts, and the old baggage sitting between them */
function Spot() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden="true">
      <path className="draw" pathLength={1} style={d(0)} d={heart(90, 130, 28)} stroke={FAINT} strokeWidth="1.5" strokeLinejoin="round" />
      <path className="draw" pathLength={1} style={d(150)} d={heart(230, 130, 28)} stroke={FAINT} strokeWidth="1.5" strokeLinejoin="round" />
      {/* they reach for each other... */}
      <g className="pop" style={p(600)} stroke={DIM} strokeWidth="1.5" strokeDasharray="2 5" strokeLinecap="round">
        <path d="M 122 150 L 134 160" />
        <path d="M 198 150 L 186 160" />
      </g>
      {/* ...and the baggage is in the way */}
      <Suitcase x={136} y={160} w={48} h={38} fill="rgba(0,0,0,0.35)" stroke="rgba(248,241,236,0.45)" delay={700} animate="pop" />
      <circle className="pop" style={{ ...p(1100), ...glow }} cx="160" cy="174" r="42" stroke={GOLD} strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" />
      <Chip x={160} y={252} label="The pattern between you" delay={1350} />
    </svg>
  );
}

/* 03 Interrupt — a conversation heating up, caught and paused
   before it becomes a shutdown or a blow-up */
function Bubble({ x, y, w, h, tail, delay, stroke }: { x: number; y: number; w: number; h: number; tail: "left" | "right"; delay: number; stroke: string }) {
  const tx = tail === "left" ? x + 26 : x + w - 26;
  const dir = tail === "left" ? -1 : 1;
  return (
    <>
      <rect className="draw" pathLength={1} style={d(delay)} x={x} y={y} width={w} height={h} rx="18" stroke={stroke} strokeWidth="1.5" />
      <path className="draw" pathLength={1} style={d(delay + 300)} d={`M ${tx - 8 * dir} ${y + h} L ${tx + 4 * dir} ${y + h + 16} L ${tx + 12 * dir} ${y + h}`} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
    </>
  );
}

function zig(x0: number, x1: number, y: number, amp: number, n: number) {
  let s = `M ${x0} ${y}`;
  for (let i = 1; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    s += ` L ${x.toFixed(1)} ${(i === n ? y : y + (i % 2 ? -amp : amp)).toFixed(1)}`;
  }
  return s;
}

function Interrupt() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden="true">
      <Bubble x={34} y={54} w={120} h={58} tail="left" delay={0} stroke={FAINT} />
      <path className="draw" pathLength={1} style={d(350)} d={zig(54, 134, 83, 7, 8)} stroke={FAINT} strokeWidth="1.5" strokeLinejoin="round" />
      <Bubble x={166} y={118} w={120} h={58} tail="right" delay={500} stroke="rgba(248,241,236,0.5)" />
      <path className="draw" pathLength={1} style={d(850)} d={zig(186, 266, 147, 15, 8)} stroke="rgba(248,241,236,0.5)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* the pause */}
      <circle className="draw" pathLength={1} style={{ ...d(1200), ...glow }} cx="160" cy="236" r="28" stroke={GOLD} strokeWidth="2" />
      <g className="pop" style={p(1500)} fill={GOLD}>
        <rect x="150" y="224" width="6" height="24" rx="3" />
        <rect x="164" y="224" width="6" height="24" rx="3" />
      </g>
      <Chip x={160} y={292} label="Pause" delay={1650} gold />
    </svg>
  );
}

/* 04 Replace — the old reactive script fades; a love-forward line
   joins the two hearts, and the baggage is finally set down */
function Replace() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden="true">
      <path className="draw" pathLength={1} style={d(0)} d={heart(76, 128, 24)} stroke={FAINT} strokeWidth="1.5" strokeLinejoin="round" />
      <path className="draw" pathLength={1} style={d(100)} d={heart(244, 128, 24)} stroke={FAINT} strokeWidth="1.5" strokeLinejoin="round" />
      {/* old script: jagged, dashed, already fading */}
      <path
        className="pop"
        style={p(300)}
        d="M 104 132 L 124 112 L 140 150 L 160 114 L 180 150 L 196 112 L 216 132"
        stroke={DIM}
        strokeWidth="1.5"
        strokeDasharray="3 5"
        strokeLinejoin="round"
      />
      {/* new response: one calm, warm line */}
      <path className="draw" pathLength={1} style={{ ...d(700), ...glow }} d="M 100 120 C 136 64, 184 64, 220 120" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
      <circle className="pop" style={{ ...p(1600), ...glow }} cx="160" cy="78" r="4" fill={GOLD} />
      {/* the luggage, set down on the ground */}
      <line className="pop" style={p(1300)} x1="80" y1="262" x2="240" y2="262" stroke={DIM} strokeWidth="1" />
      <Suitcase x={140} y={226} w={40} h={36} stroke="rgba(248,241,236,0.3)" delay={1300} animate="pop" />
      <Chip x={160} y={294} label="Set it down" delay={1800} />
    </svg>
  );
}

export const STAGE_VISUALS = [Identify, Spot, Interrupt, Replace];

/* ---------- Topographic map texture ----------
   Irregular contour rings around two "peaks" — reads as a map without
   any cartography clichés. Static, very faint, parallaxed by the section. */

function contour(cx: number, cy: number, r: number, seed: number) {
  let s = "";
  const N = 96;
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2;
    const k =
      1 +
      0.12 * Math.sin(a * 3 + seed) +
      0.07 * Math.sin(a * 5 + seed * 1.7) +
      0.04 * Math.sin(a * 9 + seed * 2.3);
    const x = cx + r * k * Math.cos(a);
    const y = cy + r * k * 0.72 * Math.sin(a);
    s += `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return s + "Z";
}

const TOPO = [
  ...Array.from({ length: 9 }, (_, i) => contour(300, 260, 60 + i * 52, 1.3 + i * 0.35)),
  ...Array.from({ length: 8 }, (_, i) => contour(1180, 640, 50 + i * 58, 4.1 + i * 0.3)),
];

export function TopoMap() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      {TOPO.map((path, i) => (
        <path key={i} d={path} stroke="rgba(230,200,156,0.07)" strokeWidth="1" />
      ))}
    </svg>
  );
}
