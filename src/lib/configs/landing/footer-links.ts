import { Facebook, GitHub, Instagram, TikTok, Twitter, Discord } from "$components/icons";
import { route } from "$lib/ROUTES";

const resources = [
//   { name: "Svelte", href: route("svelte") },
//   { name: "Tailwind CSS", href: route("tailwind") },
//   { name: "Drizzle ORM", href: route("drizzle") },
//   { name: "Lucia", href: route("lucia") }
];

// TODO should I translate these?
const legals = [
  { name: "Privacy Policy", href: route("/legal/privacy-policy") },
  { name: "Terms & Conditions", href: route("/legal/terms-and-conditions") },
  { name: "Cookie Policy", href: route("/legal/cookie-policy") }
];

export const sections = [
  // { name: "resources", data: resources },
  { name: "legal", data: legals }
];

export const socials = [
  // { href: route("facebook"), component: Facebook },
  // { href: route("instagram"), component: Instagram },
  // { href: route("twitter"), component: Twitter },
  { href: route("github"), component: GitHub },
  // { href: route("tiktok"), component: TikTok },
  // { href: route("discord"), component: Discord }
];
