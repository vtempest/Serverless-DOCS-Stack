import { redirect } from "sveltekit-flash-message/server";
import type { PageServerLoad } from "./$types";
import { route } from "$lib/ROUTES";

export const load = (async () => {
  redirect(303, route("/app/settings/profile"));
}) satisfies PageServerLoad;
