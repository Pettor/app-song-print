import { atomWithStorage } from "jotai/utils";

/**
 * Remembers which preset was on screen last, so a reload comes back to the
 * song being worked on rather than the first one in the list. Only the
 * preset id is kept — an opened file cannot be re-read without a fresh user
 * gesture.
 *
 * `getOnInit` is required: the route picks its starting preset once, in a
 * `useState` initialiser, so the stored id has to be there on the very first
 * render. Without it the atom starts empty and only hydrates on mount, by
 * which time the first song has already been loaded for good.
 */
export const lastPresetIdAtom = atomWithStorage<string>("songprint.lastPreset", "", undefined, { getOnInit: true });
