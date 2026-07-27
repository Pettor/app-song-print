import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { getPageSpec } from "./PageFormats";
import type { PageSpec } from "./SongTypes";

const BG = "#ffffff";

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
      });

      if (i > 0) pdf.addPage([spec.mmWidth, spec.mmHeight]);
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, spec.mmWidth, spec.mmHeight);
    }

    pdf.save(filename);
  } finally {
    scaleWrap.style.zoom = prevZoom;
  }
}
