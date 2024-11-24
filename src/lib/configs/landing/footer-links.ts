// import { Facebook, GitHub, Instagram, Twitter, Discord } from "$components/icons";
import { route } from "$lib/ROUTES";

const legals = [
  { name: "Privacy Policy", href: route("/legal/privacy-policy") },
  { name: "Terms & Conditions", href: route("/legal/terms-and-conditions") },
];

export const sections = [
  // { name: "socials", data: socials },
  { name: "legal", data: legals }
];

export const socials = [
  // { href: route("facebook"), component: Facebook },
  // { href: route("instagram"), component: Instagram },
  // { href: route("twitter"), component: Twitter },
  // { href: route("github"), component: GitHub },
  // { href: route("discord"), component: Discord }
];
