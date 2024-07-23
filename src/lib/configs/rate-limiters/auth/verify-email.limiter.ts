import { RetryAfterRateLimiter } from "sveltekit-rate-limiter/server";

export const verifyEmailLimiter = new RetryAfterRateLimiter({
  IP: [5, "h"],
  IPUA: [5, "h"]
});
