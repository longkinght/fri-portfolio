/**
 * [INPUT]: fs, path (node builtins), URL (global)
 * [OUTPUT]: fetchOgData() — fetches and caches Open Graph metadata for a URL
 * [POS]: lib/og — build-time OG metadata fetcher, consumed by markdown.ts
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import fs from "fs";
import path from "path";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface OgData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
}

/* ------------------------------------------------------------------ */
/*  Cache                                                              */
/* ------------------------------------------------------------------ */

const CACHE_DIR = path.join(process.cwd(), ".cache", "og");

function getCachePath(url: string): string {
  const hash = Buffer.from(url).toString("base64url").slice(0, 64);
  return path.join(CACHE_DIR, `${hash}.json`);
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export async function fetchOgData(url: string): Promise<OgData> {
  const cachePath = getCachePath(url);

  if (fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, "utf8"));
  }

  const data: OgData = {
    title: "",
    description: "",
    image: "",
    url,
    siteName: new URL(url).hostname,
  };

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "fri-bot/1.0" },
      signal: AbortSignal.timeout(5000),
    });
    const html = await res.text();

    const getMetaContent = (property: string): string => {
      const match = html.match(
        new RegExp(
          `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*)["']`,
          "i",
        ),
      );
      if (match) return match[1];
      const reversed = html.match(
        new RegExp(
          `<meta[^>]+content=["']([^"']*?)["'][^>]+(?:property|name)=["']${property}["']`,
          "i",
        ),
      );
      return reversed?.[1] || "";
    };

    data.title =
      getMetaContent("og:title") ||
      html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ||
      url;
    data.description =
      getMetaContent("og:description") || getMetaContent("description");
    data.image = getMetaContent("og:image");
    data.siteName = getMetaContent("og:site_name") || data.siteName;
  } catch {
    data.title = url;
  }

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(cachePath, JSON.stringify(data));

  return data;
}
