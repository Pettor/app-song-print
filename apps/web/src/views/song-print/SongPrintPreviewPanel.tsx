import type { CSSProperties, ReactElement, RefObject } from "react";
import { SongDoc } from "~/components/display/song-doc/SongDoc";
import type { Song } from "~/core/song-print/SongTypes";

export interface SongPrintPreviewPanelProps {
  song: Song;
  scale: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function SongPrintPreviewPanel({ song, scale, containerRef }: SongPrintPreviewPanelProps): ReactElement {
  return (
    <div ref={containerRef} className="bg-default-100 flex min-w-0 flex-1 justify-center overflow-auto">
      <div className="px-10 py-10 pb-16">
        <div className="sp-scalewrap" style={{ zoom: scale } as CSSProperties}>
          <SongDoc song={song} />
        </div>
      </div>
    </div>
  );
}
