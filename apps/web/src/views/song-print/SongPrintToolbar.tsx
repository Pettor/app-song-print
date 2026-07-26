import type { ReactElement } from "react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { Button, ListBox, ListBoxItem, Select, Toolbar } from "@heroui/react";
import { useIntl } from "react-intl";
import type { Preset } from "~/core/song-print/SongTypes";

export interface SongPrintToolbarProps {
  columns: number;
  onColumnsChange: (columns: number) => void;
  isColumnsDisabled: boolean;
  songs: Preset[];
  selectedPresetId: string;
  onSelectPreset: (id: string) => void;
  onExportPdf: () => void;
  isExporting: boolean;
}

export function SongPrintToolbar({
  columns,
  onColumnsChange,
  isColumnsDisabled,
  songs,
  selectedPresetId,
  onSelectPreset,
  onExportPdf,
  isExporting,
}: SongPrintToolbarProps): ReactElement {
  const intl = useIntl();
  const selectedSong = songs.find((s) => s.id === selectedPresetId);

  return (
    <Toolbar className="border-default-200 bg-content1 z-20 flex h-14 flex-none items-center gap-4 border-b px-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span>
          {intl.formatMessage({
            description: "SongPrintToolbar: brand - app name",
            defaultMessage: "Song Print",
            id: "SinK0j",
          })}
        </span>
        <span className="text-default-500 font-medium">
          {intl.formatMessage({
            description: "SongPrintToolbar: brand - app subtitle",
            defaultMessage: "Chord sheets",
            id: "zMxmUs",
          })}
        </span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <span className="text-default-500 text-xs font-semibold tracking-wide uppercase">
          {intl.formatMessage({
            description: "SongPrintToolbar: label - column count group",
            defaultMessage: "Columns",
            id: "D/nu4D",
          })}
        </span>
        <div
          role="group"
          aria-label={intl.formatMessage({
            description: "SongPrintToolbar: aria-label - column count group",
            defaultMessage: "Column count",
            id: "n+TTBw",
          })}
          className="flex gap-1"
        >
          {[1, 2, 3].map((n) => (
            <Button
              key={n}
              variant={columns === n ? "primary" : "tertiary"}
              size="sm"
              isDisabled={isColumnsDisabled}
              onPress={() => onColumnsChange(n)}
              aria-pressed={columns === n}
            >
              {n}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-default-500 text-xs font-semibold tracking-wide uppercase">
          {intl.formatMessage({
            description: "SongPrintToolbar: label - song picker",
            defaultMessage: "Song",
            id: "1UNbyO",
          })}
        </span>
        <Select
          selectedKey={selectedPresetId || null}
          onSelectionChange={(key) => onSelectPreset(key ? String(key) : "")}
          aria-label={intl.formatMessage({
            description: "SongPrintToolbar: aria-label - song picker",
            defaultMessage: "Song",
            id: "mElM/+",
          })}
          placeholder={intl.formatMessage({
            description: "SongPrintToolbar: placeholder - song picker when opened from a file",
            defaultMessage: "Opened from file",
            id: "b5buVd",
          })}
        >
          <Select.Trigger className="min-w-40">
            <Select.Value>{selectedSong?.label}</Select.Value>
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {songs.map((song) => (
                <ListBoxItem key={song.id} id={song.id} textValue={song.label}>
                  {song.label}
                </ListBoxItem>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <Button variant="primary" onPress={onExportPdf} isPending={isExporting}>
        <PrinterIcon className="size-4" />
        {isExporting
          ? intl.formatMessage({
              description: "SongPrintToolbar: button - export in progress",
              defaultMessage: "Exporting…",
              id: "7+YM9s",
            })
          : intl.formatMessage({
              description: "SongPrintToolbar: button - export PDF",
              defaultMessage: "Export PDF",
              id: "WUAe1K",
            })}
      </Button>
    </Toolbar>
  );
}
