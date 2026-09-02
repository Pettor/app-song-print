import type { ReactElement } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button, Separator, ToggleButton, ToggleButtonGroup } from "@heroui/react";
import { useIntl } from "react-intl";
import type { ChordStyle } from "~/core/song-print/ChordStyle";
import { CHORD_STYLES } from "~/core/song-print/ChordStyle";
import { SHEET_FONT_MAX, SHEET_FONT_MIN } from "~/core/song-print/PageFormats";
import type { PageFormat } from "~/core/song-print/SongTypes";

const FORMATS: PageFormat[] = ["A4", "A5", "Letter"];

export interface SongPrintToolsMenuProps {
  fontSize: number;
  /** Nudge the sheet font by `step` px, relative to whatever the song says now. */
  onFontSizeStep: (step: number) => void;
  format: PageFormat;
  onFormatChange: (format: PageFormat) => void;
  chordStyle: ChordStyle;
  onChordStyleChange: (chordStyle: ChordStyle) => void;
  onOpenTranspose: () => void;
  /** Page settings are written back into the JSON, so a broken document locks them. */
  isDisabled: boolean;
}

export function SongPrintToolsMenu({
  fontSize,
  onFontSizeStep,
  format,
  onFormatChange,
  chordStyle,
  onChordStyleChange,
  onOpenTranspose,
  isDisabled,
}: SongPrintToolsMenuProps): ReactElement {
  const intl = useIntl();

  function chordStyleLabel(style: ChordStyle): string {
    switch (style) {
      case "chip":
        return intl.formatMessage({
          description: "SongPrintToolsMenu: option - chords drawn as filled chips",
          defaultMessage: "Chip",
          id: "TC8L7Y",
        });
      case "accent":
        return intl.formatMessage({
          description: "SongPrintToolsMenu: option - chords drawn as coloured text",
          defaultMessage: "Color",
          id: "+7gMh2",
        });
      case "plain":
        return intl.formatMessage({
          description: "SongPrintToolsMenu: option - chords drawn as plain text",
          defaultMessage: "Plain",
          id: "dSsLOm",
        });
    }
  }

  return (
    <div className="flex w-72 flex-col gap-3.5 p-1">
      <Button variant="tertiary" className="h-auto justify-start gap-2.5 py-2.5" onPress={onOpenTranspose}>
        <span className="from-accent flex size-7 flex-none items-center justify-center rounded-md bg-linear-to-br to-indigo-600 text-xs font-bold text-white">
          ♯
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-sm font-medium">
            {intl.formatMessage({
              description: "SongPrintToolsMenu: action - open the transpose dialog",
              defaultMessage: "Transpose sheet",
              id: "6LYY1+",
            })}
          </span>
          <span className="text-default-500 text-xs font-normal">
            {intl.formatMessage({
              description: "SongPrintToolsMenu: description - what transposing does",
              defaultMessage: "Rewrite chords and save",
              id: "sGu7lT",
            })}
          </span>
        </span>
      </Button>

      <Separator />

      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">
          {intl.formatMessage({
            description: "SongPrintToolsMenu: label - sheet font size",
            defaultMessage: "Font size",
            id: "FEc6L8",
          })}
        </span>
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            size="sm"
            variant="tertiary"
            isDisabled={isDisabled || fontSize <= SHEET_FONT_MIN}
            onPress={() => onFontSizeStep(-1)}
            aria-label={intl.formatMessage({
              description: "SongPrintToolsMenu: aria-label - decrease font size",
              defaultMessage: "Decrease font size",
              id: "KL8E0I",
            })}
          >
            <MinusIcon className="size-4" />
          </Button>
          <span className="text-default-500 min-w-9 text-center font-mono text-xs">{fontSize}px</span>
          <Button
            isIconOnly
            size="sm"
            variant="tertiary"
            isDisabled={isDisabled || fontSize >= SHEET_FONT_MAX}
            onPress={() => onFontSizeStep(1)}
            aria-label={intl.formatMessage({
              description: "SongPrintToolsMenu: aria-label - increase font size",
              defaultMessage: "Increase font size",
              id: "cSwd19",
            })}
          >
            <PlusIcon className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">
          {intl.formatMessage({
            description: "SongPrintToolsMenu: label - page format",
            defaultMessage: "Page",
            id: "Rkp737",
          })}
        </span>
        <ToggleButtonGroup
          size="sm"
          isDisabled={isDisabled}
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[format]}
          onSelectionChange={(keys) => {
            const next = [...keys][0];
            if (next) onFormatChange(next as PageFormat);
          }}
          aria-label={intl.formatMessage({
            description: "SongPrintToolsMenu: aria-label - page format group",
            defaultMessage: "Page format",
            id: "3HFQmT",
          })}
        >
          {FORMATS.map((f) => (
            <ToggleButton key={f} id={f}>
              {f}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">
          {intl.formatMessage({
            description: "SongPrintToolsMenu: label - chord style",
            defaultMessage: "Chord style",
            id: "+0wxuU",
          })}
        </span>
        <ToggleButtonGroup
          size="sm"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[chordStyle]}
          onSelectionChange={(keys) => {
            const next = [...keys][0];
            if (next) onChordStyleChange(next as ChordStyle);
          }}
          aria-label={intl.formatMessage({
            description: "SongPrintToolsMenu: aria-label - chord style group",
            defaultMessage: "Chord style",
            id: "CDRguH",
          })}
        >
          {CHORD_STYLES.map((style) => (
            <ToggleButton key={style} id={style}>
              {chordStyleLabel(style)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
