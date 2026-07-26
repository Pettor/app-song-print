import { atomWithStorage } from "jotai/utils";

/**
 * Remembers which preset was on screen last, so a reload comes back to the
 * song being worked on rather than the first one in the list. Only the
 * preset id is kept — an opened file cannot be re-read without a fresh user
 * gesture.
 */
export const lastPresetIdAtom = atomWithStorage<string>("songprint.lastPreset", "");
