import { route } from "$lib/ROUTES";
import type { PageServerLoad } from "./$types";
import { type Actions, fail } from "@sveltejs/kit";
import { verifyEmailFormSchema, type VerifyEmailFormSchema } from "$validations/auth";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { logger } from "$lib/logger";
import { createAndSetSession, generateToken, verifyToken } from "$lib/server/auth/auth-utils";
import { getUserByEmail, updateUserById } from "$lib/server/db/users";
import { sendEmailVerificationEmail, sendWelcomeEmail } from "$lib/server/email/send";
import { AUTH_METHODS } from "$configs/auth-methods";
import { TOKEN_TYPE } from "$lib/server/db/tokens";
import { isUserNotVerified, verifyRateLimiter } from "$lib/server/security";
import { FLASH_MESSAGE_STATUS } from "$configs/general";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { verifyEmailLimiter, resendVerifyEmailLimiter } from "$configs/rate-limiters/auth";

export const load = (async ({ locals, cookies, url }) => {

  
  let token = url.searchParams.get('token');

  console.log(token);

  isUserNotVerified(locals, cookies, url);

  const form = await superValidate<VerifyEmailFormSchema, FlashMessage>(zod(verifyEmailFormSchema));

  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  confirm: async (event) => {
    const { request, locals, url, cookies, getClientAddress } = event;
    const flashMessage = { status: FLASH_MESSAGE_STATUS.ERROR, text: "" };

    isUserNotVerified(locals, cookies, url);

    const minutes = await verifyRateLimiter(event, verifyEmailLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate<VerifyEmailFormSchema, FlashMessage>(request, zod(verifyEmailFormSchema));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    const { id: userId, email, name } = locals.user;
    const { token } = form.data;

    const isValidToken = await verifyToken(locals.db, userId, token, TOKEN_TYPE.EMAIL_VERIFICATION, email);
    if (!isValidToken) {
      flashMessage.text =  "Invalid token";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    await locals.lucia.invalidateUserSessions(userId);

    const existingUser = await getUserByEmail(locals.db, email);
    if (!existingUser) {
      flashMessage.text = "User not found";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 404 });
    }

    const authMethods = existingUser.authMethods ?? [];
    authMethods.push(AUTH_METHODS.EMAIL);

    const updatedUser = await updateUserById(locals.db, userId, { isVerified: true, authMethods });
    if (!updatedUser) {
      flashMessage.text = "Failed to update user";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 404 });
    }

    await createAndSetSession(locals.lucia, userId, cookies);
    await sendWelcomeEmail(email, name);

    flashMessage.status = FLASH_MESSAGE_STATUS.SUCCESS;
    flashMessage.text =  "Email verified successfully";

    redirect(route("/app/dashboard"), flashMessage, cookies);
  },

  resendEmail: async (event) => {
    const { locals, url, cookies } = event;
    const flashMessage = { status: FLASH_MESSAGE_STATUS.ERROR, text: "" };


    isUserNotVerified(locals, cookies, url);

    const minutes = await verifyRateLimiter(event, resendVerifyEmailLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const { id: userId, name, email } = locals.user;

    const newToken = await generateToken(locals.db, userId, email, TOKEN_TYPE.EMAIL_VERIFICATION);
    if (!newToken) {
      flashMessage.text =  "Failed to generate token";
      logger.error(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    const mailSent = await sendEmailVerificationEmail(email, name, newToken.token);
    if (!mailSent) {
      flashMessage.text =  "Failed to send email";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    flashMessage.status = FLASH_MESSAGE_STATUS.SUCCESS;
    flashMessage.text = "Email sent successfully";

    redirect(route("/auth/verify-email"), flashMessage, cookies);
  }
};
