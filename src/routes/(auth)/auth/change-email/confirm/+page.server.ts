import { route } from "$lib/ROUTES";
import type { PageServerLoad } from "./$types";
import { fail, type Actions } from "@sveltejs/kit";
import { changeEmailFormSchemaSecondStep, type ChangeEmailFormSchemaSecondStep } from "$validations/auth";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { logger } from "$lib/logger";
import { updateUserById } from "$lib/server/db/users";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { generateToken, verifyToken } from "$lib/server/auth/auth-utils";
import { TOKEN_TYPE, getTokenByUserId } from "$lib/server/db/tokens";
import { isUserAuthenticated, verifyRateLimiter } from "$lib/server/security";
import { changeEmailLimiter } from "$configs/rate-limiters/auth";
import { FLASH_MESSAGE_STATUS } from "$configs/general";
import { sendEmailChangeEmail } from "$lib/server/email/send";
import { resendChangeEmailLimiter } from "$configs/rate-limiters/auth";


export const load = (async ({ locals, cookies, url }) => {
  isUserAuthenticated(locals, cookies, url);

  const form = await superValidate<ChangeEmailFormSchemaSecondStep, FlashMessage>(zod(changeEmailFormSchemaSecondStep));

  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  confirm: async (event) => {
    const { request, locals, url, cookies, getClientAddress } = event;
    const flashMessage = { status: FLASH_MESSAGE_STATUS.ERROR, text: "" };

    isUserAuthenticated(locals, cookies, url);

    const minutes = await verifyRateLimiter(event, changeEmailLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.error(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate<ChangeEmailFormSchemaSecondStep, FlashMessage>(request, zod(changeEmailFormSchemaSecondStep));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    const { token } = form.data;

    const { id: userId } = locals.user;

    const emailFromDatabase = await verifyToken(locals.db, userId, token, TOKEN_TYPE.EMAIL_CHANGE);
    if (!emailFromDatabase) {
      flashMessage.text =  "Invalid token";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    await locals.lucia.invalidateUserSessions(userId);

    const updatedUser = await updateUserById(locals.db, userId, { email: emailFromDatabase });
    if (!updatedUser) {
      flashMessage.text = "Failed to update user";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 404 });
    }

    flashMessage.status = FLASH_MESSAGE_STATUS.SUCCESS;
    flashMessage.text = "Email changed successfully. You can login now!"
;

    redirect(route("/auth/login"), flashMessage, cookies);
  },

  resendEmail: async (event) => {
    const { locals, url, cookies } = event;
    const flashMessage = { status: FLASH_MESSAGE_STATUS.ERROR, text: "" };

    isUserAuthenticated(locals, cookies, url);

    const minutes = await verifyRateLimiter(event, resendChangeEmailLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const { id: userId, name } = locals.user;

    const tokenFromDatabase = await getTokenByUserId(locals.db, userId, TOKEN_TYPE.EMAIL_CHANGE);
    if (!tokenFromDatabase) {
      flashMessage.text =  "Invalid token";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    const newEmail = tokenFromDatabase.email;

    const newToken = await generateToken(locals.db, userId, newEmail, TOKEN_TYPE.EMAIL_CHANGE);
    if (!newToken) {
      flashMessage.text =  "Failed to generate token";
      logger.error(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    const mailSent = await sendEmailChangeEmail(newEmail, name, newToken.token);
    if (!mailSent) {
      flashMessage.text =  "Failed to send email";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    flashMessage.status = FLASH_MESSAGE_STATUS.SUCCESS;
    flashMessage.text = "Email sent successfully";

    redirect(route("/auth/change-email/confirm"), flashMessage, cookies);
  }
};
