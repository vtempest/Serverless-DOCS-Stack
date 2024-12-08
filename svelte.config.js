import adapter from "@sveltejs/adapter-cloudflare-workers";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  onwarn: (warning, handler) => {
    if (warning.code) {
      return;
    }
    handler(warning); // Handle other warnings normally
  },
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  server: {
    proxy: {
  
    },
  },
   preprocess: vitePreprocess(),
  kit: {
		adapter: adapter({
      config: 'wrangler.toml',
      platformProxy: {
        persist: './static'
      }
		}),
    alias: {
      $lib:"src/lib",
      $components: "src/lib/components",
      $configs: "src/lib/configs",
      $constants: "src/lib/constants",
      $stores: "src/lib/stores",
      $validations: "src/lib/validations",
      "$ai-research-agent": "../",
    }
  }
};

export default config;
