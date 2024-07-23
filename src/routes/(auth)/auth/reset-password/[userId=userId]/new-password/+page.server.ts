import { logger } from "$lib/logger";
import { resetPasswordFormSchemaThirdStep, type ResetPasswordFormSchemaThirdStep } from "$validations/auth";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import type { Actions, PageServerLoad } from "./$types";
import { superValidate, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { route } from "$lib/ROUTES";
import { updateUserById } from "$lib/server/db/users";
import { sha256 } from '@noble/hashes/sha256';
import { isAnonymous, verifyRateLimiter } from "$lib/server/security";
import { resetPasswordLimiter } from "$configs/rate-limiters/auth";
import { FLASH_MESSAGE_STATUS } from "$configs/general";
import { fail } from "@sveltejs/kit";


export const load = (async ({ locals }) => {
  isAnonymous(locals);

  const form = await superValidate<ResetPasswordFormSchemaThirdStep, FlashMessage>(zod(resetPasswordFormSchemaThirdStep));

  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const { request, locals, cookies, params, getClientAddress } = event;
    const flashMessage = { status: FLASH_MESSAGE_STATUS.ERROR, text: "" };

    isAnonymous(locals);

    const minutes = await verifyRateLimiter(event, resetPasswordLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate<ResetPasswordFormSchemaThirdStep, FlashMessage>(request, zod(resetPasswordFormSchemaThirdStep));

    const { password } = form.data;

    form.data.password = "";
    form.data.passwordConfirm = "";

    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

   

    const { userId } = params;

    await locals.lucia.invalidateUserSessions(userId);

    const updatedUser = await updateUserById(locals.db, userId, { password: sha256(password) });
    if (!updatedUser) {
      flashMessage.text = "Failed to update user";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    flashMessage.status = FLASH_MESSAGE_STATUS.SUCCESS;
    flashMessage.text =  "Password changed successfully. You can now login.";

    redirect(route("/auth/login"), flashMessage, cookies);
  }
};
