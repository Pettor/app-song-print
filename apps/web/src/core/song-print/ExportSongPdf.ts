import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { getPageSpec } from "./PageFormats";
import type { PageSpec } from "./SongTypes";

const BG = "#ffffff";

/** A paged PDF being assembled from drawn sheets. */
export interface PdfDocument {
  /** Capture `pages` and append them at `pageSpec`'s paper size. */
  add: (pages: HTMLElement[], pageSpec?: PageSpec) => Promise<void>;
  /** True until the first page has been captured — nothing to save yet. */
  isEmpty: () => boolean;
  save: (filename: string) => void;
}

/**
 * A PDF assembled from `.sp-page` elements, one PDF page each.
 *
 * Pages are captured as they are handed over rather than collected up front,
 * so exporting a whole catalog only ever keeps one song's sheets in the DOM.
 * Every batch carries its own page spec, so a catalog mixing A4 and A5 — or
 * portrait and landscape — still comes out at the size each song asked for.
 */
export function createPdfDocument(): PdfDocument {
  let pdf: jsPDF | null = null;

  async function add(pages: HTMLElement[], pageSpec?: PageSpec): Promise<void> {
    const spec = getPageSpec(pageSpec);
    const size: [number, number] = [spec.mmWidth, spec.mmHeight];
    // Stated on every page, not just the first: left to itself jsPDF reuses
    // the document's own orientation and swaps the size to match it, which
    // turns a landscape song inside a portrait catalog back on its end.
    const orientation = spec.mmWidth > spec.mmHeight ? "landscape" : "portrait";

    for (const page of pages) {
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        backgroundColor: BG,
        logging: false,
      });

      if (pdf === null) {
        pdf = new jsPDF({ orientation, unit: "mm", format: size });
      } else {
        pdf.addPage(size, orientation);
      }

      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, spec.mmWidth, spec.mmHeight);
    }
  }

  function isEmpty(): boolean {
    return pdf === null;
  }

  function save(filename: string): void {
    pdf?.save(filename);
  }

  return { add, isEmpty, save };
}

/** The drawn sheets inside `root`, in reading order. */
export function sheetPages(root: HTMLElement | null): HTMLElement[] {
  return root ? Array.from(root.querySelectorAll<HTMLElement>(".sp-page")) : [];
}

/**
 * Export the sheet on screen: every `.sp-page` inside `.sp-scalewrap`,
 * assembled into a paged PDF at the song's page format.
 */
export async function exportToPdf(filename = "song.pdf", pageSpec?: PageSpec): Promise<void> {
  const scaleWrap = document.querySelector<HTMLElement>(".sp-scalewrap");
  if (!scaleWrap) return;

  // Reset zoom so html2canvas captures at natural page dimensions.
  const prevZoom = scaleWrap.style.zoom;
  scaleWrap.style.zoom = "1";

  try {
    const pdf = createPdfDocument();
    await pdf.add(sheetPages(scaleWrap), pageSpec);
    if (!pdf.isEmpty()) pdf.save(filename);
  } finally {
    scaleWrap.style.zoom = prevZoom;
  }
}
