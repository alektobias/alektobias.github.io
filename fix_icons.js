
const fs = require('fs');

// Helpers for clean SVGs
const createSvg = (path, viewBox = "0 0 24 24", fill = "currentColor") =>
  `<svg role="img" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" fill="${fill}"><path d="${path}"/></svg>`;

// Mappings of Name -> SVG Content (Manual or Simple Icons path)
const icons = {
  // 1. Shadcn/UI (Diagonal lines) 
  // Official: https://github.com/shadcn-ui/ui/blob/main/apps/www/public/logo.svg
  // It's basically a polygon.
  "shadcnui": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="h-6 w-6"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>`,

  // 2. tRPC (Blue cube/text)
  // Simple Icons doesn't have tRPC? 
  // Official: https://trpc.io/img/logo-no-text.svg (blue)

  // 3. LangChain (Chain/Parrot)
  // Simple Icons: "LangChain"
  // Path source: Simple Icons
  "langchain": createSvg("M12.001 1.096a.91.91 0 0 0-.256.038l-7.794 2.227a.91.91 0 0 0-.66.873v14.475a.91.91 0 0 0 .66.874l7.086 2.024a.97.97 0 0 0 .53-.002l7.085-2.025a.91.91 0 0 0 .66-.873V4.288a.91.91 0 0 0-.66-.874L12.001 1.096zm.256 2.15l6.308 1.802v5.895l-7.075-2.021a.973.973 0 0 0-.53.003L4.777 10.74V4.99l6.308-1.802.917.261.255-.205zm-6.205 7.155l3.529 1.008-3.045.87-2.731-5.75c.677 1.487 1.425 2.766 2.247 3.872zm4.35 1.243v7.92L4.777 17.54v-5.267l5.625 1.607zm1.196.002l5.624-1.607v5.267l-5.624 1.606v-5.266zm1.109-1.258l3.53-1.009c.821-1.106 1.57-2.384 2.247-3.871l-2.732 5.75-3.045-.87z", "0 0 24 24", "#FFFFFF"), // Force white for dark mode

  // 4. OpenAI (Spiral)
  // Simple Icons: "OpenAI"
  // Path source: Simple Icons
  "openai": createSvg("M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.0462 6.0462 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a1.558 1.558 0 0 1 .6947 1.3493v4.5106a4.46 4.46 0 0 1-5.1512 4.2691zm9.409-2.791a1.0245 1.0245 0 0 1-.2908.6811 4.4745 4.4745 0 0 1-5.0116.5361l-.0926-.067.0926-.067 4.7783-2.7582a.7945.7945 0 0 0 .3931-.6813v-6.7369l2.02-1.1689a1.54 1.54 0 0 1 1.8792.2038 4.4444 4.4444 0 0 1-3.7682 10.0583zm-14.7358-8.239a4.4444 4.4444 0 0 1-4.1342 3.4402A4.4444 4.4444 0 0 1 1.7644 11.2a1.558 1.558 0 0 1 .6947-1.349V5.3404a4.475 4.475 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.795.795 0 0 0-.3927.6813v6.7369l-2.02-1.1687a1.539 1.539 0 0 1-.6947-1.3493v-4.5103a4.4605 4.4605 0 0 1 5.9262-1.3703zm-2.8669 13.9786a4.46 4.46 0 0 1-3.7681-10.0631 1.025 1.025 0 0 1 .286-.6811 4.4745 4.4745 0 0 1 5.0116-.5361l.0926.067-.0926.067-4.7783 2.7582a.7948.7948 0 0 0-.3931.6813v6.7369l-2.02 1.1689a1.54 1.54 0 0 1-1.8792-.2041 4.4444 4.4444 0 0 1 7.5411-2.9961zM12 8.448l4.0675 2.348v4.696L12 17.84l-4.0675-2.348v-4.696z", "0 0 24 24", "#FFFFFF"), // Force white

  // 5. Claude (Anthropic)
  // Simple Icons: "Anthropic"
  // Path source: Simple Icons
  "claude": createSvg("M16.48 24h-8.96C3.36 24 0 20.64 0 16.48V7.52C0 3.36 3.36 0 7.52 0h8.96C20.64 0 24 3.36 24 7.52v8.96C24 20.64 20.64 24 16.48 24zM7.52 2.88c-2.56 0-4.64 2.08-4.64 4.64v8.96c0 2.56 2.08 4.64 4.64 4.64h8.96c2.56 0 4.64-2.08 4.64-4.64V7.52c0-2.56-2.08-4.64-4.64-4.64H7.52zM12 5.76c3.44 0 6.24 2.8 6.24 6.24s-2.8 6.24-6.24 6.24-6.24-2.8-6.24-6.24 2.8-6.24 6.24-6.24z", "0 0 24 24", "#D97757"), // Anthropic color or white? User likes full color "on full colors". Anthropic is brownish/orange.

  // 6. Gemini (Google Gemini)
  // Path source: Simple Icons "Google Gemini" or similar. 
  // Custom path for Gemini star/sparkle.
  "gemini": createSvg("M12.96 1.62c-.64.57-1.12 1.25-1.42 2.01-.29.76-.44 1.56-.44 2.39 0 2.08-1.55 3.79-3.56 4.09l-.44.06v.88l.44.06c2.01.3 3.56 2.01 3.56 4.09 0 .83.15 1.63.44 2.39.29.76.78 1.44 1.42 2.01.64.57 1.37.98 2.16 1.22.79.24 1.62.36 2.47.36.85 0 1.68-.12 2.47-.36.79-.24 1.52-.65 2.16-1.22.64-.57 1.12-1.25 1.42-2.01.29-.76.44-1.56.44-2.39 0-2.08-1.55-3.79-3.56-4.09l-.44-.06v-.88l.44-.06c2.01-.3 3.56-2.01 3.56-4.09 0-.83-.15-1.63-.44-2.39-.29-.76-.78-1.44-1.42-2.01-.64-.57-1.37-.98-2.16-1.22-.79-.24-1.62-.36-2.47-.36-.85 0-1.68.12-2.47.36-.79.24-1.52.65-2.16 1.22Z", "0 0 24 24", "#8E75B2")
};

for (const [name, content] of Object.entries(icons)) {
  fs.writeFileSync(`public/icons/${name}.svg`, content);
}
console.log("Icons generated.");
