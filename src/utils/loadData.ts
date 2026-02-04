import fs from "node:fs/promises";
import path from "node:path";

export async function loadUiData(lang: string) {
  try {
    const filePath = path.join(process.cwd(), `docs/data/${lang}/ui.json`);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (e) {
    console.error(`Failed to load UI data for ${lang}`, e);
    // Fallback? Or throw?
    // Let's try to load 'en' as fallback if not 'en'
    if (lang !== 'en') {
      try {
        const fallbackPath = path.join(process.cwd(), `docs/data/en/ui.json`);
        const fallbackContent = await fs.readFile(fallbackPath, "utf-8");
        return JSON.parse(fallbackContent);
      } catch (e2) {
        return {};
      }
    }
    return {};
  }
}
