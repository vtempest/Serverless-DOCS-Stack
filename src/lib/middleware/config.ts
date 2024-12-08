// DOMAIN SPECIFIC CUSTOMIZATION

export const PUBLIC_DOMAIN = "starterdocs.vtempest.workers.dev",
  APP_NAME = "Svelte Starter DOCS",
  APP_EMAIL = "support@" + PUBLIC_DOMAIN,
  APP_ICON = "/icons/apple-touch-icon.png",
  GOOGLE_ANALYTICS = "G-E5TZ32BZDF",
  COOKIE_NAME = "site",
  FOOTER_LINKS = [
    { url: "https://starterdocs.js.org", text: "Docs" },
    { url: "https://github.com/vtempest/Svelte-Starter-DOCS/", text: "Github" },
    { url: "https://discord.gg/SJdBqBz3tV", text: "Support" },
    { url: "/legal/privacy", text: "Privacy" },
    { url: "/legal/terms", text: "Terms" },
  ];

// DEV MODE: DECIDE TO USE PUBLIC DOMAIN OR LOCALHOST

export const ORIGIN_DEV = "http://localhost:5173",
  isChromeExtension = typeof chrome !== "undefined";
function isCloudflare() {
  if (typeof process !== "undefined")
    return !!process.env.CF_PAGES || !!process.env.CLOUDFLARE_WORKERS;
  if (typeof globalThis !== "undefined")
    return !!(globalThis.caches && globalThis.caches.default);
  return false;
}
export const ORIGIN =
  isCloudflare() || isChromeExtension ? "https://" + PUBLIC_DOMAIN : ORIGIN_DEV;
