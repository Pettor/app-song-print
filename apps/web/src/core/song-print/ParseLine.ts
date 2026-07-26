import type { Segment } from "./SongTypes";

const TOKEN = /\[\[|\[([^\]]*)\]/g;

/**
 * Split a chord-over-lyric line into segments.
 *
 * "En [Dm]enda sak är [Gm]säker"
 *   -> [{ text: "En " }, { chord: "Dm", text: "enda sak är " }, { chord: "Gm", text: "säker" }]
 *
 * A chord attaches to the text that *follows* it, so text before the first
 * bracket becomes a leading chord-less segment. "[[" is a literal "[".
 */
export function parseLine(line: string): Segment[] {
  const segments: Segment[] = [];
  let pending: string | undefined;
  let buffer = "";
  let last = 0;

  function push(): void {
    segments.push(pending === undefined ? { text: buffer } : { chord: pending, text: buffer });
  }

  // Mid-line: drop the empty segment a leading chord would otherwise produce,
  // but keep every other one so spacing between adjacent chords survives.
  function flush(): void {
    if (buffer === "" && pending === undefined && segments.length === 0) return;
    push();
  }

  TOKEN.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN.exec(line)) !== null) {
    buffer += line.slice(last, m.index);
    last = m.index + m[0].length;

    if (m[0] === "[[") {
      buffer += "[";
      continue;
    }

    flush();
    pending = m[1]?.trim();
    buffer = "";
  }

  // Final flush is unconditional: a blank line must survive as a spacer
  // segment rather than collapsing away.
  buffer += line.slice(last);
  push();

  return segments;
}

/** True when a line carries no chord brackets at all. */
export function isPlainLyric(line: string): boolean {
  return !/\[[^\]]*\]/.test(line.replace(/\[\[/g, ""));
}
