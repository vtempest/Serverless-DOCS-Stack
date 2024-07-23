import { message, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { settingsAccountFormSchema, type SettingsAccountFormSchema } from "$validations/app/settings";
import { fail, type Actions } from "@sveltejs/kit";
import { FLASH_MESSAGE_STATUS } from "$configs/general";
import { verifyRateLimiter } from "$lib/server/security";
import { accountSettingsLimiter } from "$configs/rate-limiters/app";
import { logger } from "$lib/logger";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { updateUserById } from "$lib/server/db/users";
import { route } from "$lib/ROUTES";


export const load: PageServerLoad = async ({ locals: { user } }) => {
  // TODO add guard
  const { name } = user!;
  const form = await superValidate<SettingsAccountFormSchema, FlashMessage>({ name }, zod(settingsAccountFormSchema));

  return { form, user };
};

export const actions: Actions = {
  default: async (event) => {
    const { request, locals, cookies } = event;
    const flashMessage = { status: FLASH_MESSAGE_STATUS.ERROR, text: "" };

    const minutes = await verifyRateLimiter(event, accountSettingsLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate<SettingsAccountFormSchema, FlashMessage>(request, zod(settingsAccountFormSchema));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    // TODO check this !
    const { name } = form.data;
    const { id: userId } = locals.user!;

    const updatedUser = await updateUserById(locals.db, userId, { name });
    if (!updatedUser) {
      flashMessage.text = "User not found";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 400 });
    }

    flashMessage.status = FLASH_MESSAGE_STATUS.SUCCESS;
    flashMessage.text = "Account updated successfully";

    redirect(route("/app/settings/account"), flashMessage, cookies);
  }
};
