/**
 * [INPUT]: @/components/ui/TechBorder, ./NetworkTraffic
 * [OUTPUT]: Diagnostics — right-column panel with stats, network bars, service statuses
 * [POS]: home/ top-level section, renders in the 3-col grid right column
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { TechBorder } from "@/components/ui/TechBorder";
import { NetworkTraffic } from "./NetworkTraffic";

/* ------------------------------------------------------------------ */
/*  Static data                                                       */
/* ------------------------------------------------------------------ */

const services = [
  { name: "GATEWAY_API", status: "ONLINE", color: "text-green-400" },
  { name: "ORBITOS_SYNC", status: "ACTIVE", color: "text-yellow-400" },
  { name: "EMAIL_DAEMON", status: "RUNNING", color: "text-green-400" },
  { name: "SECURITY_PROTOCOL", status: "ENCRYPTED", color: "text-green-400" },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Diagnostics() {
  return (
    <TechBorder className="p-6 md:p-5">
      <h2 className="text-sm font-vt323 text-pink-400 mb-4 tracking-widest">
        ┌ DIAGNOSTICS
      </h2>

      {/* Stat boxes */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="border border-pink-500/15 p-3 text-center">
          <div className="text-[9px] font-vt323 text-gray-500 tracking-widest mb-1">
            LATENCY
          </div>
          <div className="text-lg font-vt323 text-pink-300">47ms</div>
        </div>
        <div className="border border-pink-500/15 p-3 text-center">
          <div className="text-[9px] font-vt323 text-gray-500 tracking-widest mb-1">
            UPTIME
          </div>
          <div className="text-lg font-vt323 text-pink-300">99.97%</div>
        </div>
      </div>

      <NetworkTraffic />

      {/* Service status list */}
      <div className="mt-4 space-y-1 font-vt323 text-[11px] text-pink-300/70">
        {services.map((svc) => (
          <div key={svc.name} className="flex justify-between items-center">
            <span className="text-gray-500">├─ {svc.name}</span>
            <span className={`${svc.color} tracking-wider`}>[{svc.status}]</span>
          </div>
        ))}
        <div className="text-gray-500 opacity-30">└────────────────────</div>
      </div>
    </TechBorder>
  );
}
