import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export interface UseSongPreviewScaleResult {
  editorWidth: number;
  scale: number;
  containerRef: RefObject<HTMLDivElement | null>;
  onSplitterMouseDown: () => void;
}

/**
 * Owns the editor/preview splitter width and the preview's fit-to-pane zoom
 * scale, recomputed whenever the pane resizes or the page format changes width.
 */
export function useSongPreviewScale(pageWidth: number): UseSongPreviewScaleResult {
  const [editorWidth, setEditorWidth] = useState(448);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function update(): void {
      if (!el) return;
      const avail = el.clientWidth - 80;
      setScale(Math.min(1, Math.max(0.3, avail / pageWidth)));
    }
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [editorWidth, pageWidth]);

  const [isDragging, setIsDragging] = useState(false);

  // Cursor/selection feedback while dragging, scoped to an effect so the DOM
  // mutation is always paired with its cleanup — even if the component
  // unmounts mid-drag.
  useEffect(() => {
    if (!isDragging) return;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;
    function move(e: MouseEvent): void {
      setEditorWidth(Math.min(720, Math.max(320, e.clientX)));
    }
    function stopDragging(): void {
      setIsDragging(false);
    }
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stopDragging);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [isDragging]);

  function onSplitterMouseDown(): void {
    setIsDragging(true);
  }

  return { editorWidth, scale, containerRef, onSplitterMouseDown };
}
