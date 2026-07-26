import { useCallback, useState } from "react";
import { useAtom } from "jotai";
import { useIntl } from "react-intl";
import { useSongEditorState } from "./-UseSongEditorState";
import { useSongPdfExport } from "./-UseSongPdfExport";
import { useSongPreviewScale } from "./-UseSongPreviewScale";
import { lastPresetIdAtom } from "~/core/song-print/LastPresetAtoms";
import { getPageSpec } from "~/core/song-print/PageFormats";
import { downloadSong, openSongFile, savePreset, toFilename, writeSongFile } from "~/core/song-print/SongFileIo";
import { SONGS, SONGS_SOURCE } from "~/core/song-print/SongLibrary";
import type { Preset } from "~/core/song-print/SongTypes";
import { looksLikeTab, parseTab } from "~/core/song-print/TabImport";
import type { SongPrintViewProps } from "~/views/song-print/SongPrintView";

const EMPTY_PRESET: Preset = { id: "", label: "", data: {} };

/** The remembered preset, falling back to the first one if it has since gone. */
function initialPreset(lastPresetId: string): Preset {
  return SONGS.find((p) => p.id === lastPresetId) ?? SONGS[0] ?? EMPTY_PRESET;
}

export function useSongPrintRoute(): SongPrintViewProps {
  const intl = useIntl();
  const [lastPresetId, setLastPresetId] = useAtom(lastPresetIdAtom);
  const [start] = useState(() => initialPreset(lastPresetId));

  const [presetId, setPresetId] = useState(start.id);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const editor = useSongEditorState({ initialText: JSON.stringify(start.data, null, 2) });
  const pageWidth = getPageSpec(editor.song.page).width;
  const preview = useSongPreviewScale(pageWidth);
  const pdfExport = useSongPdfExport(editor.song);

  const loadPreset = useCallback(
    (id: string) => {
      const p = SONGS.find((x) => x.id === id);
      if (!p) return;
      setPresetId(id);
      editor.setText(JSON.stringify(p.data, null, 2));
      // Save now targets this preset, not the previously open file.
      setFileHandle(null);
      setFileName(null);
      setSaveError(null);
      setLastPresetId(id);
    },
    [editor, setLastPresetId]
  );

  const openFile = useCallback(async () => {
    const file = await openSongFile();
    if (!file) return;
    editor.setText(file.text);
    setPresetId("");
    setFileHandle(file.handle);
    setFileName(file.name);
    setSaveError(null);
    setLastPresetId("");
  }, [editor, setLastPresetId]);

  const flashSaved = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  }, []);

  // Overwrite whatever the song came from: the file it was opened from, or its
  // entry in SONGS_DIR via the dev server. No picker, no download.
  const saveFile = useCallback(async () => {
    try {
      if (fileHandle) await writeSongFile(fileHandle, editor.text);
      else await savePreset(presetId, JSON.parse(editor.text));
      setSaveError(null);
      flashSaved();
    } catch (e) {
      setSaveError((e as Error).message);
    }
  }, [editor.text, presetId, fileHandle, flashSaved]);

  const downloadFile = useCallback(() => {
    downloadSong(editor.text, toFilename(editor.song.title));
  }, [editor.text, editor.song.title]);

  // Presets can only be written back while the dev server is up, and only
  // when they came from a real SONGS_DIR — the bundled example has no file
  // to save to. An opened file needs a handle, which the input fallback does
  // not provide.
  const canSave = fileHandle !== null || (!!presetId && import.meta.env.DEV && SONGS_SOURCE === "directory");

  const saveTitle = saveError
    ? intl.formatMessage(
        {
          description: "SongPrintRoute: tooltip - save failed with underlying error",
          defaultMessage: "Save failed: {error}",
          id: "5AObww",
        },
        { error: saveError }
      )
    : fileHandle
      ? intl.formatMessage(
          {
            description: "SongPrintRoute: tooltip - save an opened file by name",
            defaultMessage: "Save {fileName}",
            id: "h2sZeW",
          },
          { fileName: fileName ?? "" }
        )
      : canSave
        ? intl.formatMessage({
            description: "SongPrintRoute: tooltip - save the current preset back to SONGS_DIR",
            defaultMessage: "Save to SONGS_DIR",
            id: "Zjew8N",
          })
        : presetId && SONGS_SOURCE !== "directory"
          ? intl.formatMessage({
              description: "SongPrintRoute: tooltip - SONGS_DIR unset, suggest download instead",
              defaultMessage: "Set SONGS_DIR to save presets — download a copy instead",
              id: "vhzkyW",
            })
          : intl.formatMessage({
              description: "SongPrintRoute: tooltip - nothing to save to, suggest download instead",
              defaultMessage: "Nowhere to save this — download a copy instead",
              id: "I4O1dF",
            });

  // Pasting a chord tab in place of JSON is offered as a one-click conversion
  // rather than done automatically, so a paste is never silently rewritten.
  const canImportTab = !!editor.error && looksLikeTab(editor.text);

  const importTab = useCallback(() => {
    const parsed = parseTab(editor.text);
    editor.setText(JSON.stringify(parsed, null, 2));
    // The result is a new song, not an edit of the selected one — saving over
    // a preset from here would be a surprise.
    setPresetId("");
    setFileHandle(null);
    setFileName(null);
    setLastPresetId("");
  }, [editor, setLastPresetId]);

  return {
    toolbar: {
      columns: getPageSpec(editor.song.page).columns,
      onColumnsChange: editor.setColumns,
      isColumnsDisabled: !!editor.error,
      songs: SONGS,
      selectedPresetId: presetId,
      onSelectPreset: loadPreset,
      onExportPdf: pdfExport.exportPdf,
      isExporting: pdfExport.isExporting,
    },
    editor: {
      fileName,
      text: editor.text,
      onTextChange: editor.setText,
      onTabKey: editor.onTabKey,
      error: editor.error,
      canImportTab,
      onImportTab: importTab,
      onOpenFile: openFile,
      onSaveFile: saveFile,
      onDownloadFile: downloadFile,
      onFormat: editor.format,
      canSave,
      saveTitle,
      saved,
      saveError,
    },
    preview: {
      song: editor.song,
      scale: preview.scale,
      containerRef: preview.containerRef,
    },
    editorWidth: preview.editorWidth,
    onSplitterMouseDown: preview.onSplitterMouseDown,
  };
}
