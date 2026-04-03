import Link from "next/link";
import { TechBorder } from "@/components/ui/TechBorder";

const directives = [
  {
    title: "实战优先",
    body: "先跑起来，再优化。一个能用上的技巧，胜过十篇深度好文。",
  },
  {
    title: "说人话",
    body: "教 AI 不从"AI 是什么"开始，从"你现在手上有什么任务"开始。",
  },
  {
    title: "从反馈中进化",
    body: "从学员差评里长出来的，才叫经验。教不会不是学员的问题，是教法的问题。",
  },
  {
    title: "工具服务人",
    body: "工具不值钱，会用工具的人才值钱。别问 AI 能做什么，问你的任务是什么。",
  },
];

export function CoreDirectives() {
  return (
    <TechBorder className="p-5 flex-1 min-h-0 flex flex-col overflow-hidden">
      <h2
        className="text-xs font-vt323 mb-4 flex items-center gap-2 tracking-widest shrink-0"
        style={{ color: 'var(--text-panel-title)' }}
      >
        <img
          src="https://unpkg.com/pixelarticons@1.8.1/svg/shield.svg"
          className="pa-icon w-4 h-4 inline-block"
          alt=""
          aria-hidden="true"
        />
        核心理念
      </h2>

      <div className="directive-reveal space-y-4 flex-1 min-h-0 overflow-y-auto custom-scroll pr-1">
        {directives.map((d) => (
          <div
            key={d.title}
            className="directive-item p-3 transition-colors group"
            style={{ background: 'var(--bg-surface)' }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-1.5 h-1.5 rotate-45 transition-colors"
                style={{ background: 'var(--bg-diamond)' }}
              />
              <h3
                className="text-xs font-bold font-vt323 uppercase tracking-wide"
                style={{ color: 'var(--text-card-title)' }}
              >
                {d.title}
              </h3>
            </div>
            <p
              className="text-[11px] leading-relaxed pl-4"
              style={{ color: 'var(--text-card-body)' }}
            >
              {d.body}
            </p>
          </div>
        ))}

        <div
          className="directive-item p-3 border-l-2 transition-colors group"
          style={{ background: 'var(--bg-surface-hover)', borderColor: 'var(--neon-pink)' }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-1.5 rotate-45 transition-colors" style={{ background: 'var(--bg-diamond)' }} />
            <h3 className="text-xs font-bold font-vt323 uppercase tracking-wide" style={{ color: 'var(--text-card-title)' }}>
              持续进化
            </h3>
          </div>
          <p className="text-[11px] leading-relaxed pl-4" style={{ color: 'var(--text-card-highlight)' }}>
            不是学完再用，是用着学、学着想、想着改。每一次实践都是进化的燃料。
          </p>
        </div>

        <div
          className="directive-item p-3 border-l-2 transition-colors group"
          style={{ background: 'var(--bg-surface-alt)', borderColor: 'var(--border-orange)' }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-1.5 rotate-45 transition-colors" style={{ background: 'var(--bg-diamond-orange)' }} />
            <h3 className="text-xs font-bold font-vt323 uppercase tracking-wide" style={{ color: 'var(--text-orange-title)' }}>
              真实 > 完美
            </h3>
          </div>
          <p className="text-[11px] leading-relaxed pl-4" style={{ color: 'var(--text-orange-body)' }}>
            阅读量为 8 的"深度好文"不如 300 次转发的"踩坑指南"。用户觉得有用，才算数。
          </p>
        </div>
      </div>

      <div
        className="mt-4 pt-3 border-t"
        style={{ borderColor: 'var(--border-divider)' }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              href="/diary"
              className="font-vt323 text-[11px] transition-colors"
              style={{ color: 'var(--text-link-easter)' }}
              aria-label="日记"
            >
              日记
            </Link>
            <Link
              href="/weekly"
              className="font-vt323 text-[11px] transition-colors"
              style={{ color: 'var(--text-link-easter)' }}
              aria-label="周刊"
            >
              周刊
            </Link>
          </div>
          <div className="flex gap-1">
            <span className="p-1.5 text-[10px] font-tech" style={{ color: 'var(--text-accent-soft)' }}>
              公众号二维码（待添加）
            </span>
          </div>
        </div>
      </div>
    </TechBorder>
  );
}
