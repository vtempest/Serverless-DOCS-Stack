import type { RequestHandler } from "./$types";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { route } from "$lib/ROUTES";
import { GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME, GOOGLE_OAUTH_STATE_COOKIE_NAME } from "$configs/cookies-names";
import { AUTH_METHODS } from "$configs/auth-methods";
import { error } from "@sveltejs/kit";
import { googleOauth } from "$lib/server/auth";
import { redirect } from "sveltekit-flash-message/server";
import { logger } from "$lib/logger";
import { getUserByEmail, users } from "$lib/server/db/users";
import { getOAuthAccountByProviderUserId, oauthAccounts } from "$lib/server/db/oauth-accounts";
import { createAndSetSession } from "$lib/server/auth/auth-utils";
import { eq } from "drizzle-orm";


type GoogleUser = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
};

export const GET: RequestHandler = async ({ cookies, url, locals: { db, lucia } }) => {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const stateCookie = cookies.get(GOOGLE_OAUTH_STATE_COOKIE_NAME);
  const codeVerifierCookie = cookies.get(GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME);

  // validate OAuth state and code verifier
  if (!code || !state || !stateCookie || !codeVerifierCookie || state !== stateCookie) {
    error(400, "Invalid OAuth state or code verifier");
  }

  try {
    const tokens = await googleOauth.validateAuthorizationCode(code, codeVerifierCookie);

    const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });

    const googleUser = (await googleUserResponse.json()) as GoogleUser;

    if (!googleUser.email) {
      error(400, "No primary email address");
    }

    if (!googleUser.email_verified) {
      error(400, "Unverified email");
    }

    // check if the user already exists
    const existingUser = await getUserByEmail(db, googleUser.email);

    if (existingUser) {
      // check if the user already has a Google OAuth account linked
      const existingOauthAccount = await getOAuthAccountByProviderUserId(db, AUTH_METHODS.GOOGLE, googleUser.sub);

      if (!existingOauthAccount) {
        // add the 'google' auth provider to the user's authMethods list
        const authMethods = existingUser.authMethods || [];
        authMethods.push(AUTH_METHODS.GOOGLE);

        await db.batch([
          // link the Google OAuth account to the existing user
          db
            .insert(oauthAccounts)
            .values({
              userId: existingUser.id,
              providerId: AUTH_METHODS.GOOGLE,
              providerUserId: googleUser.sub
            })
            .onConflictDoNothing()
            .returning(),

          // update the user's authMethods list
          db
            .update(users)
            .set({
              name: googleUser.name,
              avatarUrl: googleUser.picture,
              authMethods
            })
            .where(eq(users.id, existingUser.id))
            .returning()
        ]);
      }

      await createAndSetSession(lucia, existingUser.id, cookies);
    } else {
      const userId = generateId(15);

      // if user doesn't exist in db
      await db.batch([
        // create a new user
        db
          .insert(users)
          .values({
            id: userId,
            name: googleUser.name,
            username: googleUser.email.split("@")[0] + generateId(5),
            avatarUrl: googleUser.picture,
            email: googleUser.email,
            isVerified: true,
            authMethods: [AUTH_METHODS.GOOGLE]
          })
          .onConflictDoNothing()
          .returning(),

        // create a new Google OAuth account
        db
          .insert(oauthAccounts)
          .values({
            userId,
            providerId: AUTH_METHODS.GOOGLE,
            providerUserId: googleUser.sub
          })
          .onConflictDoNothing()
          .returning()
      ]);

      await createAndSetSession(lucia, userId, cookies);
    }
  } catch (e) {
    logger.error(e);

    if (e instanceof OAuth2RequestError) {
      error(400);
    }

    error(500);
  }

  redirect(303, route("/app/dashboard"));
};
