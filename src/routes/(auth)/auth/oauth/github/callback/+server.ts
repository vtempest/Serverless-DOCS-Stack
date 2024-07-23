import type { RequestHandler } from "./$types";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { route } from "$lib/ROUTES";
import { GITHUB_OAUTH_STATE_COOKIE_NAME } from "$configs/cookies-names";
import { error } from "@sveltejs/kit";
import { githubOauth } from "$lib/server/auth";
import { getUserByEmail, users } from "$lib/server/db/users";
import { getOAuthAccountByProviderUserId, oauthAccounts } from "$lib/server/db/oauth-accounts";
import { createAndSetSession } from "$lib/server/auth/auth-utils";
import { logger } from "$lib/logger";
import { redirect } from "sveltekit-flash-message/server";
import { AUTH_METHODS } from "$configs/auth-methods";
import { eq } from "drizzle-orm";


type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
};

type GitHubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
};

export const GET: RequestHandler = async ({ url, cookies, locals: { db, lucia } }) => {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies.get(GITHUB_OAUTH_STATE_COOKIE_NAME);

  if (!code || !state || !storedState || state !== storedState) {
    error(400, "Invalid OAuth state or code verifier");
  }

  try {
    // validate the authorization code and retrieve the tokens
    const tokens = await githubOauth.validateAuthorizationCode(code);
    console.log((tokens));

    // fetch the GitHub user associated with the access token
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });

    // fetch the primary email address of the GitHub user
    const githubEmailResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    console.log(JSON.stringify(githubUserResponse));
    const githubUser = (await githubUserResponse.json()) as GitHubUser;
    const githubEmail = (await githubEmailResponse.json()) as GitHubEmail[];

    const primaryEmail = githubEmail.find((email) => email.primary) ?? null;

    if (!primaryEmail) {
      error(400, "No primary email address");
    }

    if (!primaryEmail.verified) {
      error(400, "Unverified email");
    }

    // check if the user already exists
    const existingUser = await getUserByEmail(db, primaryEmail.email);

    if (existingUser) {
      // check if the user already has a GitHub OAuth account linked
      const existingOauthAccount = await getOAuthAccountByProviderUserId(db, AUTH_METHODS.GITHUB, githubUser.id.toString());

      if (!existingOauthAccount) {
        // add the 'github' auth provider to the user's authMethods list
        const authMethods = existingUser.authMethods || [];
        authMethods.push(AUTH_METHODS.GITHUB);

        await db.batch([
          // link the GitHub OAuth account to the existing user
          db
            .insert(oauthAccounts)
            .values({
              userId: existingUser.id,
              providerId: AUTH_METHODS.GITHUB,
              providerUserId: githubUser.id.toString()
            })
            .onConflictDoNothing()
            .returning(),

          // update the user's authMethods list
          db
            .update(users)
            .set({
              name: githubUser.name,
              avatarUrl: githubUser.avatar_url,
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
            name: githubUser.name,
            username: githubUser.login,
            avatarUrl: githubUser.avatar_url,
            email: primaryEmail.email,
            isVerified: true,
            authMethods: [AUTH_METHODS.GITHUB]
          })
          .onConflictDoNothing()
          .returning(),

        // create a new GitHub OAuth account
        db
          .insert(oauthAccounts)
          .values({
            userId,
            providerId: AUTH_METHODS.GITHUB,
            providerUserId: githubUser.id.toString()
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
