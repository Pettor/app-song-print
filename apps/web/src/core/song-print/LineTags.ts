/**
 * Layout tags inside a section's `lines`.
 *
 * `[bl]` (break line) ends the line at that point and adds a blank spacer
 * line, so `"[bl]"` on its own is the way to space two lyric groups apart.
 * `[bp]` (break page) ends the line and sends everything after it to a fresh
 * page, whatever the column count is.
 *
 * Both are written in the same brackets as chords, so they are stripped here
 * before `parseLine` ever sees them — otherwise `[bp]` would print as a chord
 * badge named "bp". `[[bl]` stays a literal `[bl]`, same escape as chords.
 */

const TOKEN = /\[\[|\[([^\]]*)\]/g;

type Tag = "bl" | "bp";

/** One line the layout draws, with the break that precedes it. */
export interface ExpandedLine {
  /** Line source with the tags removed; `""` is a deliberate blank spacer. */
  text: string;
  /** This line starts a new page. */
  pageBreak?: boolean;
}

export interface ExpandedLines {
  lines: ExpandedLine[];
  /** A trailing `[bp]`: whatever follows this section starts a new page. */
  breakAfter: boolean;
}

function tagOf(inner: string | undefined): Tag | undefined {
  const name = inner?.trim().toLowerCase();
  return name === "bl" || name === "bp" ? name : undefined;
}

/** True for a bracketed name the layout consumes rather than printing. */
export function isLayoutTag(name: string | undefined): boolean {
  return tagOf(name) !== undefined;
}

/**
 * Expand a section's raw `lines` into the lines the layout draws.
 *
 * A `[bp]` that lands between two lines becomes a `pageBreak` on the second
 * one; one with nothing after it in the section becomes `breakAfter`, because
 * the break then belongs to whatever section comes next.
 */
export function expandLines(raw: string[]): ExpandedLines {
  const lines: ExpandedLine[] = [];
  let pageBreak = false;

  function emit(text: string): void {
    lines.push(pageBreak ? { text, pageBreak: true } : { text });
    pageBreak = false;
  }

  for (const entry of raw) {
    let buffer = "";
    let tagged = false;
    let last = 0;

    TOKEN.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = TOKEN.exec(entry)) !== null) {
      const tag = m[0] === "[[" ? undefined : tagOf(m[1]);
      if (!tag) continue; // a chord, or a literal "[[" — leave it in the text

      buffer += entry.slice(last, m.index);
      last = m.index + m[0].length;
      tagged = true;

      // Either tag closes the line being built; only text already written
      // makes a line of its own.
      if (buffer !== "") emit(buffer);
      buffer = "";

      if (tag === "bl") emit("");
      else pageBreak = true;
    }

    buffer += entry.slice(last);
    // An untagged entry always draws a line, blank or not — `""` is the
    // long-standing way to write a spacer. A tagged one draws only what
    // follows its last tag.
    if (!tagged || buffer !== "") emit(buffer);
  }

  return { lines, breakAfter: pageBreak };
}
