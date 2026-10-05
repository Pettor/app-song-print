import type { CSSProperties, ReactElement } from "react";
import { useMemo } from "react";
import type { KeyBasis } from "~/core/song-print/KeyBasis";
import { DEFAULT_KEY_BASIS } from "~/core/song-print/KeyBasis";
import { expandLines } from "~/core/song-print/LineTags";
import { parseLine } from "~/core/song-print/ParseLine";
import { transposeView } from "~/core/song-print/SongTranspose";
import type { Section, Segment, Song } from "~/core/song-print/SongTypes";
import { transposeChord } from "~/core/song-print/TransposeChord";

interface PreparedSection {
  name?: string;
  note?: string;
  lines: Segment[][];
}

/**
 * Bare chord rows become a single chord-only line, same as on the sheet.
 *
 * `[bl]` still spaces lines apart here, but `[bp]` is dropped rather than
 * honoured — the stage scrolls, so it has no pages to break onto.
 */
function prepare(sections: Section[], semitones: number): PreparedSection[] {
  return sections.map((s) => {
    const lines: Segment[][] = [];
    if (s.chords?.length) {
      lines.push(s.chords.map((c) => ({ chord: transposeChord(c, semitones), text: "" })));
    }
    for (const line of expandLines(s.lines ?? []).lines) {
      lines.push(
        parseLine(line.text).map((seg) => (seg.chord ? { ...seg, chord: transposeChord(seg.chord, semitones) } : seg))
      );
    }
    return { name: s.name, note: s.note, lines };
  });
}

export interface SongStageProps {
  song: Song;
  /** Lyric size in px — chords are drawn proportionally smaller. */
  fontSize: number;
  columns?: number;
  /** Which key the chords are written in when the song carries a transpose offset. */
  keyBasis?: KeyBasis;
}

/**
 * The song rendered for a music stand: no pages, no chrome, just chords over
 * lyrics at whatever size the room needs. Unlike `SongDoc` nothing is measured
 * or packed — the stage scrolls instead of paginating.
 */
export function SongStage({ song, fontSize, columns = 1, keyBasis = DEFAULT_KEY_BASIS }: SongStageProps): ReactElement {
  const { shift } = transposeView(song, keyBasis);
  const sections = useMemo(() => prepare(song.sections ?? [], shift), [song.sections, shift]);

  const chordSize = fontSize * 0.62;
  const lyricStyle: CSSProperties = { fontSize: `${fontSize}px`, lineHeight: 1.42 };
  const chordStyle: CSSProperties = { fontSize: `${chordSize.toFixed(1)}px`, minHeight: `${chordSize * 1.5}px` };

  return (
    <div className="mx-auto max-w-[1400px]" style={{ columnCount: columns, columnGap: "60px" }}>
      {sections.map((section, si) => (
        <section className="mb-8 break-inside-avoid" key={si}>
          {(section.name ?? section.note) && (
            <div className="mb-3 inline-flex items-baseline gap-2.5 rounded-full bg-blue-500/15 px-3 py-1">
              {section.name && (
                <span className="text-[15px] font-semibold tracking-[0.08em] text-blue-300 uppercase">
                  {section.name}
                </span>
              )}
              {section.note && <span className="text-[13px] text-white/45">{section.note}</span>}
            </div>
          )}
          {section.lines.map((segments, li) => (
            <div className="flex flex-wrap items-end" key={li}>
              {segments.map((segment, gi) => (
                <span className="inline-flex flex-col items-start" key={gi}>
                  <span className="pr-2.5 font-mono font-semibold whitespace-pre text-amber-400" style={chordStyle}>
                    {segment.chord ?? ""}
                  </span>
                  <span className="font-mono whitespace-pre text-neutral-100" style={lyricStyle}>
                    {segment.text}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
