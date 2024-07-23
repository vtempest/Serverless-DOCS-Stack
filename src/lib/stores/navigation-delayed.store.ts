import { derived, type Readable } from "svelte/store";
import { navigating } from "$app/stores";
import type { Navigation } from "@sveltejs/kit";

let timer: NodeJS.Timeout;

export const navigationDelayed: Readable<boolean> = derived(navigating, (newValue: Navigation | null, set: (value: boolean) => void) => {
  if (timer) {
    clearTimeout(timer);
  }

  if (newValue) {
    timer = setTimeout(() => set(true), 100);
  }

  set(false);
});
