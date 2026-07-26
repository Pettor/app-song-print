import {
  createBaseConfig,
  createPWAConfig,
  createReactConfig,
  createSongLibraryConfig,
  mergeConfigs,
} from "@config/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig, loadEnv, mergeConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Seed SONGS_DIR from .env/.env.local without overriding a value already
  // set in the shell — songsDirPlugin/songWriterPlugin read it from process.env.
  const env = loadEnv(mode, process.cwd(), "SONGS_DIR");
  if (env.SONGS_DIR && !process.env.SONGS_DIR) process.env.SONGS_DIR = env.SONGS_DIR;

  const config = mergeConfigs([
    createBaseConfig(),
    createReactConfig({ enableReactCompiler: command === "build" }),
    createPWAConfig(),
    createSongLibraryConfig(),
    {
      plugins: [tanstackRouter({ routeToken: "route" })],
    },
    { resolve: { dedupe: ["react", "react-dom"] } },
  ]);

  switch (command) {
    case "build":
      return mergeConfig(config, {
        base: "./",
        build: {
          commonjsOptions: {
            exclude: ["@faker-js/faker"],
          },
        },
      });
    case "serve":
      return mergeConfig(config, {
        server: {
          cors: true,
          // basicSsl() below provides the self-signed cert; https: true signals intent
          https: true,
          port: 5235,
        },
        plugins: [basicSsl()],
      });
  }
});
