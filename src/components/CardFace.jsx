import { useMemo } from "react";

const THEMES = {
  Wands:     { p: "#e74c3c", s: "#c0392b", bg: "linear-gradient(135deg, #1a0a0a, #2d0f0f)", glow: "rgba(231,76,60,0.35)" },
  Cups:      { p: "#3498db", s: "#2980b9", bg: "linear-gradient(135deg, #0a0a1a, #0f1428)", glow: "rgba(52,152,219,0.35)" },
  Swords:    { p: "#bdc3c7", s: "#7f8c8d", bg: "linear-gradient(135deg, #0a0a12, #12121f)", glow: "rgba(189,195,199,0.3)" },
  Pentacles: { p: "#f39c12", s: "#d68910", bg: "linear-gradient(135deg, #1a1408, #2d200f)", glow: "rgba(243,156,18,0.35)" },
  Major:     { p: "#9b59b6", s: "#8e44ad", bg: "linear-gradient(135deg, #140a1a, #1f0f2d)", glow: "rgba(155,89,182,0.35)" },
};

/* 大阿卡纳：根据 index 生成独特几何图案 */
function majorSymbol(i) {
  const c = "#9b59b6";
  // 用三角函数生成独特布局
  const r = 14 + (i % 5) * 2;
  const cx = 50 + Math.sin(i * 1.7) * 4;
  const cy = 40 + Math.cos(i * 1.3) * 4;
  const sides = 3 + (i % 6); // 3-8 边形
  const points = [];
  for (let k = 0; k < sides; k++) {
    const a = (k / sides) * Math.PI * 2 - Math.PI / 2;
    points.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return (
    <g>
      <polygon points={points.join(" ")} fill="none" stroke={c} strokeWidth="1.5" opacity="0.7"/>
      <circle cx={cx} cy={cy} r={r * 0.45} fill="none" stroke={c} strokeWidth="1" opacity="0.5"/>
      <circle cx={cx} cy={cy} r={2.5} fill={c} opacity="0.6"/>
      {/* 内部装饰线 */}
      {Array.from({ length: i % 4 + 1 }, (_, j) => {
        const a = (j / (i % 4 + 1)) * Math.PI * 2;
        return <line key={j} x1={cx} y1={cy} x2={cx + r * 0.8 * Math.cos(a)} y2={cy + r * 0.8 * Math.sin(a)} stroke={c} strokeWidth="0.8" opacity="0.4"/>;
      })}
    </g>
  );
}

/* 小阿卡纳：根据花色和数字生成 */
function minorSymbol(suit, n) {
  const t = THEMES[suit];
  const c = t.p;
  const shapes = {
    Wands: (
      <g>
        <path d="M50 16 L50 53" stroke={c} strokeWidth="2.5"/>
        <path d={`M${50 - 8 - n} 20 Q50 ${8 - n} ${50 + 8 + n} 20`} stroke={c} strokeWidth="1.8" fill="none"/>
        <path d="M35 27 Q50 15 65 27" stroke={c} strokeWidth="1.2" fill="none" opacity=".6"/>
        <path d="M33 58 Q50 50 67 58 L62 66 Q50 60 38 66 Z" fill={c} opacity=".35"/>
        {Array.from({ length: n }, (_, j) => <circle key={j} cx={30 + j * 20} cy={55 - j * 3} r="2" fill={c} opacity=".5"/>)}
      </g>
    ),
    Cups: (
      <g>
        <path d="M35 25 L35 45 Q35 55 50 55 Q65 55 65 45 L65 25 Z" fill="none" stroke={c} strokeWidth="1.8"/>
        <path d="M30 25 L70 25" stroke={c} strokeWidth="1.5"/>
        <ellipse cx="50" cy="25" rx={16 + n} ry="5" fill="none" stroke={c} strokeWidth="1.2" opacity=".6"/>
        {Array.from({ length: n + 1 }, (_, j) => <circle key={j} cx={36 + j * 7} cy={40 + (j % 2) * 5} r="3" fill={c} opacity=".3"/>)}
      </g>
    ),
    Swords: (
      <g>
        <path d="M50 14 L50 52" stroke={c} strokeWidth="2.5"/>
        <path d="M38 18 L50 8 L62 18" stroke={c} strokeWidth="1.5" fill="none"/>
        <line x1="35" y1="52" x2="65" y2="52" stroke={c} strokeWidth="1.5"/>
        <path d="M35 52 L30 62" stroke={c} strokeWidth="1.5"/>
        <path d="M65 52 L70 62" stroke={c} strokeWidth="1.5"/>
        {Array.from({ length: n }, (_, j) => <line key={j} x1={30 + j * 5} y1={30 + j * 4} x2={42 + j * 5} y2={30 + j * 4} stroke={c} strokeWidth="1" opacity=".5"/>)}
      </g>
    ),
    Pentacles: (
      <g>
        <circle cx="50" cy="38" r={14 + n} fill="none" stroke={c} strokeWidth="1.8"/>
        <circle cx="50" cy="38" r={8 + n * 0.5} fill="none" stroke={c} strokeWidth="1.2" opacity=".6"/>
        <circle cx="50" cy="38" r="4" fill={c} opacity=".4"/>
        <path d="M30 60 Q50 53 70 60 L65 68 Q50 62 35 68 Z" fill={c} opacity=".3"/>
        {Array.from({ length: n }, (_, j) => <circle key={j} cx={28 + j * 11} cy={66} r="2.5" fill={c} opacity=".4"/>)}
      </g>
    ),
  };
  return shapes[suit] || null;
}

/* 数字名称 */
const NUM_NAMES = ["侍者","二","三","四","五","六","七","八","九","十"];

/* 主组件 */
export default function CardFace({ card, suit, majorIndex, minorIndex }) {
  const theme = THEMES[suit] || THEMES.Major;
  const symbol = useMemo(() => {
    if (suit === "Major") return majorSymbol(majorIndex);
    return minorSymbol(suit, minorIndex);
  }, [suit, majorIndex, minorIndex]);

  const numLabel = suit === "Major"
    ? ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI"][majorIndex]
    : NUM_NAMES[minorIndex] || "";

  return (
    <div className="card-face" style={{ background: theme.bg, color: theme.p }}>
      <svg viewBox="0 0 100 80" className="card-face-svg" style={{ filter: `drop-shadow(0 0 6px ${theme.glow})` }}>
        {symbol}
      </svg>
      <div className="card-face-name" style={{ color: theme.p }}>{card.name}</div>
      {numLabel && <div className="card-face-num" style={{ color: theme.s }}>{numLabel}</div>}
    </div>
  );
}
