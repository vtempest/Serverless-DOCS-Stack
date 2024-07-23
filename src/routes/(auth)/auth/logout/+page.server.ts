import { route } from "$lib/ROUTES";
import { destroySession } from "$lib/server/auth/auth-utils";
import { isUserAuthenticated } from "$lib/server/security";
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ locals, url, cookies }) => {
    isUserAuthenticated(locals, cookies, url);

    await locals.lucia.invalidateSession(locals.session.id);
    destroySession(locals.lucia, cookies);

    redirect(302, route("/"));
  }
} satisfies Actions;
