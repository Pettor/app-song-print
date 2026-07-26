import type { UserConfig } from "vite";
import { songsDirPlugin } from "./songsDirPlugin";
import { songWriterPlugin } from "./songWriterPlugin";

/**
 * Wires up the `virtual:songs` module and the `/__save-song` dev endpoint,
 * both driven by the `SONGS_DIR` env var. See `songsDirPlugin` and
 * `songWriterPlugin` for the individual behaviors.
 */
export function createSongLibraryConfig(): UserConfig {
  return {
    plugins: [songsDirPlugin(), songWriterPlugin()],
  } satisfies UserConfig;
}
