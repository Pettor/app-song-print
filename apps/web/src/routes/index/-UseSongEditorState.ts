import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { SongSchema } from "~/core/song-print/SongTypes";
import type { Song } from "~/core/song-print/SongTypes";

export interface UseSongEditorStateOptions {
  initialText: string;
}

export interface UseSongEditorStateResult {
  text: string;
  setText: (text: string) => void;
  song: Song;
  error: string | null;
  format: () => void;
  setColumns: (columns: number) => void;
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

  // Toolbar edits write back into the JSON text, keeping it the single source
  // of truth. Reformats the document as a side effect, same as format().
  const setColumns = useCallback(
    (n: number) => {
      try {
        const parsed = JSON.parse(text) as Song;
        parsed.page = { ...parsed.page, columns: n };
        setText(JSON.stringify(parsed, null, 2));
      } catch {
        /* invalid JSON — the control is disabled, so this should not happen */
      }
    },
    [text]
  );

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

  return { text, setText, song, error, format, setColumns, onTabKey };
}
