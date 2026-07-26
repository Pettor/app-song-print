import { useCallback, useState } from "react";
import { exportToPdf } from "~/core/song-print/ExportSongPdf";
import { toFilename } from "~/core/song-print/SongFileIo";
import type { Song } from "~/core/song-print/SongTypes";

export interface UseSongPdfExportResult {
  isExporting: boolean;
  exportPdf: () => Promise<void>;
}

export function useSongPdfExport(song: Song): UseSongPdfExportResult {
  const [isExporting, setIsExporting] = useState(false);

  const exportPdf = useCallback(async () => {
    setIsExporting(true);
    try {
      await exportToPdf(toFilename(song.title).replace(/\.json$/, ".pdf"), song.page);
    } finally {
      setIsExporting(false);
    }
  }, [song]);

  return { isExporting, exportPdf };
}
