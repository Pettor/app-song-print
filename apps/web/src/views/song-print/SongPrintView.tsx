import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { SongPrintEditorPanel } from "./SongPrintEditorPanel";
import type { SongPrintEditorPanelProps } from "./SongPrintEditorPanel";
import { SongPrintPreviewPanel } from "./SongPrintPreviewPanel";
import type { SongPrintPreviewPanelProps } from "./SongPrintPreviewPanel";
import { SongPrintToolbar } from "./SongPrintToolbar";
import type { SongPrintToolbarProps } from "./SongPrintToolbar";

export interface SongPrintViewProps {
  toolbar: SongPrintToolbarProps;
  editor: SongPrintEditorPanelProps;
  preview: SongPrintPreviewPanelProps;
  editorWidth: number;
  onSplitterMouseDown: () => void;
}

export function SongPrintView({
  toolbar,
  editor,
  preview,
  editorWidth,
  onSplitterMouseDown,
}: SongPrintViewProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SongPrintToolbar {...toolbar} />
      <div className="flex min-h-0 flex-1">
        <div style={{ flex: `0 0 ${editorWidth}px` }} className="min-w-0">
          <SongPrintEditorPanel {...editor} />
        </div>
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label={intl.formatMessage({
            description: "SongPrintView: aria-label - drag handle between editor and preview panes",
            defaultMessage: "Resize editor pane",
            id: "qLOFEp",
          })}
          onMouseDown={onSplitterMouseDown}
          className="hover:bg-default-300 z-10 w-1.5 flex-none cursor-col-resize bg-transparent transition-colors"
        />
        <SongPrintPreviewPanel {...preview} />
      </div>
    </div>
  );
}
