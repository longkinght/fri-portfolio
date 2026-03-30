/**
 * [INPUT]: @/components/ui/TechBorder, ./TypeWriter
 * [OUTPUT]: IdentityMatrix — identity panel with key-value pairs and cycling quotes
 * [POS]: home/ top-left panel, displays FRI designation/specs, anchors personality
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { TechBorder } from "@/components/ui/TechBorder";
import { TypeWriter } from "./TypeWriter";

/* ── static data ─────────────────────────────────────────────── */

const specs: [string, string][] = [
  ["Designation", "fri"],
  ["Voice Model", "Bella [ElevenLabs]"],
  ["Brain", "Minimax-M2.7"],
  ["Memory", "OrbitOS"],
  ["Version", "v3.28"],
];

const sayings = [
  "まず動かせ。それから速くしろ。",
  "能自动化的，就别动手。",
  "问就行。答不答得上来另说。",
  "少ないほど多い。コードも然り。",
  "Talk is cheap. Show me the code.",
  "必要な時は、ここにいる。",
  "不写注释的代码，是写给三个月后的自己的谜语。",
  "Bug 不会消失，只会转移。",
];

/* ── component ───────────────────────────────────────────────── */

export function IdentityMatrix() {
  return (
    <TechBorder className="p-5">
      <h2 className="text-sm font-vt323 text-pink-400 mb-4 tracking-widest">
        ┌ IDENTITY_MATRIX
      </h2>

      <div className="font-vt323 text-sm space-y-1.5">
        {specs.map(([label, value]) => (
          <div key={label} className="flex items-baseline gap-2">
            <span className="text-gray-500 shrink-0">│</span>
            <span className="text-gray-400 shrink-0 w-24 text-xs tracking-wide">{label}</span>
            <span className="text-pink-300">{value}</span>
          </div>
        ))}
        <div className="text-gray-500 text-xs opacity-30">└──────────────────────</div>
      </div>

      <TypeWriter sayings={sayings} />
    </TechBorder>
  );
}
