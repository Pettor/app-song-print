import type { ReactElement } from "react";
import { useState } from "react";
import {
  ComputerDesktopIcon,
  MoonIcon,
  PrinterIcon,
  SunIcon,
  ViewColumnsIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
} from "@heroui/react";
import { useIntl } from "react-intl";
import { SongPrintToolsMenu } from "./SongPrintToolsMenu";
import type { SongPrintToolsMenuProps } from "./SongPrintToolsMenu";
import { BrandMark } from "~/components/display/brand-mark/BrandMark";
import type { SheetMode } from "~/core/song-print/SheetMode";
import type { Preset } from "~/core/song-print/SongTypes";

export interface SongPrintToolbarProps {
  isSourceOpen: boolean;
  onToggleSource: () => void;
  columns: number;
  onColumnsChange: (columns: number) => void;
  isColumnsDisabled: boolean;
  songs: Preset[];
  selectedPresetId: string;
  onSelectPreset: (id: string) => void;
  mode: SheetMode;
  onModeChange: (mode: SheetMode) => void;
  tools: SongPrintToolsMenuProps;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onExportPdf: () => void;
  isExporting: boolean;
}

export function SongPrintToolbar({
  isSourceOpen,
  onToggleSource,
  columns,
  onColumnsChange,
  isColumnsDisabled,
  songs,
  selectedPresetId,
  onSelectPreset,
  mode,
  onModeChange,
  tools,
  isDarkTheme,
  onToggleTheme,
  onExportPdf,
  isExporting,
}: SongPrintToolbarProps): ReactElement {
  const intl = useIntl();
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const selectedSong = songs.find((s) => s.id === selectedPresetId);

  const sourceLabel = intl.formatMessage({
    description: "SongPrintToolbar: button - toggle the JSON source panel",
    defaultMessage: "Source",
    id: "sy3Oh/",
  });

  return (
    <Toolbar className="border-default-200 bg-content1/70 z-30 flex h-15 w-full flex-none items-center gap-3.5 overflow-x-auto border-b px-4 backdrop-blur-xl">
      <div className="border-default-200 flex h-8 flex-none items-center gap-2.5 border-r pr-3.5">
        <BrandMark className="text-accent size-6 flex-none" />
        <div className="flex flex-none flex-col leading-tight whitespace-nowrap">
          <span className="text-sm font-bold tracking-tight">
            {intl.formatMessage({
              description: "SongPrintToolbar: brand - app name",
              defaultMessage: "Song Print",
              id: "SinK0j",
            })}
          </span>
          <span className="text-default-500 text-[11px]">
            {intl.formatMessage({
              description: "SongPrintToolbar: brand - app subtitle",
              defaultMessage: "Chord sheets",
              id: "zMxmUs",
            })}
          </span>
        </div>
      </div>

      <Button
        variant={isSourceOpen ? "secondary" : "tertiary"}
        size="sm"
        className="flex-none"
        onPress={onToggleSource}
        aria-pressed={isSourceOpen}
      >
        <ViewColumnsIcon className="size-4" />
        {sourceLabel}
      </Button>

      <div className="flex min-w-38 flex-1 items-center gap-2">
        <span className="text-default-500 flex-none text-[11px] font-medium tracking-wider uppercase">
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

      <div className="flex flex-none items-center gap-2">
        <span className="text-default-500 text-[11px] font-medium tracking-wider uppercase">
          {intl.formatMessage({
            description: "SongPrintToolbar: label - column count group",
            defaultMessage: "Cols",
            id: "Howwdy",
          })}
        </span>
        <ToggleButtonGroup
          size="sm"
          isDisabled={isColumnsDisabled}
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[String(columns)]}
          onSelectionChange={(keys) => {
            const next = [...keys][0];
            if (next) onColumnsChange(Number(next));
          }}
          aria-label={intl.formatMessage({
            description: "SongPrintToolbar: aria-label - column count group",
            defaultMessage: "Column count",
            id: "n+TTBw",
          })}
        >
          {[1, 2, 3].map((n) => (
            <ToggleButton key={n} id={String(n)}>
              {n}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <ToggleButtonGroup
        size="sm"
        className="flex-none"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[mode]}
        onSelectionChange={(keys) => {
          const next = [...keys][0];
          if (next) onModeChange(next as SheetMode);
        }}
        aria-label={intl.formatMessage({
          description: "SongPrintToolbar: aria-label - print or live mode",
          defaultMessage: "Sheet mode",
          id: "Q+SGGU",
        })}
      >
        <ToggleButton id="print">
          <PrinterIcon className="size-4" />
          {intl.formatMessage({
            description: "SongPrintToolbar: tab - paper preview mode",
            defaultMessage: "Print",
            id: "q1TE5o",
          })}
        </ToggleButton>
        <ToggleButton id="live">
          <ComputerDesktopIcon className="size-4" />
          {intl.formatMessage({
            description: "SongPrintToolbar: tab - live performance mode",
            defaultMessage: "Live",
            id: "25M8Nf",
          })}
        </ToggleButton>
      </ToggleButtonGroup>

      {/* The Button is the trigger itself — wrapping it in Popover.Trigger
          would nest a button inside a role="button" div. */}
      <Popover isOpen={isToolsOpen} onOpenChange={setIsToolsOpen}>
        <Button variant="tertiary" size="sm" className="flex-none">
          <WrenchScrewdriverIcon className="size-4" />
          {intl.formatMessage({
            description: "SongPrintToolbar: button - open the tools menu",
            defaultMessage: "Tools",
            id: "L1ldPe",
          })}
        </Button>
        <Popover.Content placement="bottom end">
          <Popover.Dialog
            aria-label={intl.formatMessage({
              description: "SongPrintToolbar: aria-label - tools menu",
              defaultMessage: "Tools",
              id: "ocFBP8",
            })}
          >
            <SongPrintToolsMenu
              {...tools}
              // The menu gives way to the dialog it opens, rather than sitting
              // on top of it.
              onOpenTranspose={() => {
                setIsToolsOpen(false);
                tools.onOpenTranspose();
              }}
            />
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <Tooltip>
        <Button
          isIconOnly
          variant="tertiary"
          size="sm"
          className="flex-none"
          onPress={onToggleTheme}
          aria-label={intl.formatMessage({
            description: "SongPrintToolbar: aria-label - toggle light and dark theme",
            defaultMessage: "Toggle theme",
            id: "9nQXTW",
          })}
        >
          {isDarkTheme ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
        </Button>
        <Tooltip.Content>
          {intl.formatMessage({
            description: "SongPrintToolbar: tooltip - toggle light and dark theme",
            defaultMessage: "Toggle theme",
            id: "57F/hR",
          })}
        </Tooltip.Content>
      </Tooltip>

      <Button variant="primary" size="sm" className="flex-none" onPress={onExportPdf} isPending={isExporting}>
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
