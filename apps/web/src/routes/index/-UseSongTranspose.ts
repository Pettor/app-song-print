import { useCallback, useState } from "react";
import {
  distinctChords,
  effectiveKey,
  keyPrefersFlats,
  semitonesBetween,
  signedSemitones,
  transposeSong,
} from "~/core/song-print/SongTranspose";
import type { Song } from "~/core/song-print/SongTypes";
import { transposeChord } from "~/core/song-print/TransposeChord";
import type { SongPrintTransposeModalProps } from "~/views/song-print/SongPrintTransposeModal";

export interface UseSongTransposeOptions {
  song: Song;
  onApply: (song: Song) => void;
}

export interface UseSongTransposeResult {
  modal: SongPrintTransposeModalProps;
  open: () => void;
}

/**
 * Drives the transpose dialog: which key is being aimed at, what the chords
 * would become, and writing the result back into the document.
 */
export function useSongTranspose({ song, onApply }: UseSongTransposeOptions): UseSongTransposeResult {
  const [isOpen, setIsOpen] = useState(false);
  const [targetKey, setTargetKey] = useState<string | null>(null);

  const currentKey = effectiveKey(song);
  // Until a key is picked, the dialog points at where the song already is.
  const target = targetKey ?? currentKey;

  const steps = semitonesBetween(currentKey, target);
  const preferFlats = keyPrefersFlats(target);
  const beforeChords = distinctChords(song).slice(0, 8);

  const open = useCallback(() => {
    setTargetKey(null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const apply = useCallback(() => {
    onApply(transposeSong(song, target));
    setIsOpen(false);
  }, [onApply, song, target]);

  return {
    open,
    modal: {
      isOpen,
      onClose: close,
      currentKey,
      targetKey: target,
      onTargetKeyChange: setTargetKey,
      beforeChords,
      afterChords: beforeChords.map((c) => transposeChord(c, steps, preferFlats)),
      semitones: signedSemitones(steps),
      onApply: apply,
    },
  };
}
