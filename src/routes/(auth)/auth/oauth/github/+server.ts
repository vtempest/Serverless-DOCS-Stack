import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";

import { GITHUB_OAUTH_STATE_COOKIE_NAME } from "$configs/cookies-names";
import { githubOauth } from "$lib/server/auth";
import type { RequestHandler } from "./$types";
import { dev } from "$app/environment";

export const GET: RequestHandler = async ({ cookies }) => {
  const state = generateState();

  const url = await githubOauth.createAuthorizationURL(state, { scopes: ["user:email"] });

  cookies.set(GITHUB_OAUTH_STATE_COOKIE_NAME, state, {
    path: "/",
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 10, // TODO should we export into a constant?
    sameSite: "lax"
  });

  redirect(302, url);
};
