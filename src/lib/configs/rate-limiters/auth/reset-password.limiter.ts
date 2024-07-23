import { RetryAfterRateLimiter } from "sveltekit-rate-limiter/server";

export const resetPasswordLimiter = new RetryAfterRateLimiter({
  IP: [5, "h"],
  IPUA: [5, "h"]
});
