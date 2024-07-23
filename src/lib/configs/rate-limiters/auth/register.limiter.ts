import { RetryAfterRateLimiter } from "sveltekit-rate-limiter/server";

export const registerLimiter = new RetryAfterRateLimiter({
  IP: [5, "h"],
  IPUA: [5, "h"]
});
