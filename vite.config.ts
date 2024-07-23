import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { kitRoutes } from "vite-plugin-kit-routes";
import topLevelAwait from "vite-plugin-top-level-await";
import type { KIT_ROUTES } from "$lib/ROUTES";
import * as LINKS from "./src/lib/configs/links";

export default defineConfig({
  plugins: [
    topLevelAwait(),
    sveltekit(),
    kitRoutes<KIT_ROUTES>({
      post_update_run: "npm exec prettier ./src/lib/ROUTES.ts -- -w",
      LINKS: {
        // socials
        discord: LINKS.DISCORD,
        facebook: LINKS.FACEBOOK,
        github: LINKS.GITHUB,
        instagram: LINKS.INSTAGRAM,
        tiktok: LINKS.TIKTOK,
        twitter: LINKS.TWITTER,

        // tools
        svelte: LINKS.SVELTE,
        tailwind: LINKS.TAILWIND,
        drizzle: LINKS.DRIZZLE,
        lucia: LINKS.LUCIA
      },
      PAGES: {
        "/auth/login": {
          explicit_search_params: {
            redirectTo: { type: "string" }
          }
        }
      }
    })
  ],
  test: {
    coverage: {
      enabled: true,
      reporter: ["html"]
    },
    include: ["src/**/*.{test,spec}.{js,ts}"]
  }
});
