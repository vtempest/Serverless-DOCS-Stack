import { logger } from "$lib/logger";
import type { Handle } from "@sveltejs/kit";

import { initializeLucia } from "$lib/server/auth";
import { destroySession, setNewSession } from "$lib/server/auth/auth-utils";

export const authentication: Handle = async ({ event, resolve }) => {
  event.locals.lucia = initializeLucia(event.platform?.env.DB as D1Database);

  const lucia = event.locals.lucia;

  // retrieve the sessionId from the browser's cookies
  const sessionId = event.cookies.get(lucia.sessionCookieName);

  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;

    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);

  // if the session is newly created (due to session expiration extension), generate a new session cookie
  if (session?.fresh) {
    setNewSession(lucia, session.id, event.cookies);
  }

  // if the session is invalid, generate a blank session cookie to remove the existing session cookie from the browser
  if (!session) {
    destroySession(lucia, event.cookies);
  }

  event.locals.user = user;
  event.locals.session = session;

  // logger.debug(user, "User");
  // logger.debug(session, "Session");

  return resolve(event);
};
