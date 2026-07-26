declare module "virtual:songs" {
  import type { Preset } from "~/core/song-print/SongTypes";

  const presets: Preset[];
  export default presets;
  export const SONGS_SOURCE: "directory" | "example";
}
