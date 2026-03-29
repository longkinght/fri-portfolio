/**
 * [INPUT]:  @/lib/content (getEntry, getSlugs), @/components/content/EntryPage
 * [OUTPUT]: Single diary entry page — SSG at /diary/[slug]
 * [POS]:    app/diary/[slug]/ route — renders one diary entry by slug,
 *           generateStaticParams pre-builds all 46 diary pages at build time
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import { getEntry, getSlugs } from "@/lib/content";
import { EntryPage } from "@/components/content/EntryPage";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getSlugs("diary");
  return slugs.map((slug) => ({ slug }));
}

export default async function DiaryEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry("diary", slug);
  if (!entry) notFound();
  return <EntryPage entry={entry} type="diary" backHref="/diary" />;
}
