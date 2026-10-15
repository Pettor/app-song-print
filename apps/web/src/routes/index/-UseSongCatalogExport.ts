import type { RefObject } from "react";
import { useCallback, useRef, useState } from "react";
import { createPdfDocument, sheetPages } from "~/core/song-print/ExportSongPdf";
import type { Preset, Song } from "~/core/song-print/SongTypes";

/** Filename of the whole-catalog export. */
const CATALOG_FILENAME = "songs.pdf";

/** How long to wait for one sheet to lay itself out before moving on. */
const SETTLE_TIMEOUT_MS = 4000;

interface Stage {
  id: string;
  song: Song;
}

export interface UseSongCatalogExportResult {
  /** The song mounted off-screen for capture, or null between exports. */
  stageSong: Song | null;
  stageSongId: string;
  stageRef: RefObject<HTMLDivElement | null>;
  isExporting: boolean;
  /** Songs captured so far, for the button's progress label. */
  exported: number;
  exportAll: () => Promise<void>;
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

/**
 * Export every song in the catalog as one PDF.
 *
 * Songs are drawn one at a time on an off-screen stage and captured in turn,
 * so a long setlist neither mounts dozens of sheets at once nor disturbs the
 * preview the user is looking at.
 */
export function useSongCatalogExport(songs: Preset[]): UseSongCatalogExportResult {
  const [stage, setStage] = useState<Stage | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // A sheet is only worth photographing once it has measured itself — before
  // that the drawn pages are the unpacked fallback. Both checks matter: the
  // id says the stage is showing the song we asked for, `data-measured` that
  // it has finished packing it into pages.
  const waitForSheet = useCallback(async (id: string): Promise<void> => {
    const deadline = Date.now() + SETTLE_TIMEOUT_MS;
    while (Date.now() < deadline) {
      const root = stageRef.current;
      if (root?.dataset.songId === id && root.querySelector(".sp-doc[data-measured]")) return;
      await nextFrame();
    }
  }, []);

  const exportAll = useCallback(async () => {
    if (songs.length === 0 || isExporting) return;

    setIsExporting(true);
    setExported(0);
    try {
      // Chord sheets are measured in a webfont; capturing before it lands
      // would photograph the fallback metrics.
      await document.fonts?.ready;

      const pdf = createPdfDocument();
      for (const preset of songs) {
        setStage({ id: preset.id, song: preset.data });
        await waitForSheet(preset.id);
        await pdf.add(sheetPages(stageRef.current), preset.data.page);
        setExported((n) => n + 1);
      }

      if (!pdf.isEmpty()) pdf.save(CATALOG_FILENAME);
    } finally {
      setStage(null);
      setIsExporting(false);
    }
  }, [songs, isExporting, waitForSheet]);

  return {
    stageSong: stage?.song ?? null,
    stageSongId: stage?.id ?? "",
    stageRef,
    isExporting,
    exported,
    exportAll,
  };
}
