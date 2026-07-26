/**
 * Convert a pasted chord tab into a Song.
 *
 * The format is the usual two-line one: a line of chords whose columns line up
 * with the lyric line beneath it. A chord's column decides which syllable it
 * attaches to, which is exactly what bracket notation encodes, so the
 * conversion is a column-to-index splice.
 *
 * A chord line with no lyric line under it — an intro or a break — becomes a
 * bare `chords` sequence instead.
 */
import type { Section, Song } from "./SongTypes";

/** Chord names, optionally with a quality, extension and slash bass. */
const CHORD = /^[A-G][#b]?(maj|min|m|dim|aug|sus)?\d*(sus[24]|add\d+)?(\/[A-G][#b]?)?$/;

const SECTION = /^\[(.+)\]\s*$/;
const PAGE = /^page\s+\d+\/\d+\s*$/i;

interface Token {
  chord: string;
  col: number;
}

/** Every token is a chord or a separator, and there is at least one chord. */
function chordTokens(line: string): Token[] | null {
  const out: Token[] = [];
  let ok = false;
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    const t = m[0];
    if (t === "-" || t === "|" || t === "x") continue;
    if (!CHORD.test(t)) return null;
    out.push({ chord: t, col: m.index });
    ok = true;
  }
  return ok ? out : null;
}

function isBlank(line: string | undefined): boolean {
  return line === undefined || line.trim() === "";
}

/** Splice chords into their lyric line as brackets, right to left. */
function merge(chords: Token[], lyric: string): string {
  let out = lyric.replace(/\[/g, "[["); // a literal [ in the lyric
  for (let i = chords.length - 1; i >= 0; i--) {
    const token = chords[i];
    if (!token) continue;
    const { chord, col } = token;
    if (col >= out.length) out = out.padEnd(col, " ");
    out = out.slice(0, col) + `[${chord}]` + out.slice(col);
  }
  return out.trimEnd();
}

/** True when the text looks like a tab rather than JSON, so we can offer to convert. */
export function looksLikeTab(text: string): boolean {
  const t = text.trim();
  if (t.startsWith("{") || t.startsWith("[")) return false;
  return text.split("\n").some((l) => SECTION.test(l) && chordTokens(l) === null);
}

export function parseTab(text: string): Song {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .filter((l) => !PAGE.test(l));

  const first = lines.findIndex((l) => SECTION.test(l));
  const head = lines.slice(0, first === -1 ? lines.length : first);
  const body = first === -1 ? [] : lines.slice(first);

  const song: Song = { title: "", artist: "", sections: [] };

  // "<title> Chords by <artist>" is how these pages label themselves.
  for (const l of head) {
    const m = /^(.+?)\s+(?:Chords|Tabs?)\s+by\s+(.+?)\s*$/i.exec(l);
    if (m && m[1] && m[2]) {
      song.title = m[1].trim();
      song.artist = m[2].trim();
      break;
    }
  }
  if (!song.title) {
    const t = head.find((l) => l.trim() && !/^(difficulty|tuning|chords|key|capo)\b/i.test(l.trim()));
    if (t) song.title = t.trim();
  }

  const sections: Section[] = [];
  let current: Section | null = null;

  for (let i = 0; i < body.length; i++) {
    const line = body[i] ?? "";

    const sec = SECTION.exec(line);
    if (sec && chordTokens(line) === null) {
      current = { name: sec[1]?.trim() };
      sections.push(current);
      continue;
    }
    if (!current) continue;

    const chords = chordTokens(line);
    if (chords) {
      const next = body[i + 1];
      // A lyric line is the next non-section, non-chord, non-blank line.
      if (!isBlank(next) && next !== undefined && !SECTION.test(next) && chordTokens(next) === null) {
        (current.lines ??= []).push(merge(chords, next));
        i++;
      } else {
        (current.chords ??= []).push(...chords.map((c) => c.chord));
      }
      continue;
    }

    if (isBlank(line)) {
      // Keep a deliberate spacer between lyric lines, but never a run of them —
      // stripped page furniture leaves stray blanks behind.
      const lines = current.lines;
      if (lines?.length && lines[lines.length - 1] !== "") lines.push("");
      continue;
    }

    // A lyric line with no chords above it.
    (current.lines ??= []).push(line.replace(/\[/g, "[[").trimEnd());
  }

  // Drop trailing spacers left by blank lines between sections.
  for (const s of sections) {
    while (s.lines?.length && s.lines[s.lines.length - 1] === "") s.lines.pop();
    if (s.lines && s.lines.length === 0) delete s.lines;
  }

  song.sections = sections;
  return song;
}
