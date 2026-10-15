import type { ReactElement, RefObject } from "react";
import { SongDoc } from "~/components/display/song-doc/SongDoc";
import type { ChordStyle } from "~/core/song-print/ChordStyle";
import type { KeyBasis } from "~/core/song-print/KeyBasis";
import type { Song } from "~/core/song-print/SongTypes";

export interface SongPrintExportStageProps {
  /** The song being photographed, or null when no export is running. */
  song: Song | null;
  /** Which library song is mounted, so the capture waits for the right one. */
  songId: string;
  chordStyle: ChordStyle;
  keyBasis: KeyBasis;
  containerRef: RefObject<HTMLDivElement | null>;
}

/**
 * Off-screen render target for exporting songs that are not the one on screen.
 *
 * Sheets have to be laid out by the browser before they can be captured —
 * `SongDoc` measures real rendered heights — so a catalog export mounts one
 * song at a time here, at natural page size and unzoomed, and photographs it.
 * Positioned off-screen rather than hidden: `visibility: hidden` would capture
 * blank pages.
 */
export function SongPrintExportStage({
  song,
  songId,
  chordStyle,
  keyBasis,
  containerRef,
}: SongPrintExportStageProps): ReactElement | null {
  if (!song) return null;

  return (
    <div
      ref={containerRef}
      data-song-id={songId}
      className="pointer-events-none fixed top-0 left-[-100000px]"
      aria-hidden
      inert
    >
      <SongDoc song={song} chordStyle={chordStyle} keyBasis={keyBasis} />
    </div>
  );
}
