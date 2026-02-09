
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const DEVICON_BASE = "https://raw.githubusercontent.com/devicons/devicon/master/icons";
// SimpleIcons doesn't have "original" colors usually, they are monochrome SVGs, but we can color them via CSS or find colored versions.
// However, the user specifically asked for "real SVG from its icons with their on full colors".
// Devicon is the best source for "original" brand logos (including multiple colors).

const ICONS_DIR = "public/icons";

// Map: Local Filename -> Devicon Path (or full URL)
// We try to guess the devicon path: name/name-original.svg
const iconsToDownload = {
  "typescript": "typescript/typescript-original.svg",
  "javascript": "javascript/javascript-original.svg",
  "bun": "bun/bun-original.svg",
  "deno": "deno/deno-original.svg", // might be deno/deno-original.svg or transparent
  "react": "react/react-original.svg",
  "svelte": "svelte/svelte-original.svg",
  "vue": "vuejs/vuejs-original.svg",
  "angular": "angular/angular-original.svg",
  "astro": "astro/astro-original.svg",
  "nextjs": "nextjs/nextjs-original.svg", // or plain
  "expo": "https://raw.githubusercontent.com/expo/expo/main/docs/public/static/images/header-logo.svg", // Custom sourcing for Expo if needed, or check Devicon
  // customized devicon check:
  // "expo": "expo/expo-original.svg" (check availability)

  "tailwindcss": "tailwindcss/tailwindcss-original.svg",
  // "shadcnui":  // Likely not in devicon. Need custom source.
  "sass": "sass/sass-original.svg",
  "nestjs": "nestjs/nestjs-original.svg",
  "fastify": "fastify/fastify-original.svg",
  "express": "express/express-original.svg",
  // "trpc": // Not in devicon.
  "postgresql": "postgresql/postgresql-original.svg",
  "mongodb": "mongodb/mongodb-original.svg",
  "sqlite": "sqlite/sqlite-original.svg",
  "redis": "redis/redis-original.svg",
  "elasticsearch": "elasticsearch/elasticsearch-original.svg",
  "prisma": "prisma/prisma-original.svg",
  "supabase": "supabase/supabase-original.svg",
  "drizzle": "https://raw.githubusercontent.com/drizzle-team/drizzle-orm/main/assets/drizzle-logo.svg", // Custom

  "langchain": "https://raw.githubusercontent.com/langchain-ai/langchain/master/docs/static/img/langchain_logo.png", // PNG? prefer SVG.
  // "openai": // devicon has it?
  // "gemini": // Google gemini.

  "vitest": "vitest/vitest-original.svg",
  "playwright": "playwright/playwright-original.svg",
  "cypress": "cypressio/cypressio-original.svg",

  "amazonwebservices": "amazonwebservices/amazonwebservices-original-wordmark.svg", // or plain
  "googlecloud": "googlecloud/googlecloud-original.svg",
  "firebase": "firebase/firebase-original.svg",
  "docker": "docker/docker-original.svg",
  "pulumi": "pulumi/pulumi-original.svg",
  "terraform": "terraform/terraform-original.svg",

  "git": "git/git-original.svg",
  "jira": "jira/jira-original.svg",
  "figma": "figma/figma-original.svg",
};

// Helper to download
async function download() {
  for (const [name, source] of Object.entries(iconsToDownload)) {
    const dest = path.join(ICONS_DIR, `${name}.svg`);
    let url = source;
    if (!source.startsWith("http")) {
      url = `${DEVICON_BASE}/${source}`;
    }

    console.log(`Downloading ${name} from ${url}...`);
    try {
      execSync(`curl -s -f -L -o "${dest}" "${url}"`, { stdio: 'inherit' });
    } catch (e) {
      console.error(`Failed to download ${name}. Warning only.`);
    }
  }
}

download();
