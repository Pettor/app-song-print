import { relative } from "node:path";
import type { Plugin } from "vite";
import { type SongDirPreset, loadSongsFromDir, songsDir } from "./songDir";
import songsExample from "./songs.example.json";

const VIRTUAL_ID = "virtual:songs";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

function loadExample(): SongDirPreset[] {
  return songsExample as SongDirPreset[];
}

async function buildModule(): Promise<string> {
  const dir = songsDir();
  if (dir) {
    const presets = await loadSongsFromDir(dir);
    if (presets.length) {
      return `export default ${JSON.stringify(presets)};\nexport const SONGS_SOURCE = "directory";\n`;
    }
    console.warn(
      `[song-print] SONGS_DIR is set to "${dir}" but no *.json files were found there — showing the example song instead.`
    );
  }
  return `export default ${JSON.stringify(loadExample())};\nexport const SONGS_SOURCE = "example";\n`;
}

/**
 * Provides the `virtual:songs` module the app imports its preset list from,
 * sourced from the `SONGS_DIR` env var (falling back to a bundled example),
 * and full-reloads the dev server when a `*.json` file changes there.
 */
export function songsDirPlugin(): Plugin {
  return {
    name: "song-print:songs-dir",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id === RESOLVED_ID) return buildModule();
    },
    configureServer(server) {
      const dir = songsDir();
      if (!dir) return;
      server.watcher.add(dir);
      server.watcher.on("all", (_event, path) => {
        const rel = relative(dir, path);
        if (rel.startsWith("..") || !path.toLowerCase().endsWith(".json")) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}
