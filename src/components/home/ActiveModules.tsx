/**
 * [INPUT]: TechBorder from @/components/ui/TechBorder
 * [OUTPUT]: ActiveModules — panel displaying AI module statuses with jittery progress bars
 * [POS]: home/ left-column bottom panel, sibling to skill/stat panels
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { useEffect, useRef } from "react";
import { TechBorder } from "@/components/ui/TechBorder";

/* ------------------------------------------------------------------ */
/*  Static module data                                                 */
/* ------------------------------------------------------------------ */

const modules = [
  { name: "Natural Language", status: "ACTIVE", statusColor: "text-green-400", base: 100 },
  { name: "Code Execution", status: "READY", statusColor: "text-green-400", base: 92 },
  { name: "File Operations", status: "ACTIVE", statusColor: "text-green-400", base: 78 },
  { name: "Web Search", status: "CONNECTED", statusColor: "text-green-400", base: 100 },
  { name: "Memory Management", status: "SYNCING", statusColor: "text-yellow-400", base: 65 },
  { name: "Voice Synthesis", status: "READY", statusColor: "text-green-400", base: 100 },
  { name: "WhatsApp Bridge", status: "CONNECTED", statusColor: "text-green-400", base: 100 },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ActiveModules() {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    barsRef.current.forEach((el, i) => {
      if (!el) return;

      const base = modules[i].base;
      const interval = Math.random() * 1200 + 1600;

      function update() {
        const delta = (Math.random() - 0.5) * 30;
        const w = Math.min(100, Math.max(0, base + delta));
        el!.style.width = w + "%";
      }

      function schedule() {
        update();
        const id = setTimeout(schedule, interval);
        timers.push(id);
      }

      const delayId = setTimeout(schedule, Math.random() * 1800 + 400);
      timers.push(delayId);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <TechBorder className="p-5 flex-1 overflow-hidden flex flex-col">
      <h2 className="text-sm font-vt323 text-pink-400 mb-4 tracking-widest">
        ┌ ACTIVE_MODULES
      </h2>

      <div className="custom-scroll overflow-y-auto pr-2 space-y-2.5 flex-1">
        {modules.map((mod, i) => (
          <div key={mod.name} className="group cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-vt323 group-hover:text-pink-300 transition-colors">
                <span className="text-gray-500 mr-1.5">│</span>
                {mod.name}
              </span>
              <span className={`text-[10px] font-vt323 ${mod.statusColor} tracking-wider`}>
                [{mod.status}]
              </span>
            </div>
            <div className="progress-bar-bg ml-4">
              <div
                ref={(el) => { barsRef.current[i] = el; }}
                className="progress-bar-fill module-bar"
                style={{ width: `${mod.base}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </TechBorder>
  );
}
