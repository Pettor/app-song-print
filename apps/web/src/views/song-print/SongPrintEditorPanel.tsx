import type { KeyboardEvent, ReactElement } from "react";
import {
  ArrowDownOnSquareIcon,
  CodeBracketIcon,
  DocumentArrowDownIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import { Alert, Button, Link, TextArea, Tooltip } from "@heroui/react";
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
      <div className="border-default-200 flex items-center justify-between border-b px-4 py-2.5">
        <div className="text-xs font-semibold">
          {intl.formatMessage({
            description: "SongPrintEditorPanel: heading - editor title",
            defaultMessage: "Song",
            id: "FawyI+",
          })}{" "}
          <span className="text-default-500 font-medium">
            {fileName ??
              intl.formatMessage({
                description: "SongPrintEditorPanel: heading - fallback filename when editing raw JSON",
                defaultMessage: "JSON",
                id: "vLCHlD",
              })}
          </span>
        </div>
        <div className="flex gap-1.5">
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

      <Alert status={error ? "danger" : "success"} className="border-default-200 flex-none border-t px-4 py-2.5">
        <Alert.Content>
          <Alert.Description className="text-xs font-medium">
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
                intl.formatMessage(
                  {
                    description: "SongPrintEditorPanel: status - invalid JSON with parser error message",
                    defaultMessage: "Invalid JSON: {error}",
                    id: "TrZihd",
                  },
                  { error }
                )
              )
            ) : (
              intl.formatMessage({
                description: "SongPrintEditorPanel: status - valid JSON, preview is current",
                defaultMessage: "Valid JSON · preview updated",
                id: "+K2AJ/",
              })
            )}
          </Alert.Description>
        </Alert.Content>
      </Alert>
    </div>
  );
}
