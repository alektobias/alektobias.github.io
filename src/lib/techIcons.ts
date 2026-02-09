
export const techIcons: Record<string, string> = {
  // Runtime
  typescript: "/icons/typescript.svg",
  javascript: "/icons/javascript.svg",
  bun: "/icons/bun.svg",
  deno: "/icons/deno.svg",

  // Aliases & Specific Mappings
  aws: "/icons/amazonwebservices.svg",
  gcp: "/icons/googlecloud.svg",
  drizzleorm: "/icons/drizzle.svg",
  reactnative: "/icons/react.svg",
  elysiajs: "/icons/elysia.svg",
  openai: "/icons/openai.svg",
  gemini: "/icons/gemini.svg",
  claudecode: "/icons/claude.svg",
  shadcn: "/icons/shadcnui.svg", // Alias for just 'shadcn'
  langchain: "/icons/langchain.svg", // Ensure it's hit
  trpc: "/icons/trpc.svg", // Ensure it's hit

  // Frontend
  react: "/icons/react.svg",
  svelte: "/icons/svelte.svg",
  vue: "/icons/vue.svg",
  angular: "/icons/angular.svg",
  astro: "/icons/astro.svg",
  nextjs: "/icons/nextjs.svg",
  expo: "/icons/expo.svg",
  tailwindcss: "/icons/tailwindcss.svg",
  "shadcn/ui": "/icons/shadcnui.svg",
  sass: "/icons/sass.svg",

  // Backend
  nodejs: "/icons/nodejs.svg", // if used
  nestjs: "/icons/nestjs.svg",
  fastify: "/icons/fastify.svg",
  express: "/icons/express.svg",

  // DB
  postgresql: "/icons/postgresql.svg",
  mongodb: "/icons/mongodb.svg",
  sqlite: "/icons/sqlite.svg",
  redis: "/icons/redis.svg",
  elasticsearch: "/icons/elasticsearch.svg",
  prisma: "/icons/prisma.svg",
  supabase: "/icons/supabase.svg",
  drizzle: "/icons/drizzle.svg",

  // DevOps / Cloud
  amazonwebservices: "/icons/amazonwebservices.svg",
  googlecloud: "/icons/googlecloud.svg",
  firebase: "/icons/firebase.svg",
  docker: "/icons/docker.svg",
  pulumi: "/icons/pulumi.svg",
  terraform: "/icons/terraform.svg",

  // Tools
  git: "/icons/git.svg",
  jira: "/icons/jira.svg",
  figma: "/icons/figma.svg",

  // Testing
  vitest: "/icons/vitest.svg",
  playwright: "/icons/playwright.svg",
  cypress: "/icons/cypress.svg",

  // Defaults or missing
  default: "/icons/box.svg" // fallback
};

export const getTechIcon = (name: string): string => {
  const key = name.toLowerCase().replace(/[\s\.]/g, "");
  // Try to match exact key, or part of it? 
  // For 'React Native', key is 'reactnative', but we might just use 'react'.

  if (techIcons[key]) return techIcons[key];
  if (key.includes("react")) return techIcons.react;

  return techIcons.default;
};
