import { readdir, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

/**
 * Minimal, untyped shape of a song file's contents. `@config/vite` stays
 * app-agnostic — it only needs enough structure to derive a label and pass
 * the rest through untouched. The consuming app validates the real shape
 * (Zod) once the data reaches the browser.
 */
export interface SongDirRawSong {
  title?: string;
  [key: string]: unknown;
}

export interface SongDirPreset {
  id: string;
  label: string;
  data: SongDirRawSong;
}

/** Resolves the `SONGS_DIR` env var to an absolute path, if set. */
export function songsDir(): string | null {
  const dir = process.env.SONGS_DIR;
  return dir ? resolve(process.cwd(), dir) : null;
}

function unwrap(raw: unknown, fallbackLabel: string): { label: string; song: SongDirRawSong } {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const obj = raw as Record<string, unknown>;
    if (typeof obj.data === "object" && obj.data !== null && !Array.isArray(obj.data)) {
      const song = obj.data as SongDirRawSong;
      const label =
        typeof obj.label === "string" && obj.label.trim() ? obj.label : (song.title?.trim() ?? fallbackLabel);
      return { label, song };
    }
  }
  const song = raw as SongDirRawSong;
  return { label: song?.title?.trim() || fallbackLabel, song };
}

/** Reads every `*.json` file directly inside `dir` as one song preset. */
export async function loadSongsFromDir(dir: string): Promise<SongDirPreset[]> {
  let names: string[];
  try {
    names = (await readdir(dir)).filter((n) => n.toLowerCase().endsWith(".json")).sort();
  } catch (e) {
    console.warn(`[song-print] could not read SONGS_DIR "${dir}": ${(e as Error).message}`);
    return [];
  }

  const presets: SongDirPreset[] = [];
  for (const name of names) {
    const id = name.slice(0, -".json".length);
    try {
      const raw = JSON.parse(await readFile(resolve(dir, name), "utf8"));
      const { label, song } = unwrap(raw, id);
      presets.push({ id, label, data: song });
    } catch (e) {
      console.warn(`[song-print] skipping "${name}" in SONGS_DIR: ${(e as Error).message}`);
    }
  }
  return presets;
}

function songPath(dir: string, id: string): string | null {
  if (!id || /[\\/]/.test(id) || id === "." || id === "..") return null;
  return resolve(dir, `${id}.json`);
}

/** Resolves `id` to an existing file path inside `dir`, or null if it doesn't exist. */
export async function songFilePath(dir: string, id: string): Promise<string | null> {
  const path = songPath(dir, id);
  if (!path) return null;
  try {
    await stat(path);
    return path;
  } catch {
    return null;
  }
}
