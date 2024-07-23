import { message, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { settingsProfileFormSchema, type SettingsProfileFormSchema } from "$validations/app/settings";
import { fail, type Actions } from "@sveltejs/kit";
import { FLASH_MESSAGE_STATUS } from "$configs/general";
import { verifyRateLimiter } from "$lib/server/security";
import { profileSettingsLimiter } from "$configs/rate-limiters/app";
import { logger } from "$lib/logger";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { route } from "$lib/ROUTES";
import { getUserByUsername, updateUserById } from "$lib/server/db/users";


export const load: PageServerLoad = async ({ locals: { user } }) => {
  // TODO add guard
  const { username } = user!;
  const form = await superValidate<SettingsProfileFormSchema, FlashMessage>({ username }, zod(settingsProfileFormSchema));

  return { form, user };
};

export const actions: Actions = {
  default: async (event) => {
    const { request, locals, cookies } = event;
    const flashMessage = { status: FLASH_MESSAGE_STATUS.ERROR, text: "" };

    const minutes = await verifyRateLimiter(event, profileSettingsLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate<SettingsProfileFormSchema, FlashMessage>(request, zod(settingsProfileFormSchema));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    const { username } = form.data;
    const { id: userId } = locals.user!;

    const existingUser = await getUserByUsername(locals.db, username);
    if (existingUser && existingUser.id !== userId) {
      flashMessage.text = "Username already taken";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 400 });
    }

    const updatedUser = await updateUserById(locals.db, userId, { username });
    if (!updatedUser) {
      flashMessage.text = "User not found";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 400 });
    }

    flashMessage.status = FLASH_MESSAGE_STATUS.SUCCESS;
    flashMessage.text = "Profile updated successfully";

    redirect(route("/app/settings/profile"), flashMessage, cookies);
  }
};
