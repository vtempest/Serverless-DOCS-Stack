import type { RetryAfterRateLimiter } from "sveltekit-rate-limiter/server";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Verifies the rate limiter for a given request event.
 *
 * @param {RequestEvent} event - The request event to be checked.
 * @param {RetryAfterRateLimiter} limiter - The rate limiter to be used for checking the event.
 * @returns {string} - A string representation of the retry after time in minutes if the event is limited, otherwise undefined.
 */
export async function verifyRateLimiter(event: RequestEvent, limiter: RetryAfterRateLimiter): Promise<string> {
  const status = await limiter.check(event);
  let retryAfter = "";

  if (status.limited) {
    const retryAfterInMinutes = Math.round(status.retryAfter / 60);
    retryAfter = retryAfterInMinutes.toString();
  }

  return retryAfter;
}
