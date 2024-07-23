import { RetryAfterRateLimiter } from "sveltekit-rate-limiter/server";

export const accountSettingsLimiter = new RetryAfterRateLimiter({
  IP: [3, "h"],
  IPUA: [3, "h"]
});

export const notificationsSettingsLimiter = new RetryAfterRateLimiter({
  IP: [3, "h"],
  IPUA: [3, "h"]
});

export const profileSettingsLimiter = new RetryAfterRateLimiter({
  IP: [3, "h"],
  IPUA: [3, "h"]
});
