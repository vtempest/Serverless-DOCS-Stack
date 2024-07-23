import { browser } from "$app/environment";
import { readable, type Readable } from "svelte/store";

const value = browser && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;

/**
 * Detect if user has enabled animations from OS settings.
 * More info at https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 */
export const prefersReducedMotion: Readable<boolean> = readable(value);
