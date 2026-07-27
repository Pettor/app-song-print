import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import type { SheetMode } from "~/core/song-print/SheetMode";
import { liveFontSizeAtom } from "~/core/song-print/SheetPrefsAtoms";

export interface UseSongLiveModeResult {
  mode: SheetMode;
  setMode: (mode: SheetMode) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  isScrolling: boolean;
  toggleScrolling: () => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

/** One pixel every 40ms — slow enough to read against, fast enough to follow. */
const SCROLL_INTERVAL_MS = 40;
const SCROLL_STEP_PX = 1;

/**
 * Owns live mode: whether the stage is up, how big its type is, and the
 * auto-scroll crawl.
 */
export function useSongLiveMode(): UseSongLiveModeResult {
  const [mode, setModeState] = useState<SheetMode>("print");
  // Persisted: the size that suits a given stand is a property of the room, not
  // of the song being played in it.
  const [fontSize, setFontSize] = useAtom(liveFontSizeAtom);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const setMode = useCallback((next: SheetMode) => {
    setModeState(next);
    // Leaving the stage stops the crawl, so coming back never starts mid-song.
    if (next !== "live") setIsScrolling(false);
  }, []);

  useEffect(() => {
    if (!isScrolling) return;
    const id = setInterval(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop += SCROLL_STEP_PX;
    }, SCROLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isScrolling]);

  // Escape leaves the stage — the overlay covers the whole window, so there is
  // no chrome to click your way out through.
  useEffect(() => {
    if (mode !== "live") return;
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") setMode("print");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, setMode]);

  const toggleScrolling = useCallback(() => setIsScrolling((s) => !s), []);

  return { mode, setMode, fontSize, setFontSize, isScrolling, toggleScrolling, scrollRef };
}
