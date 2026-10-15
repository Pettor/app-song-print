#!/usr/bin/env node
// Generates PWA icon assets from packages/ui/src/Branding/assets/song-print-512x512.svg
// (favicons, PWA icons) and song-print-full-512x512.svg (maskable icon, Apple touch icon).
// Run from any app directory that has pwa-assets.config.ts and pwa-assets.full-bleed.config.ts.
// The @vite-pwa/assets-generator always outputs next to the source image, so this
// script moves the generated files to the app's public directory afterwards.
//
// Usage: generate-assets [public-dir]   (default: public)
import { execSync } from "node:child_process";
import { copyFileSync, renameSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const assetsDir = resolve(dirname(fileURLToPath(import.meta.url)), "../src/Branding/assets");
const publicDir = resolve(process.cwd(), process.argv[2] ?? "public");

execSync("pwa-assets-generator", { cwd: process.cwd(), stdio: "inherit" });
execSync("pwa-assets-generator -c pwa-assets.full-bleed.config.ts", { cwd: process.cwd(), stdio: "inherit" });

for (const [from, to = from] of [
  ["pwa-192x192.png"],
  ["pwa-512x512.png"],
  ["maskable-icon-512x512.png"],
  ["favicon.ico"],
  ["favicon-16x16.png"],
  ["favicon-32x32.png"],
  ["apple-touch-icon-180x180.png", "apple-touch-icon.png"],
]) {
  renameSync(resolve(assetsDir, from), resolve(publicDir, to));
}

copyFileSync(resolve(assetsDir, "song-print-512x512.svg"), resolve(publicDir, "favicon.svg"));
