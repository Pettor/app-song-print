import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getPageSpec } from "./PageFormats";
import type { PageSpec } from "./SongTypes";

const BG = "#ffffff";

/**
 * html2canvas's color parser can't read the app shell's oklch() design
 * tokens (Tailwind's preflight sets one on every element, and HeroUI
 * components use them throughout), and throws the first time it meets one
 * while walking the cloned document — even on chrome nowhere near the
 * exported sheet (the toolbar, portalled modals/toasts), since html2canvas
 * parses the whole document for correct stacking context.
 *
 * Rather than chase every CSS color property that might carry one, prune the
 * clone down to just the exported element's own ancestor chain (dropping
 * every unrelated subtree — other pages, the editor pane, the toolbar,
 * portals mounted on <body>), then force every surviving ancestor's colors
 * back to plain values html2canvas can parse. Stripping `class`/`style` alone
 * isn't enough — `html { background-color: var(--background) }` in the
 * shared Tailwind config targets the tag directly — so this sets an inline
 * override instead. <head> is never touched.
 *
 * Tailwind's preflight also sets `border-color`/`outline-color` on every
 * element via a bare `*` rule, which reaches the exported sheet's own markup
 * too (none of it sets a visible border, so this is invisible either way) —
 * override those two on the exported subtree as well. Its actual visible
 * styling (background/text colors from SongDoc.css) is left alone.
 */
function isolateExportedElement(clonedDocument: Document, exportedElement: Element): void {
  let node: Element = exportedElement;
  while (node !== clonedDocument.body && node.parentElement) {
    const parent = node.parentElement;
    for (const sibling of Array.from(parent.children)) {
      if (sibling !== node) sibling.remove();
    }
    node = parent;
  }
  for (let el = exportedElement.parentElement; el; el = el.parentElement) {
    el.removeAttribute("class");
    el.style.setProperty("background-image", "none", "important");
    for (const prop of ["background-color", "color", "border-color", "outline-color"]) {
      el.style.setProperty(prop, "transparent", "important");
    }
  }
  for (const el of [exportedElement, ...exportedElement.querySelectorAll("*")]) {
    (el as HTMLElement).style.setProperty("border-color", "transparent", "important");
    (el as HTMLElement).style.setProperty("outline-color", "transparent", "important");
  }
}

/**
 * Renders every `.sp-page` inside `.sp-scalewrap` to a canvas and assembles
 * them into a paged PDF at the song's page format/orientation.
 */
export async function exportToPdf(filename = "song.pdf", pageSpec?: PageSpec): Promise<void> {
  const scaleWrap = document.querySelector<HTMLElement>(".sp-scalewrap");
  if (!scaleWrap) return;

  const spec = getPageSpec(pageSpec);

  // Reset zoom so html2canvas captures at natural page dimensions.
  const prevZoom = scaleWrap.style.zoom;
  scaleWrap.style.zoom = "1";

  try {
    const pages = Array.from(scaleWrap.querySelectorAll<HTMLElement>(".sp-page"));
    if (!pages.length) return;

    const pdf = new jsPDF({
      orientation: spec.mmWidth > spec.mmHeight ? "landscape" : "portrait",
      unit: "mm",
      format: [spec.mmWidth, spec.mmHeight],
    });

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (!page) continue;
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        backgroundColor: BG,
        logging: false,
        onclone: (clonedDocument, clonedElement) => isolateExportedElement(clonedDocument, clonedElement),
      });

      if (i > 0) pdf.addPage([spec.mmWidth, spec.mmHeight]);
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, spec.mmWidth, spec.mmHeight);
    }

    pdf.save(filename);
  } finally {
    scaleWrap.style.zoom = prevZoom;
  }
}
