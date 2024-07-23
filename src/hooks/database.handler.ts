import type { Handle } from "@sveltejs/kit";
import { schema } from "$lib/server/db";
import { drizzle } from "drizzle-orm/d1";

export const database: Handle = async ({ event, resolve }) => {
  event.locals.db = drizzle(event.platform?.env.DB as D1Database, { schema });

  return resolve(event);
};
