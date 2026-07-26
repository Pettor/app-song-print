import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useSongPrintRoute } from "./-UseSongPrintRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { SongPrintView } from "~/views/song-print/SongPrintView";

export const Route = createFileRoute("/")({
  component: SongPrintPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function SongPrintPageRoute(): ReactElement {
  useDocumentTitle("Song Print");
  const props = useSongPrintRoute();

  return (
    <>
      <SongPrintView {...props} />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
