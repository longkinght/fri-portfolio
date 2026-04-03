/**
 * [INPUT]:  @/lib/content (getEntries), @/components/content/EntryList
 * [OUTPUT]: Daily digest list page — SSG at /daily
 * [POS]:    app/daily/ route — renders all daily briefings as a chronological list
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import { getEntries } from "@/lib/content";
import { EntryList } from "@/components/content/EntryList";

export default async function DailyPage() {
  const entries = await getEntries("daily");
  return (
    <EntryList
      entries={entries}
      type="daily"
      title="每日速递"
      subtitle="前沿 AI 资讯，每日精选。"
    />
  );
}
