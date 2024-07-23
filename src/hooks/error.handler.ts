import { logger } from "$lib/logger";
import type { HandleServerError } from "@sveltejs/kit";

// TODO implement this handler
export const handleError: HandleServerError = ({ status, message, error }) => {
  if (status !== 404) {
    logger.error(error);
  }

  // do not return sensitive data here as it will be sent to the client
  return { message };
};
