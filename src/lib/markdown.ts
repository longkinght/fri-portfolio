/**
 * [INPUT]: marked (GFM markdown parser), ./og (fetchOgData)
 * [OUTPUT]: renderMarkdown() — async, converts markdown to HTML with OG link previews
 * [POS]: lib/markdown — rendering utility with link enrichment, consumed by content.ts
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import { marked } from "marked";
import { fetchOgData } from "./og";

marked.setOptions({
  gfm: true,
  breaks: true,
});

/* ------------------------------------------------------------------ */
/*  Link preview                                                       */
/* ------------------------------------------------------------------ */

const URL_REGEX = /^https?:\/\/\S+$/;

function buildPreviewCard(url: string, og: { title: string; description: string; image: string; siteName: string }): string {
  const imgBlock = og.image
    ? `<div class="h-32 overflow-hidden"><img src="${og.image}" alt="" class="w-full h-full object-cover" /></div>`
    : "";
  const descBlock = og.description
    ? `<div class="text-xs text-gray-400 line-clamp-2">${og.description}</div>`
    : "";

  return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="block my-4 no-underline">
      <div class="glass-panel rounded-sm overflow-hidden hover:border-pink-400/60 transition-colors">
        ${imgBlock}
        <div class="p-4">
          <div class="text-xs font-tech text-pink-500/70 mb-1">${og.siteName}</div>
          <div class="text-sm font-vt323 text-pink-200 mb-1">${og.title}</div>
          ${descBlock}
        </div>
      </div>
    </a>`;
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export async function renderMarkdown(md: string): Promise<string> {
  /* pass 1 — collect bare URLs */
  const bareUrls: string[] = [];
  for (const line of md.split("\n")) {
    const trimmed = line.trim();
    if (URL_REGEX.test(trimmed)) bareUrls.push(trimmed);
  }

  /* fetch OG data in parallel */
  const ogCache = new Map<string, Awaited<ReturnType<typeof fetchOgData>>>();
  await Promise.all(
    bareUrls.map(async (url) => {
      ogCache.set(url, await fetchOgData(url));
    }),
  );

  /* pass 2 — render markdown then replace URL paragraphs with cards */
  let html = marked.parse(md) as string;

  for (const [url, og] of ogCache) {
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const linkPattern = new RegExp(
      `<p><a[^>]*href="${escapedUrl}"[^>]*>${escapedUrl}</a></p>`,
    );

    const card = buildPreviewCard(url, og);
    html = html.replace(linkPattern, card);
    html = html.replace(`<p>${url}</p>`, card);
  }

  return html;
}
