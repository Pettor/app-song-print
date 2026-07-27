import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { SongPrintEditorPanel } from "./SongPrintEditorPanel";
import type { SongPrintEditorPanelProps } from "./SongPrintEditorPanel";
import { SongPrintLiveOverlay } from "./SongPrintLiveOverlay";
import type { SongPrintLiveOverlayProps } from "./SongPrintLiveOverlay";
import { SongPrintPreviewPanel } from "./SongPrintPreviewPanel";
import type { SongPrintPreviewPanelProps } from "./SongPrintPreviewPanel";
import { SongPrintToolbar } from "./SongPrintToolbar";
import type { SongPrintToolbarProps } from "./SongPrintToolbar";
import { SongPrintTransposeModal } from "./SongPrintTransposeModal";
import type { SongPrintTransposeModalProps } from "./SongPrintTransposeModal";

export interface SongPrintViewProps {
  toolbar: SongPrintToolbarProps;
  editor: SongPrintEditorPanelProps;
  preview: SongPrintPreviewPanelProps;
  transpose: SongPrintTransposeModalProps;
  live: SongPrintLiveOverlayProps;
  isLive: boolean;
  isSourceOpen: boolean;
  editorWidth: number;
  onSplitterMouseDown: () => void;
}

export function SongPrintView({
  toolbar,
  editor,
  preview,
  transpose,
  live,
  isLive,
  isSourceOpen,
  editorWidth,
  onSplitterMouseDown,
}: SongPrintViewProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SongPrintToolbar {...toolbar} />
      <div className="flex min-h-0 flex-1">
        {/* Collapsed rather than unmounted, so the editor keeps its scroll
            position and caret while the source panel is hidden. `inert` takes
            it out of the tab order and the accessibility tree while it is. */}
        <div
          style={{ flex: `0 0 ${isSourceOpen ? editorWidth : 0}px` }}
          className="min-w-0 overflow-hidden transition-[flex-basis] duration-200"
          inert={!isSourceOpen}
        >
          <SongPrintEditorPanel {...editor} />
        </div>
        {isSourceOpen && (
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
        )}
        <SongPrintPreviewPanel {...preview} />
      </div>
      <SongPrintTransposeModal {...transpose} />
      {isLive && <SongPrintLiveOverlay {...live} />}
    </div>
  );
}
