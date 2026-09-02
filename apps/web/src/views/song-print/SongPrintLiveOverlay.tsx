import type { ReactElement, RefObject } from "react";
import { ArrowDownIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { SongStage } from "~/components/display/song-stage/SongStage";
import { effectiveKey } from "~/core/song-print/SongTranspose";
import type { Song } from "~/core/song-print/SongTypes";

export interface SongPrintLiveOverlayProps {
  song: Song;
  columns: number;
  fontSize: number;
  onFontSizeChange: (fontSize: number) => void;
  isScrolling: boolean;
  onToggleScroll: () => void;
  onExit: () => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

const MIN_FONT = 18;
const MAX_FONT = 64;

/** Buttons sit on the stage's own black, not the app theme's surface. */
const STAGE_BUTTON = "flex-none border border-white/15 bg-white/5 text-neutral-100 hover:bg-white/10";

/**
 * Full-screen performance view. Takes over the window so nothing but the song
 * is on screen, and scrolls itself at a steady crawl when asked to.
 */
export function SongPrintLiveOverlay({
  song,
  columns,
  fontSize,
  onFontSizeChange,
  isScrolling,
  onToggleScroll,
  onExit,
  scrollRef,
}: SongPrintLiveOverlayProps): ReactElement {
  const intl = useIntl();

  const meta = [
    intl.formatMessage(
      {
        description: "SongPrintLiveOverlay: meta - musical key",
        defaultMessage: "Key {key}",
        id: "/Izuum",
      },
      { key: effectiveKey(song) }
    ),
  ];
  if (song.tempo) {
    meta.push(
      intl.formatMessage(
        {
          description: "SongPrintLiveOverlay: meta - tempo in beats per minute",
          defaultMessage: "{tempo} bpm",
          id: "2Gm4bj",
        },
        { tempo: song.tempo }
      )
    );
  }
  if (song.capo) {
    meta.push(
      intl.formatMessage(
        {
          description: "SongPrintLiveOverlay: meta - capo fret",
          defaultMessage: "Capo {capo}",
          id: "12Kt0Y",
        },
        { capo: song.capo }
      )
    );
  }

  return (
    <div className="fixed inset-0 z-70 flex flex-col bg-[#07080a] text-neutral-100">
      <div className="flex flex-none items-center gap-3.5 border-b border-white/10 px-5 py-3.5">
        <Button variant="tertiary" className={STAGE_BUTTON} onPress={onExit}>
          <ArrowLeftIcon className="size-4" />
          {intl.formatMessage({
            description: "SongPrintLiveOverlay: button - leave live mode",
            defaultMessage: "Exit",
            id: "1vPXS+",
          })}
        </Button>

        <div className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate text-lg font-semibold">
            {song.title ??
              intl.formatMessage({
                description: "SongPrintLiveOverlay: title - fallback for a song with no title",
                defaultMessage: "Untitled",
                id: "CkjVLB",
              })}
          </span>
          <span className="truncate text-xs text-white/50">{meta.join(" · ")}</span>
        </div>

        <Button
          isIconOnly
          variant="tertiary"
          className={STAGE_BUTTON}
          isDisabled={fontSize <= MIN_FONT}
          onPress={() => onFontSizeChange(fontSize - 2)}
          aria-label={intl.formatMessage({
            description: "SongPrintLiveOverlay: aria-label - smaller lyrics",
            defaultMessage: "Smaller text",
            id: "cHFPnQ",
          })}
        >
          A−
        </Button>
        <Button
          isIconOnly
          variant="tertiary"
          className={STAGE_BUTTON}
          isDisabled={fontSize >= MAX_FONT}
          onPress={() => onFontSizeChange(fontSize + 2)}
          aria-label={intl.formatMessage({
            description: "SongPrintLiveOverlay: aria-label - larger lyrics",
            defaultMessage: "Larger text",
            id: "lC0nfJ",
          })}
        >
          A+
        </Button>

        <Button
          variant="tertiary"
          className={clsx(
            "flex-none",
            isScrolling ? "bg-accent text-accent-foreground hover:bg-accent/90 border border-transparent" : STAGE_BUTTON
          )}
          onPress={onToggleScroll}
          aria-pressed={isScrolling}
        >
          <ArrowDownIcon className="size-4" />
          {isScrolling
            ? intl.formatMessage({
                description: "SongPrintLiveOverlay: button - auto-scroll is running",
                defaultMessage: "Scrolling",
                id: "ieTcPq",
              })
            : intl.formatMessage({
                description: "SongPrintLiveOverlay: button - start auto-scroll",
                defaultMessage: "Auto-scroll",
                id: "w0iO2R",
              })}
        </Button>
      </div>

      <div
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label={intl.formatMessage({
          description: "SongPrintLiveOverlay: aria-label - scrollable song region",
          defaultMessage: "Song",
          id: "gUCAqw",
        })}
        className="flex-1 overflow-auto px-11 pt-8 pb-[60vh]"
      >
        <SongStage song={song} fontSize={fontSize} columns={columns} />
      </div>
    </div>
  );
}
