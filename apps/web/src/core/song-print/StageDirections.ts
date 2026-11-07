/** One run of a dialogue line: spoken text, or a stage direction in brackets. */
export interface DialoguePart {
  text: string;
  /** Written in parentheses — what an actor does, not what they say. */
  direction: boolean;
}

/**
 * Split a dialogue line into spoken text and `(stage directions)`.
 *
 * The parentheses stay in the text so the line still reads as written. An
 * unclosed `(` runs to the end of the line — scripts are typed in a hurry, and
 * a direction left open is still a direction.
 */
export function splitStageDirections(line: string): DialoguePart[] {
  const parts: DialoguePart[] = [];
  let rest = line;

  while (rest) {
    const open = rest.indexOf("(");
    if (open < 0) {
      parts.push({ text: rest, direction: false });
      break;
    }
    if (open > 0) parts.push({ text: rest.slice(0, open), direction: false });

    const close = rest.indexOf(")", open);
    const end = close < 0 ? rest.length : close + 1;
    parts.push({ text: rest.slice(open, end), direction: true });
    rest = rest.slice(end);
  }

  return parts;
}
