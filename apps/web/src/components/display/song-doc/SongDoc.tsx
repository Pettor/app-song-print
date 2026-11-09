import type { CSSProperties, ReactElement } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import "./SongDoc.css";
import { ChordLine, ChordRow } from "./ChordLine";
import type { ChordStyle } from "~/core/song-print/ChordStyle";
import { DEFAULT_CHORD_STYLE } from "~/core/song-print/ChordStyle";
import type { KeyBasis } from "~/core/song-print/KeyBasis";
import { DEFAULT_KEY_BASIS } from "~/core/song-print/KeyBasis";
import { expandLines } from "~/core/song-print/LineTags";
import {
  COLUMN_GUTTER,
  PAGE_PAD_TOP,
  SECTION_GAP,
  columnHeight,
  columnWidth,
  getPageSpec,
} from "~/core/song-print/PageFormats";
import { buildColumns, chunkPages } from "~/core/song-print/Paginate";
import { parseLine } from "~/core/song-print/ParseLine";
import { repeatLabel } from "~/core/song-print/SectionRepeat";
import type { TransposeView } from "~/core/song-print/SongTranspose";
import { transposeView } from "~/core/song-print/SongTranspose";
import type { DialogueLine, Section, Segment, Song } from "~/core/song-print/SongTypes";
import { splitStageDirections } from "~/core/song-print/StageDirections";
import { transposeChord } from "~/core/song-print/TransposeChord";

/** One drawn line, with the forced break `[bp]` put in front of it. */
interface PreparedLine {
  segments: Segment[];
  /** Starts a new page, whatever the column packing would have done. */
  pageBreak?: boolean;
}

/** A section with its lines already expanded, parsed and transposed. */
interface PreparedSection {
  cue?: string;
  name?: string;
  repeat?: number;
  note?: string;
  chords?: string[];
  dialogue?: DialogueLine[];
  lines: PreparedLine[];
  /** A `[bp]` after the section's last line: the next section starts a page. */
  breakAfter: boolean;
}

/** A renderable slice of a section — the whole thing, or a split part. */
interface Unit {
  section: number;
  from: number;
  to: number;
  continued: boolean;
}

function prepare(sections: Section[], semitones: number): PreparedSection[] {
  return sections.map((s) => {
    const expanded = expandLines(s.lines ?? []);
    return {
      cue: s.cue,
      name: s.name,
      repeat: s.repeat,
      note: s.note,
      chords: s.chords?.map((c) => transposeChord(c, semitones)),
      dialogue: s.dialogue,
      lines: expanded.lines.map((line) => ({
        ...(line.pageBreak ? { pageBreak: true } : {}),
        segments: parseLine(line.text).map((seg) =>
          seg.chord ? { ...seg, chord: transposeChord(seg.chord, semitones) } : seg
        ),
      })),
      breakAfter: expanded.breakAfter,
    };
  });
}

interface SectionHeadProps {
  cue?: string;
  name?: string;
  repeat?: number;
  note?: string;
  continued?: boolean;
}

/**
 * How the section is started, labelled and set apart from the playing note —
 * on the first page of a setlist it is the line a player looks for before the
 * first chord, so it is drawn above the section name rather than beside it.
 */
function SectionCue({ cue }: { cue?: string }): ReactElement | null {
  const intl = useIntl();
  const text = cue?.trim();
  if (!text) return null;

  return (
    <div className="sp-seccue">
      <span className="sp-seccuelabel">
        {intl.formatMessage({
          description: "SongDoc: sheet section - label on the line saying how the section is started",
          defaultMessage: "Start",
          id: "zNN1jL",
        })}
      </span>
      <span className="sp-seccuetext">{text}</span>
    </div>
  );
}

function SectionHead({ cue, name, repeat, note, continued }: SectionHeadProps): ReactElement | null {
  const repeats = repeatLabel(repeat);
  if (!cue && !name && !repeats && !note) return null;
  return (
    <div className="sp-sechead">
      <SectionCue cue={cue} />
      {(name || repeats) && (
        <div className="sp-secnamerow">
          {name && (
            <span className="sp-secname">
              [{name}
              {continued ? " cont." : ""}]
            </span>
          )}
          {/* Drawn on a continuation too: the part on the next page is played
              the same number of times as the one it carries on from. */}
          {repeats && <span className="sp-secrepeat">{repeats}</span>}
        </div>
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
      {from === 0 && <SongDialogue lines={s.dialogue} inSection />}
      {s.lines.slice(from, to).map((line, i) => (
        <ChordLine segments={line.segments} key={from + i} />
      ))}
    </>
  );
}

interface SongDialogueProps {
  lines?: DialogueLine[];
  /** Spoken over a section of the song rather than before it starts. */
  inSection?: boolean;
}

/** The scene leading into the song, set like a script: who speaks, then what. */
function SongDialogue({ lines, inSection = false }: SongDialogueProps): ReactElement | null {
  const spoken = lines?.filter((l) => l.actor?.trim() || l.text?.trim()) ?? [];
  if (spoken.length === 0) return null;

  return (
    <div className={clsx("sp-dialogue", inSection && "sp-dialogue--section")}>
      {spoken.map((l, i) => (
        <div className="sp-dialogue-line" key={i}>
          {l.actor?.trim() && <div className="sp-dialogue-actor">{l.actor.trim()}</div>}
          <div className="sp-dialogue-text">
            {splitStageDirections(l.text ?? "").map((part, j) =>
              part.direction ? (
                <em className="sp-dialogue-direction" key={j}>
                  {part.text}
                </em>
              ) : (
                <span key={j}>{part.text}</span>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

interface MetaChip {
  label: string;
  value: string;
  /** Free text rather than a number or key: left-aligned and allowed to wrap. */
  text?: boolean;
}

interface SongHeaderProps {
  song: Song;
  view: TransposeView;
}

/** Placeholder for a value the song does not carry. */
const NO_VALUE = "—";

function SongHeader({ song, view }: SongHeaderProps): ReactElement | null {
  const intl = useIntl();

  // Only values the song actually carries get a chip — a dash says nothing a
  // player needs. Unset ones are dropped below.
  const allChips: MetaChip[] = [
    {
      label: intl.formatMessage({
        description: "SongDoc: sheet meta chip label - musical key",
        defaultMessage: "Key",
        id: "kEhm3r",
      }),
      // Only the key being played — the sheet is read, not diffed — unless the
      // chords stayed in the original key, where the pair is the whole point.
      value: !view.writtenKey
        ? NO_VALUE
        : view.isOriginal
          ? `${view.writtenKey} → ${view.soundingKey}`
          : view.writtenKey,
    },
    {
      label: intl.formatMessage({
        description: "SongDoc: sheet meta chip label - capo fret",
        defaultMessage: "Capo",
        id: "QINXS3",
      }),
      value: song.capo ? String(song.capo) : NO_VALUE,
    },
    {
      label: intl.formatMessage({
        description: "SongDoc: sheet meta chip label - tempo in beats per minute",
        defaultMessage: "Tempo",
        id: "ZaRIHg",
      }),
      value: song.tempo ? String(song.tempo) : NO_VALUE,
    },
    {
      label: intl.formatMessage({
        description: "SongDoc: sheet meta chip label - time signature",
        defaultMessage: "Time",
        id: "D6we1R",
      }),
      value: song.timeSignature?.trim() || NO_VALUE,
    },
  ];

  if (view.isOriginal) {
    allChips.push({
      label: intl.formatMessage({
        description: "SongDoc: sheet meta chip label - semitones to transpose by while playing",
        defaultMessage: "Transpose",
        id: "z8+3KF",
      }),
      value: view.offset > 0 ? `+${view.offset}` : String(view.offset),
    });
  }

  allChips.push({
    label: intl.formatMessage({
      description: "SongDoc: sheet meta chip label - free-text notes on how to play the song",
      defaultMessage: "Notes",
      id: "PMdrz+",
    }),
    value: song.notes?.trim() || NO_VALUE,
    text: true,
  });

  const chips = allChips.filter((chip) => chip.value !== NO_VALUE);
  const hasMeta = chips.length > 0;

  if (!song.title && !song.artist && !hasMeta && song.order === undefined) return null;

  return (
    <>
      <div className="sp-header">
        <div className="sp-heading">
          {/* Setlist position, sized to be found at a glance on a music stand. */}
          {song.order !== undefined && (
            <div
              className="sp-order"
              aria-label={intl.formatMessage(
                {
                  description: "SongDoc: sheet header - position of the song in the setlist",
                  defaultMessage: "Setlist position {order}",
                  id: "/WxKpH",
                },
                { order: song.order }
              )}
            >
              {song.order}
            </div>
          )}
          <div className="sp-titles">
            {song.title && <h1 className="sp-title">{song.title}</h1>}
            {song.artist && <div className="sp-artist">{song.artist}</div>}
          </div>
        </div>
        {hasMeta && (
          <div className="sp-meta">
            {chips.map((chip) => (
              <div className={clsx("sp-metachip", chip.text && "sp-metachip--text")} key={chip.label}>
                <span className="sp-metalabel">{chip.label}</span>
                <span className="sp-metavalue">{chip.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="sp-rule" />
    </>
  );
}

interface SongFootProps {
  song: Song;
  view: TransposeView;
  page: number;
  total: number;
}

function SongFoot({ song, view, page, total }: SongFootProps): ReactElement {
  const intl = useIntl();

  const key = view.isOriginal ? `${view.writtenKey} → ${view.soundingKey}` : view.writtenKey;
  const parts = [song.title, song.artist].filter(Boolean);
  if (key) {
    parts.push(
      intl.formatMessage(
        {
          description: "SongDoc: sheet footer - musical key",
          defaultMessage: "Key {key}",
          id: "F5P5Jj",
        },
        { key }
      )
    );
  }

  return (
    <div className="sp-foot">
      <span>{parts.join(" · ")}</span>
      <span>
        {intl.formatMessage(
          {
            description: "SongDoc: sheet footer - page number and print date",
            defaultMessage: "Page {page} of {total} · {date}",
            id: "S+3a30",
          },
          {
            page,
            total,
            date: intl.formatDate(Date.now(), { day: "2-digit", month: "short", year: "numeric" }),
          }
        )}
      </span>
    </div>
  );
}

export interface SongDocProps {
  song: Song;
  chordStyle?: ChordStyle;
  /** Which key the chords are written in when the song carries a transpose offset. */
  keyBasis?: KeyBasis;
  /** Widen the side margins so a hole punch clears the text. */
  punchMargin?: boolean;
  /** Print the title, page count and date along the bottom of each page. */
  showFooter?: boolean;
}

/**
 * Renders a Song as a paginated chord sheet: measure → split → pack →
 * paginate, then draws the resulting pages. See SongDoc.css for the pixel
 * contract this measurement pass depends on.
 */
export function SongDoc({
  song,
  chordStyle = DEFAULT_CHORD_STYLE,
  keyBasis = DEFAULT_KEY_BASIS,
  punchMargin = false,
  showFooter = true,
}: SongDocProps): ReactElement {
  const page = getPageSpec(song.page, { punchMargin, hideFooter: !showFooter });
  const view = transposeView(song, keyBasis);
  const sections = useMemo(() => prepare(song.sections ?? [], view.shift), [song.sections, view.shift]);

  const colW = columnWidth(page);
  const colH = columnHeight(page);

  const measRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{ sig: string; pages: number[][][]; units: Unit[] } | null>(null);

  // Chord style is part of the signature: dropping the chip padding changes
  // segment widths, and so how many lines a section wraps to. So is the key
  // basis — it rewrites every chord and adds a header chip.
  const sig = JSON.stringify({ song, colW, colH, chordStyle, keyBasis });

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

    // Per-section header, line and total heights, measured at final column
    // width. [data-line] stays aligned 1:1 with the prepared lines — a bare
    // chord row is part of the section's chrome, not a line a split can land on.
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

    // A section is atomic unless a [bp] cuts it, or it cannot fit a column on
    // its own — then it splits at line boundaries and repeats its header as
    // "cont.".
    const units: Unit[] = [];
    const heights: number[] = [];
    const pageBreaks = new Set<number>();

    // A [bp] with no line after it in its own section breaks before the next.
    let carried = false;

    sections.forEach((s, i) => {
      const lines = lineH[i] ?? [];
      const head = headH[i] ?? 0;
      const chrome = chromeH[i] ?? 0;
      const budget = colH - head - chrome;

      // A section reduced to nothing but a [bp] draws no unit, so pass its
      // break on to the section that follows instead of losing it.
      if (
        s.lines.length === 0 &&
        !s.cue &&
        !s.name &&
        !s.repeat &&
        !s.note &&
        !s.chords?.length &&
        !s.dialogue?.length
      ) {
        carried = carried || s.breakAfter;
        return;
      }

      function push(from: number, to: number, used: number, forced: boolean): void {
        if (forced && units.length > 0) pageBreaks.add(units.length);
        units.push({ section: i, from, to, continued: from > 0 });
        heights.push(head + chrome + used);
      }

      // Cut points: the section start, then every line carrying a [bp].
      const cuts = [0, ...s.lines.flatMap((line, j) => (j > 0 && line.pageBreak ? [j] : [])), s.lines.length];

      for (let c = 0; c < cuts.length - 1; c++) {
        const start = cuts[c] ?? 0;
        const end = cuts[c + 1] ?? start;
        // The first chunk breaks on a leading [bp] or one carried over; every
        // later chunk exists only because a [bp] cut it.
        const forced = c > 0 || carried || !!s.lines[0]?.pageBreak;
        const span = lines.slice(start, end).reduce((a, b) => a + b, 0);

        if (head + chrome + span <= colH || end - start <= 1 || budget <= 0) {
          push(start, end, span, forced);
          continue;
        }

        let from = start;
        let used = 0;
        for (let j = start; j < end; j++) {
          const lh = lines[j] ?? 0;
          if (used + lh > budget && j > from) {
            push(from, j, used, forced && from === start);
            from = j;
            used = 0;
          }
          used += lh;
        }
        push(from, end, used, forced && from === start);
      }

      carried = s.breakAfter;
    });

    // Page one loses height to the song header; later pages get the full column.
    const firstPageColumns = page.columns;
    function heightFor(columnIndex: number): number {
      return columnIndex < firstPageColumns ? colH - songHeaderH : colH;
    }

    const columns = buildColumns(heights, heightFor, SECTION_GAP, {
      pageBreak: pageBreaks,
      columnsPerPage: page.columns,
    });
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
        <SectionHead
          cue={u.continued ? undefined : s.cue}
          name={s.name}
          repeat={s.repeat}
          note={u.continued ? undefined : s.note}
          continued={u.continued}
        />
        <SectionBody s={s} from={u.from} to={u.to} />
      </div>
    );
  }

  const docStyle = {
    "--sp-font": `${page.fontSize}px`,
    "--sp-col-w": `${colW}px`,
    "--sp-page-w": `${page.width}px`,
    "--sp-page-h": `${page.height}px`,
    "--sp-pad-left": `${page.padLeft}px`,
    "--sp-pad-right": `${page.padRight}px`,
    "--sp-pad-top": `${PAGE_PAD_TOP}px`,
    "--sp-pad-bottom": `${page.padBottom}px`,
    "--sp-gutter": `${COLUMN_GUTTER}px`,
    "--sp-gap": `${SECTION_GAP}px`,
  } as CSSProperties;

  // Off-screen measurement pass, one column wide so heights match the render.
  const measurer = (
    <div className="sp-measure" ref={measRef} style={{ width: colW + "px" }}>
      {/* Header and dialogue span the whole page, not one column. */}
      <div ref={headRef} style={{ width: page.width - page.padLeft - page.padRight + "px" }}>
        <SongHeader song={song} view={view} />
        <SongDialogue lines={song.dialogue} />
      </div>
      {sections.map((s, i) => (
        <div className="sp-section" data-sec={i} key={i}>
          <div data-head="">
            <SectionHead cue={s.cue} name={s.name} repeat={s.repeat} note={s.note} />
          </div>
          {s.chords && s.chords.length > 0 && (
            <div data-chords="">
              <ChordRow chords={s.chords} />
            </div>
          )}
          {/* Measured as section chrome: it is drawn only with the first part. */}
          <SongDialogue lines={s.dialogue} inSection />
          {s.lines.map((line, j) => (
            <div data-line="" key={j}>
              <ChordLine segments={line.segments} />
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
    // `data-measured` appears once the drawn pages match the current song:
    // what an off-screen capture waits for before photographing the sheet.
    <div className="sp-doc" style={docStyle} data-chord-style={chordStyle} data-measured={current ? "" : undefined}>
      {measurer}
      {pages.map((cols, pi) => (
        <div className="sp-page" key={pi}>
          {pi === 0 && <SongHeader song={song} view={view} />}
          {pi === 0 && <SongDialogue lines={song.dialogue} />}
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
          {showFooter && <SongFoot song={song} view={view} page={pi + 1} total={total} />}
        </div>
      ))}
    </div>
  );
}
