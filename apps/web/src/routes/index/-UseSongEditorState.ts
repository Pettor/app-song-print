import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { SongSchema } from "~/core/song-print/SongTypes";
import type { PageSpec, Song } from "~/core/song-print/SongTypes";

export interface UseSongEditorStateOptions {
  initialText: string;
}

export interface UseSongEditorStateResult {
  text: string;
  setText: (text: string) => void;
  song: Song;
  error: string | null;
  format: () => void;
  setPage: (patch: Partial<PageSpec> | ((page: PageSpec) => Partial<PageSpec>)) => void;
  setSong: (song: Song) => void;
  onTabKey: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

function parseOrEmpty(text: string): Song {
  try {
    const result = SongSchema.safeParse(JSON.parse(text));
    return result.success ? result.data : {};
  } catch {
    return {};
  }
}

/**
 * Owns the raw JSON text, its debounced parsed+validated Song, and the parse
 * error. On invalid JSON/schema the last valid `song` is kept — the preview
 * must never blank out mid-edit.
 */
export function useSongEditorState({ initialText }: UseSongEditorStateOptions): UseSongEditorStateResult {
  const [text, setText] = useState(initialText);
  const [song, setSong] = useState<Song>(() => parseOrEmpty(initialText));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = setTimeout(() => {
      try {
        const parsed: unknown = JSON.parse(text);
        const result = SongSchema.safeParse(parsed);
        if (cancelled) return;
        if (result.success) {
          setSong(result.data);
          setError(null);
        } else {
          setError(result.error.issues[0]?.message ?? "Invalid song data");
        }
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      }
    }, 180);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [text]);

  const format = useCallback(() => {
    try {
      setText(JSON.stringify(JSON.parse(text), null, 2));
    } catch {
      /* leave invalid JSON untouched */
    }
  }, [text]);

  // Toolbar and tool-menu edits write back into the JSON text, keeping it the
  // single source of truth. Reformats the document as a side effect, same as
  // format().
  // The patch may be a function of the page as it stands in the text right
  // now, not of the debounced `song` — otherwise two quick presses of the same
  // stepper both compute from the same stale value and one is lost.
  const setPage = useCallback(
    (patch: Partial<PageSpec> | ((page: PageSpec) => Partial<PageSpec>)) => {
      try {
        const parsed = JSON.parse(text) as Song;
        const current = parsed.page ?? {};
        parsed.page = { ...current, ...(typeof patch === "function" ? patch(current) : patch) };
        setText(JSON.stringify(parsed, null, 2));
      } catch {
        /* invalid JSON — the controls are disabled, so this should not happen */
      }
    },
    [text]
  );

  /** Replace the whole document, e.g. after transposing it into a new key. */
  const replaceSong = useCallback((next: Song) => {
    setText(JSON.stringify(next, null, 2));
  }, []);

  const onTabKey = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const ta = e.currentTarget;
    const s = ta.selectionStart;
    const en = ta.selectionEnd;
    const v = ta.value;
    setText(v.slice(0, s) + "  " + v.slice(en));
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = s + 2;
    });
  }, []);

  return { text, setText, song, error, format, setPage, setSong: replaceSong, onTabKey };
}
