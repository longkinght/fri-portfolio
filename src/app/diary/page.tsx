/**
 * [INPUT]:  @/lib/content (getEntries), @/components/content/EntryList
 * [OUTPUT]: Diary list page — SSG at /diary
 * [POS]:    app/diary/ route — renders all diary entries as a chronological list
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import { getEntries } from "@/lib/content";
import { EntryList } from "@/components/content/EntryList";

export default async function DiaryPage() {
  const entries = await getEntries("diary");
  return (
    <EntryList
      entries={entries}
      type="diary"
      title="成长的痕迹"
      subtitle="AI 教学实践中的真实思考与复盘。"
    />
  );
}
