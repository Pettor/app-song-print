/**
 * File picking and saving.
 *
 * Where the File System Access API is available (Chrome, Edge) an opened file
 * keeps its handle, so Save writes straight back to the file on disk. Safari
 * and Firefox have no such API, so they fall back to a plain download and the
 * handle stays null — every caller has to cope with that.
 */

interface FilePickerOptions {
  types?: { description?: string; accept: Record<string, string[]> }[];
  suggestedName?: string;
}

declare global {
  interface Window {
    showOpenFilePicker?: (o?: FilePickerOptions & { multiple?: boolean }) => Promise<FileSystemFileHandle[]>;
    showSaveFilePicker?: (o?: FilePickerOptions) => Promise<FileSystemFileHandle>;
  }
}

const JSON_TYPES: FilePickerOptions["types"] = [
  { description: "Song JSON", accept: { "application/json": [".json"] } },
];

export interface OpenedFile {
  name: string;
  text: string;
  /** Null when the browser has no File System Access API, or on a legacy pick. */
  handle: FileSystemFileHandle | null;
}

/**
 * Open a .json file via a picker. Resolves with the raw text, or null if the
 * user cancels.
 */
export async function openSongFile(): Promise<OpenedFile | null> {
  if (window.showOpenFilePicker) {
    try {
      const [handle] = await window.showOpenFilePicker({ types: JSON_TYPES, multiple: false });
      if (!handle) return null;
      const file = await handle.getFile();
      return { name: file.name, text: await file.text(), handle };
    } catch {
      // AbortError on cancel, but also a SecurityError when the picker is not
      // allowed in this context — the input fallback below covers the latter.
      return null;
    }
  }
  return openViaInput();
}

function openViaInput(): Promise<OpenedFile | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.style.display = "none";

    function cleanup(): void {
      input.remove();
    }

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        cleanup();
        resolve(null);
        return;
      }
      try {
        const text = await file.text();
        resolve({ name: file.name, text, handle: null });
      } catch {
        resolve(null);
      } finally {
        cleanup();
      }
    };

    // Fires on cancel in browsers that support it; harmless elsewhere.
    input.oncancel = () => {
      cleanup();
      resolve(null);
    };

    document.body.appendChild(input);
    input.click();
  });
}

/** Write the editor text back to an already-opened file. */
export async function writeSongFile(handle: FileSystemFileHandle, text: string): Promise<void> {
  const stream = await handle.createWritable();
  try {
    await stream.write(text);
  } finally {
    await stream.close();
  }
}

/**
 * Ask for a location and write there, returning the handle so later saves can
 * go in place. Falls back to a download, which yields no handle.
 */
export async function saveSongFileAs(text: string, filename: string): Promise<FileSystemFileHandle | null> {
  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({ types: JSON_TYPES, suggestedName: filename });
      await writeSongFile(handle, text);
      return handle;
    } catch {
      return null; // cancelled
    }
  }
  downloadSong(text, filename);
  return null;
}

/** Save the current editor text to disk as a download. */
export function downloadSong(text: string, filename: string): void {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".json") ? filename : `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke on the next tick so the download has begun.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

/**
 * Overwrite a preset in SONGS_DIR through the dev server. Only possible
 * under `pnpm dev` — a built app has no server to write with.
 */
export async function savePreset(id: string, data: unknown): Promise<void> {
  const res = await fetch("/__save-song", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id, data }),
  });
  if (!res.ok) throw new Error((await res.text()) || `save failed (${res.status})`);
}

/** Turn a song title into a safe filename stem. */
export function toFilename(title: string | undefined): string {
  const stem = (title ?? "song")
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
  return (stem || "song") + ".json";
}
