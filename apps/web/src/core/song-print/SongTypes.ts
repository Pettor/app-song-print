import { z } from "zod";

export const PageFormatSchema = z.enum(["A4", "A5", "Letter"]);
export type PageFormat = z.infer<typeof PageFormatSchema>;

export const PageOrientationSchema = z.enum(["portrait", "landscape"]);
export type PageOrientation = z.infer<typeof PageOrientationSchema>;

export const PageSpecSchema = z.object({
  format: PageFormatSchema.optional(),
  orientation: PageOrientationSchema.optional(),
  columns: z.number().optional(),
  fontSize: z.number().optional(),
});
export type PageSpec = z.infer<typeof PageSpecSchema>;

export const SectionSchema = z.object({
  name: z.string().optional(),
  lines: z.array(z.string()).optional(),
  chords: z.array(z.string()).optional(),
  note: z.string().optional(),
});
export type Section = z.infer<typeof SectionSchema>;

/**
 * Every field except `sections` is optional and must default sensibly — the
 * preview re-renders on every keystroke of raw JSON, so half-typed JSON must
 * still render rather than crash.
 */
export const SongSchema = z.object({
  title: z.string().optional(),
  artist: z.string().optional(),
  key: z.string().optional(),
  capo: z.number().optional(),
  tempo: z.number().optional(),
  transpose: z.number().optional(),
  page: PageSpecSchema.optional(),
  sections: z.array(SectionSchema).optional(),
});
export type Song = z.infer<typeof SongSchema>;

/** One parsed piece of a chord-over-lyric line. */
export interface Segment {
  chord?: string;
  text: string;
}

/** One entry in the song library (toolbar picker). */
export interface Preset {
  id: string;
  label: string;
  data: Song;
}
