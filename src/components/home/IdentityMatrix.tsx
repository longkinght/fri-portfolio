"use client";

import { TechBorder } from "@/components/ui/TechBorder";
import { TypeWriter } from "./TypeWriter";

interface IdentityMatrixProps {
  diaryCount: number;
  weeklyCount: number;
  lastEntryAge: string;
}

const sayings = [
  "先跑起来，再优化。",
  "能自动化的，就别动手。",
  "一个能用上的技巧，胜过十篇深度好文。",
  "从学员差评里长出来的，才叫经验。",
  "说人话，教人用，别炫技。",
  "别问 AI 能做什么，问你手上的任务是什么。",
  "教不会不是学员的问题，是教法的问题。",
  "工具不值钱，会用工具的人才值钱。",
];

export function IdentityMatrix({ diaryCount, weeklyCount, lastEntryAge }: IdentityMatrixProps) {
  const specs: [string, string][] = [
    ["名称", "黄老师进化营"],
    ["引擎", "AI + 实践"],
    ["内容", `${diaryCount} 篇日记 · ${weeklyCount} 篇周刊`],
    ["最近更新", lastEntryAge],
    ["版本", "v1.0"],
  ];
  return (
    <TechBorder className="p-5">
      <h2
        className="text-xs font-vt323 mb-4 flex items-center gap-2 tracking-widest"
        style={{ color: 'var(--text-panel-title)' }}
      >
        <img
          src="https://unpkg.com/pixelarticons@1.8.1/svg/server.svg"
          className="pa-icon w-4 h-4 inline-block"
          alt=""
          aria-hidden="true"
        />
        身份档案
      </h2>

      <div className="space-y-4">
        {specs.map(([label, value], i) => (
          <div
            key={label}
            className={`flex justify-between items-center text-sm${
              i < specs.length - 1
                ? " border-b pb-3 pt-0.5"
                : " pb-3 pt-0.5"
            }`}
            style={i < specs.length - 1 ? { borderColor: 'var(--border-divider)' } : undefined}
          >
            <span style={{ color: 'var(--text-muted)' }}>{label}</span>
            <span className="font-bold font-vt323" style={{ color: 'var(--text-value)' }}>{value}</span>
          </div>
        ))}
      </div>

      <TypeWriter sayings={sayings} />
    </TechBorder>
  );
}
