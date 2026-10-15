import { defineConfig } from "@vite-pwa/assets-generator/config";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
// Resolve the package root of @package/ui (main entry is src/index.ts, one level up → package root)
const uiRoot = resolve(dirname(require.resolve("@package/ui")), "..");
// Full-bleed variant: the OS applies its own mask, so the artwork already sits inside the safe zone
const svgPath = resolve(uiRoot, "src/Branding/assets/song-print-full-512x512.svg");

export default defineConfig({
  preset: {
    transparent: {
      sizes: [],
      favicons: [],
    },
    maskable: {
      sizes: [512],
      padding: 0,
    },
    apple: {
      sizes: [180],
      padding: 0,
    },
  },
  images: [svgPath],
});
