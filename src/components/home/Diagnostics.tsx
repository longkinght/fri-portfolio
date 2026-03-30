/**
 * [INPUT]: @/components/ui/TechBorder, props from page.tsx (thisWeekCount, thisMonthCount, dailyActivity, diaryCount, weeklyCount, cachedUrls)
 * [OUTPUT]: Diagnostics — right-column panel with real stats, interactive publishing frequency bars, service statuses
 * [POS]: home/ top-level section, renders in the 3-col grid right column
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { useState } from "react";
import { TechBorder } from "@/components/ui/TechBorder";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface DiagnosticsProps {
  thisWeekCount: number;
  thisMonthCount: number;
  dailyActivity: { date: string; count: number }[];
  diaryCount: number;
  weeklyCount: number;
  cachedUrls: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Diagnostics({
  thisWeekCount,
  thisMonthCount,
  dailyActivity,
  diaryCount,
  weeklyCount,
  cachedUrls,
}: DiagnosticsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const services = [
    { name: "DIARY", status: `${diaryCount} entries`, color: "text-green-400" },
    { name: "WEEKLY", status: `${weeklyCount} entries`, color: "text-green-400" },
    { name: "LINK_PREVIEW", status: `CACHED (${cachedUrls})`, color: "text-green-400" },
    { name: "DEPLOY", status: "VERCEL", color: "text-green-400" },
  ];

  const hoveredDay = hovered !== null ? dailyActivity[hovered] : null;

  return (
    <TechBorder className="p-6 md:p-5">
      {/* Title */}
      <h2 className="text-xs font-vt323 text-pink-400 mb-4 flex items-center gap-2 tracking-widest">
        <img
          src="https://unpkg.com/pixelarticons@1.8.1/svg/chart.svg"
          className="pa-icon w-4 h-4 inline-block"
          alt=""
          aria-hidden="true"
        />
        DIAGNOSTICS
      </h2>

      {/* Stat boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-pink-950/10 p-4 text-center">
          <div className="text-[10px] text-gray-400 uppercase mb-1.5">
            This Week
          </div>
          <div className="text-xl font-bold font-vt323 text-pink-300">
            {thisWeekCount}
          </div>
        </div>
        <div className="bg-pink-950/10 p-4 text-center">
          <div className="text-[10px] text-gray-400 uppercase mb-1.5">
            This Month
          </div>
          <div className="text-xl font-bold font-vt323 text-pink-300">
            {thisMonthCount}
          </div>
        </div>
      </div>

      {/* Publishing frequency bars — interactive */}
      <div
        className="relative h-24 bg-black/20 overflow-hidden flex items-end gap-[2px] p-[1px] mb-5"
        onMouseLeave={() => setHovered(null)}
      >
        {dailyActivity.map((day, i) => (
          <div
            key={i}
            className="flex-1 transition-opacity duration-100 cursor-crosshair"
            style={{
              height: `${day.count > 0 ? Math.max(20, day.count * 33) : 5}%`,
              minWidth: "4px",
              background: hovered === i
                ? "rgba(236,72,153,0.95)"
                : hovered !== null
                  ? day.count > 0 ? "rgba(236,72,153,0.3)" : "rgba(236,72,153,0.05)"
                  : day.count > 0 ? "rgba(236,72,153,0.7)" : "rgba(236,72,153,0.1)",
              imageRendering: "pixelated" as const,
            }}
            onMouseEnter={() => setHovered(i)}
          />
        ))}
        <div className="absolute top-1 left-1 text-[8px] font-tech text-pink-600 pointer-events-none">
          {hoveredDay
            ? `${formatDate(hoveredDay.date)} · ${hoveredDay.count} ${hoveredDay.count === 1 ? "entry" : "entries"}`
            : "PUBLISHING FREQUENCY"}
        </div>
      </div>

      {/* Service status list */}
      <div className="mt-5 space-y-4 font-tech text-[10px] text-pink-300/70">
        {services.map((svc) => (
          <div
            key={svc.name}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-0 py-1.5 sm:py-0 border-b border-pink-500/10 sm:border-0 last:border-0"
          >
            <span>&gt; {svc.name}</span>
            <span className={svc.color}>{svc.status}</span>
          </div>
        ))}
      </div>
    </TechBorder>
  );
}
