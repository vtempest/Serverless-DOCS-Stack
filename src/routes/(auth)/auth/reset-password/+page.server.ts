import { route } from "$lib/ROUTES";
import type { PageServerLoad } from "./$types";
import { fail, type Actions } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { logger } from "$lib/logger";
import { resetPasswordFormSchemaFirstStep, type ResetPasswordFormSchemaFirstStep } from "$validations/auth";
import { getUserByEmail } from "$lib/server/db/users";
import { sendPasswordResetEmail } from "$lib/server/email/send";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { generateToken } from "$lib/server/auth/auth-utils";
import { TOKEN_TYPE } from "$lib/server/db/tokens";
import { isAnonymous, verifyRateLimiter } from "$lib/server/security";
import { resetPasswordLimiter } from "$configs/rate-limiters/auth";
import { FLASH_MESSAGE_STATUS } from "$configs/general";


export const load = (async ({ locals }) => {
  isAnonymous(locals);

  const form = await superValidate<ResetPasswordFormSchemaFirstStep, FlashMessage>(zod(resetPasswordFormSchemaFirstStep));

  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const { request, locals, cookies, getClientAddress } = event;
    const flashMessage = { status: FLASH_MESSAGE_STATUS.ERROR, text: "" };

    isAnonymous(locals);

    const minutes = await verifyRateLimiter(event, resetPasswordLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate<ResetPasswordFormSchemaFirstStep, FlashMessage>(request, zod(resetPasswordFormSchemaFirstStep));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    const { email } = form.data;
    const userFromDb = await getUserByEmail(locals.db, email);
    if (!userFromDb) {
      flashMessage.status = FLASH_MESSAGE_STATUS.SUCCESS;
      flashMessage.text = "Email sent successfully";

      // we send a success message even if the user doesn't exist to prevent email enumeration
      redirect(route("/"), flashMessage, cookies);
    }

    const { id: userId } = userFromDb;

    const newToken = await generateToken(locals.db, userId, email, TOKEN_TYPE.PASSWORD_RESET);
    if (!newToken) {
      flashMessage.text =  "Failed to generate token";
      logger.error(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    const mailSent = await sendPasswordResetEmail(email, newToken.token);
    if (!mailSent) {
      flashMessage.text =  "Failed to send email";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    flashMessage.status = FLASH_MESSAGE_STATUS.SUCCESS;
    flashMessage.text = "Email sent successfully";

    redirect(route("/auth/reset-password/[userId=userId]", { userId }), flashMessage, cookies);
  }
};
