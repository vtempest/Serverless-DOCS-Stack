import { redirect } from "@sveltejs/kit";
import { generateCodeVerifier, generateState } from "arctic";

import { GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME, GOOGLE_OAUTH_STATE_COOKIE_NAME } from "$configs/cookies-names";
import { googleOauth } from "$lib/server/auth";
import type { RequestHandler } from "./$types";
import { dev } from "$app/environment";

export const GET: RequestHandler = async ({ cookies }) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await googleOauth.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"]
  });

  cookies.set(GOOGLE_OAUTH_STATE_COOKIE_NAME, state, {
    path: "/",
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });

  cookies.set(GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME, codeVerifier, {
    path: "/",
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });

  redirect(302, url);
};
