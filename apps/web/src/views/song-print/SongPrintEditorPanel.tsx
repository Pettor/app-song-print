import type { KeyboardEvent, ReactElement } from "react";
import {
  ArrowDownOnSquareIcon,
  CodeBracketIcon,
  DocumentArrowDownIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import { Button, Link, TextArea, Tooltip } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";

export interface SongPrintEditorPanelProps {
  fileName: string | null;
  text: string;
  onTextChange: (text: string) => void;
  onTabKey: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  error: string | null;
  canImportTab: boolean;
  onImportTab: () => void;
  onOpenFile: () => void;
  onSaveFile: () => void;
  onDownloadFile: () => void;
  onFormat: () => void;
  canSave: boolean;
  saveTitle: string;
  saved: boolean;
  saveError: string | null;
}

export function SongPrintEditorPanel({
  fileName,
  text,
  onTextChange,
  onTabKey,
  error,
  canImportTab,
  onImportTab,
  onOpenFile,
  onSaveFile,
  onDownloadFile,
  onFormat,
  canSave,
  saveTitle,
  saved,
  saveError,
}: SongPrintEditorPanelProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-default-200 bg-content1 flex h-full min-w-0 flex-col border-r">
      <div className="border-default-200 flex h-11.5 flex-none items-center justify-between gap-2 border-b px-3.5">
        <div className="text-default-500 min-w-0 truncate text-xs font-semibold tracking-wider uppercase">
          {intl.formatMessage({
            description: "SongPrintEditorPanel: heading - editor title",
            defaultMessage: "Song JSON",
            id: "wCejB6",
          })}
          {fileName && <span className="text-default-400 ml-2 normal-case">{fileName}</span>}
        </div>
        <div className="flex flex-none gap-1">
          <Tooltip>
            <Button
              isIconOnly
              variant="tertiary"
              size="sm"
              onPress={onOpenFile}
              aria-label={intl.formatMessage({
                description: "SongPrintEditorPanel: aria-label - open file button",
                defaultMessage: "Open a song file",
                id: "ksDVh0",
              })}
            >
              <FolderOpenIcon className="size-4" />
            </Button>
            <Tooltip.Content>
              {intl.formatMessage({
                description: "SongPrintEditorPanel: tooltip - open file button",
                defaultMessage: "Open a song file",
                id: "TUwJI2",
              })}
            </Tooltip.Content>
          </Tooltip>

          <Tooltip>
            <Button
              isIconOnly
              variant={saved ? "primary" : saveError ? "danger" : "tertiary"}
              size="sm"
              onPress={onSaveFile}
              isDisabled={!!error || !canSave}
              aria-label={saveTitle}
            >
              <ArrowDownOnSquareIcon className="size-4" />
            </Button>
            <Tooltip.Content>{saveTitle}</Tooltip.Content>
          </Tooltip>

          <Tooltip>
            <Button
              isIconOnly
              variant="tertiary"
              size="sm"
              onPress={onDownloadFile}
              isDisabled={!!error}
              aria-label={intl.formatMessage({
                description: "SongPrintEditorPanel: aria-label - download a copy button",
                defaultMessage: "Download a copy",
                id: "LGB82Y",
              })}
            >
              <DocumentArrowDownIcon className="size-4" />
            </Button>
            <Tooltip.Content>
              {intl.formatMessage({
                description: "SongPrintEditorPanel: tooltip - download a copy button",
                defaultMessage: "Download a copy",
                id: "L3bZGk",
              })}
            </Tooltip.Content>
          </Tooltip>

          <Tooltip>
            <Button
              isIconOnly
              variant="tertiary"
              size="sm"
              onPress={onFormat}
              aria-label={intl.formatMessage({
                description: "SongPrintEditorPanel: aria-label - format JSON button",
                defaultMessage: "Format JSON",
                id: "FT1JeG",
              })}
            >
              <CodeBracketIcon className="size-4" />
            </Button>
            <Tooltip.Content>
              {intl.formatMessage({
                description: "SongPrintEditorPanel: tooltip - format JSON button",
                defaultMessage: "Format JSON",
                id: "+FG+Ih",
              })}
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <TextArea
          aria-label={intl.formatMessage({
            description: "SongPrintEditorPanel: aria-label - JSON editor textarea",
            defaultMessage: "Song JSON",
            id: "sbictA",
          })}
          value={text}
          spellCheck={false}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={onTabKey}
          fullWidth
          className="h-full resize-none rounded-none border-0 font-mono text-[12.7px] leading-relaxed"
        />
      </div>

      <div
        role="status"
        className="border-default-200 bg-default-100 flex h-9.5 flex-none items-center gap-2 border-t px-3.5"
      >
        <span
          aria-hidden="true"
          className={clsx(
            "size-1.5 flex-none rounded-full ring-3",
            error ? "bg-danger ring-danger/20" : "bg-success ring-success/20"
          )}
        />
        {/* The parser message is kept on the title: the status line stays short,
            but the detail is still there for anyone hunting a stray comma. */}
        <span className="text-default-500 min-w-0 truncate text-xs" title={error ?? undefined}>
          {error ? (
            canImportTab ? (
              <>
                {intl.formatMessage({
                  description: "SongPrintEditorPanel: status - pasted text looks like a chord tab",
                  defaultMessage: "That looks like a chord tab.",
                  id: "m6IInm",
                })}{" "}
                <Link onPress={onImportTab}>
                  {intl.formatMessage({
                    description: "SongPrintEditorPanel: action - convert pasted tab to JSON",
                    defaultMessage: "Convert to JSON",
                    id: "yDvPRy",
                  })}
                </Link>
              </>
            ) : (
              intl.formatMessage({
                description: "SongPrintEditorPanel: status - invalid JSON, the last good preview is kept",
                defaultMessage: "Invalid JSON · showing last valid preview",
                id: "DC7GMI",
              })
            )
          ) : (
            intl.formatMessage({
              description: "SongPrintEditorPanel: status - valid JSON, preview is current",
              defaultMessage: "Valid JSON · preview updated",
              id: "+K2AJ/",
            })
          )}
        </span>
      </div>
    </div>
  );
}
