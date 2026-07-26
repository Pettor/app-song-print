import type { ReactElement } from "react";
import type { Segment } from "~/core/song-print/SongTypes";

export interface ChordLineProps {
  segments: Segment[];
}

/**
 * One chord-over-lyric line.
 *
 * Each segment stacks its chord badge above its lyric chunk. Segments are
 * inline-block, so a chord wider than its chunk widens the segment and pushes
 * the following words right — which is what keeps badges from overlapping.
 */
export function ChordLine({ segments }: ChordLineProps): ReactElement {
  const firstSegment = segments[0];
  const blank = segments.length === 1 && firstSegment !== undefined && !firstSegment.chord && firstSegment.text === "";
  if (blank) return <div className="sp-line sp-line--blank" />;

  return (
    <div className="sp-line">
      {segments.map((s, i) => (
        <span className="sp-seg" key={i}>
          <span className="sp-chordrow">{s.chord ? <span className="sp-chord">{s.chord}</span> : null}</span>
          <span className="sp-lyric">{s.text}</span>
        </span>
      ))}
    </div>
  );
}

export interface ChordRowProps {
  chords: string[];
}

/** A bare chord sequence, for intros, breaks and outros. */
export function ChordRow({ chords }: ChordRowProps): ReactElement {
  return (
    <div className="sp-line sp-line--chords">
      {chords.map((c, i) => (
        <span className="sp-chord" key={i}>
          {c}
        </span>
      ))}
    </div>
  );
}
