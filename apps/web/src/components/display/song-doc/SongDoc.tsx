import type { CSSProperties, ReactElement } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import "./SongDoc.css";
import { ChordLine, ChordRow } from "./ChordLine";
import {
  COLUMN_GUTTER,
  PAGE_PAD_BOTTOM,
  PAGE_PAD_TOP,
  PAGE_PAD_X,
  SECTION_GAP,
  columnHeight,
  columnWidth,
  getPageSpec,
} from "~/core/song-print/PageFormats";
import { buildColumns, chunkPages } from "~/core/song-print/Paginate";
import { parseLine } from "~/core/song-print/ParseLine";
import type { Section, Segment, Song } from "~/core/song-print/SongTypes";
import { transposeChord } from "~/core/song-print/TransposeChord";

/** A section with its lines already parsed and transposed. */
interface PreparedSection {
  name?: string;
  note?: string;
  chords?: string[];
  lines: Segment[][];
}

/** A renderable slice of a section — the whole thing, or a page-split part. */
interface Unit {
  section: number;
  from: number;
  to: number;
  continued: boolean;
}

function prepare(sections: Section[], semitones: number): PreparedSection[] {
  return sections.map((s) => ({
    name: s.name,
    note: s.note,
    chords: s.chords?.map((c) => transposeChord(c, semitones)),
    lines: (s.lines ?? []).map((l) =>
      parseLine(l).map((seg) => (seg.chord ? { ...seg, chord: transposeChord(seg.chord, semitones) } : seg))
    ),
  }));
}

interface SectionHeadProps {
  name?: string;
  note?: string;
  continued?: boolean;
}

function SectionHead({ name, note, continued }: SectionHeadProps): ReactElement | null {
  if (!name && !note) return null;
  return (
    <div className="sp-sechead">
      {name && (
        <span className="sp-secname">
          [{name}
          {continued ? " cont." : ""}]
        </span>
      )}
      {note && <span className="sp-secnote">{note}</span>}
    </div>
  );
}

interface SectionBodyProps {
  s: PreparedSection;
  from: number;
  to: number;
}

function SectionBody({ s, from, to }: SectionBodyProps): ReactElement {
  return (
    <>
      {s.chords && s.chords.length > 0 && from === 0 && <ChordRow chords={s.chords} />}
      {s.lines.slice(from, to).map((segs, i) => (
        <ChordLine segments={segs} key={from + i} />
      ))}
    </>
  );
}

interface SongHeaderProps {
  song: Song;
  semitones: number;
}

function SongHeader({ song, semitones }: SongHeaderProps): ReactElement | null {
  const meta: string[] = [];
  if (song.key) {
    const shifted = semitones ? transposeChord(song.key, semitones) : song.key;
    meta.push(semitones && shifted !== song.key ? `Key ${song.key} → ${shifted}` : `Key ${shifted}`);
  }
  if (song.capo) meta.push(`Capo ${song.capo}`);
  if (song.tempo) meta.push(`${song.tempo} bpm`);

  if (!song.title && !song.artist && meta.length === 0) return null;

  return (
    <header className="sp-header">
      <div className="sp-titles">
        {song.title && <h1 className="sp-title">{song.title}</h1>}
        {song.artist && <div className="sp-artist">{song.artist}</div>}
      </div>
      {meta.length > 0 && <div className="sp-meta">{meta.join(" · ")}</div>}
    </header>
  );
}

export interface SongDocProps {
  song: Song;
}

/**
 * Renders a Song as a paginated chord sheet: measure → split → pack →
 * paginate, then draws the resulting pages. See SongDoc.css for the pixel
 * contract this measurement pass depends on.
 */
export function SongDoc({ song }: SongDocProps): ReactElement {
  const page = getPageSpec(song.page);
  const semitones = Math.round(song.transpose ?? 0);
  const sections = useMemo(() => prepare(song.sections ?? [], semitones), [song.sections, semitones]);

  const colW = columnWidth(page);
  const colH = columnHeight(page);

  const measRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{ sig: string; pages: number[][][]; units: Unit[] } | null>(null);

  const sig = JSON.stringify({ song, colW, colH });

  useLayoutEffect(() => {
    const root = measRef.current;
    if (!root) return;

    // The preview is scaled to fit its pane (`zoom` on .sp-scalewrap), and
    // getBoundingClientRect reports post-scale pixels. Column heights are in
    // unscaled page pixels, so normalise every measurement by the factor the
    // measure div is actually rendered at, or pagination breaks on narrow
    // windows.
    const measured = root.getBoundingClientRect().width;
    const zoom = measured > 0 && colW > 0 ? measured / colW : 1;
    function heightOf(el: HTMLElement | null | undefined): number {
      return el ? el.getBoundingClientRect().height / zoom : 0;
    }

    const songHeaderH = heightOf(headRef.current);

    // Per-section header, line and total heights, measured at final column width.
    const headH: number[] = [];
    const lineH: number[][] = [];
    const chromeH: number[] = [];

    sections.forEach((_, i) => {
      const secEl = root.querySelector<HTMLElement>(`[data-sec="${i}"]`);
      const hEl = secEl?.querySelector<HTMLElement>("[data-head]");
      const lEls = Array.from(secEl?.querySelectorAll<HTMLElement>("[data-line]") ?? []);

      const h = heightOf(hEl);
      const ls = lEls.map(heightOf);
      const total = heightOf(secEl);

      headH.push(h);
      lineH.push(ls);
      chromeH.push(Math.max(0, total - h - ls.reduce((a, b) => a + b, 0)));
    });

    // A section is atomic unless it cannot fit a column on its own, in which
    // case it splits at line boundaries and repeats its header as "cont.".
    const units: Unit[] = [];
    const heights: number[] = [];

    sections.forEach((s, i) => {
      const lines = lineH[i] ?? [];
      const head = headH[i] ?? 0;
      const chrome = chromeH[i] ?? 0;
      const full = head + chrome + lines.reduce((a, b) => a + b, 0);
      const budget = colH - head - chrome;

      if (full <= colH || lines.length <= 1 || budget <= 0) {
        units.push({ section: i, from: 0, to: s.lines.length, continued: false });
        heights.push(full);
        return;
      }

      let from = 0;
      let used = 0;
      for (let j = 0; j < lines.length; j++) {
        const lh = lines[j] ?? 0;
        if (used + lh > budget && j > from) {
          units.push({ section: i, from, to: j, continued: from > 0 });
          heights.push(head + chrome + used);
          from = j;
          used = 0;
        }
        used += lh;
      }
      units.push({ section: i, from, to: lines.length, continued: from > 0 });
      heights.push(head + chrome + used);
    });

    // Page one loses height to the song header; later pages get the full column.
    const firstPageColumns = page.columns;
    function heightFor(columnIndex: number): number {
      return columnIndex < firstPageColumns ? colH - songHeaderH : colH;
    }

    const columns = buildColumns(heights, heightFor, SECTION_GAP);
    setLayout({ sig, pages: chunkPages(columns, page.columns), units });
    // `sig` already encodes every reactive value this effect reads (song, colW,
    // colH), but list them explicitly too so the effect stays compiler-safe.
  }, [sig, sections, colW, colH, page.columns]);

  const current = layout?.sig === sig ? layout : null;

  function renderUnit(u: Unit, key: number): ReactElement | null {
    const s = sections[u.section];
    if (!s) return null;
    return (
      <div className="sp-section" key={key}>
        <SectionHead name={s.name} note={u.continued ? undefined : s.note} continued={u.continued} />
        <SectionBody s={s} from={u.from} to={u.to} />
      </div>
    );
  }

  const docStyle = {
    "--sp-font": `${page.fontSize}px`,
    "--sp-col-w": `${colW}px`,
    "--sp-page-w": `${page.width}px`,
    "--sp-page-h": `${page.height}px`,
    "--sp-pad-x": `${PAGE_PAD_X}px`,
    "--sp-pad-top": `${PAGE_PAD_TOP}px`,
    "--sp-pad-bottom": `${PAGE_PAD_BOTTOM}px`,
    "--sp-gutter": `${COLUMN_GUTTER}px`,
    "--sp-gap": `${SECTION_GAP}px`,
  } as CSSProperties;

  // Off-screen measurement pass, one column wide so heights match the render.
  const measurer = (
    <div className="sp-measure" ref={measRef} style={{ width: colW + "px" }}>
      <div ref={headRef}>
        <SongHeader song={song} semitones={semitones} />
      </div>
      {sections.map((s, i) => (
        <div className="sp-section" data-sec={i} key={i}>
          <div data-head="">
            <SectionHead name={s.name} note={s.note} />
          </div>
          {s.chords && s.chords.length > 0 && (
            <div data-line="">
              <ChordRow chords={s.chords} />
            </div>
          )}
          {s.lines.map((segs, j) => (
            <div data-line="" key={j}>
              <ChordLine segments={segs} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const fallback: number[][][] = [[sections.map((_, i) => i)]];
  const pages = current?.pages ?? fallback;
  const units =
    current?.units ?? sections.map((s, i) => ({ section: i, from: 0, to: s.lines.length, continued: false }));
  const total = pages.length;

  return (
    <div className="sp-doc" style={docStyle}>
      {measurer}
      {pages.map((cols, pi) => (
        <div className="sp-page" key={pi}>
          {pi === 0 && <SongHeader song={song} semitones={semitones} />}
          <div className="sp-cols" data-columns={page.columns}>
            {cols.map((colUnits, ci) => (
              <div className="sp-col" key={ci}>
                {colUnits.map((ui) => {
                  const unit = units[ui];
                  return unit ? renderUnit(unit, ui) : null;
                })}
              </div>
            ))}
          </div>
          {total > 1 && (
            <div className="sp-foot">
              {pi + 1} / {total}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
