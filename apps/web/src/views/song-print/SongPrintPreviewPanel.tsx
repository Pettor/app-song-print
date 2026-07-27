import type { CSSProperties, ReactElement, RefObject } from "react";
import { useIntl } from "react-intl";
import { SongDoc } from "~/components/display/song-doc/SongDoc";
import type { Song } from "~/core/song-print/SongTypes";

export interface SongPrintPreviewPanelProps {
  song: Song;
  scale: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function SongPrintPreviewPanel({ song, scale, containerRef }: SongPrintPreviewPanelProps): ReactElement {
  const intl = useIntl();

  return (
    <div
      ref={containerRef}
      className="bg-default-100 flex min-w-0 flex-1 justify-center overflow-auto"
      tabIndex={0}
      role="region"
      aria-label={intl.formatMessage({
        description: "SongPrintPreviewPanel: aria-label - scrollable chord sheet preview region",
        defaultMessage: "Chord sheet preview",
        id: "tcf+dQ",
      })}
    >
      <div className="px-10 py-10 pb-16">
        <div className="sp-scalewrap" style={{ zoom: scale } as CSSProperties}>
          <SongDoc song={song} />
        </div>
      </div>
    </div>
  );
}
