import { RetryAfterRateLimiter } from "sveltekit-rate-limiter/server";

export const loginLimiter = new RetryAfterRateLimiter({
  IP: [5, "h"],
  IPUA: [5, "h"]
});
