import { deleteUserById, getAllUsers, updateUserById } from "$lib/server/db/users";
import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { setFlash } from "sveltekit-flash-message/server";
import { FLASH_MESSAGE_STATUS } from "$configs/general";
import { logger } from "$lib/logger";
import {
  deleteUserFormSchema,
  updateUserFormSchema,
  type DeleteUserFormSchema,
  type UpdateUserFormSchema
} from "$validations/admin/database/users.schema";

import { zod } from "sveltekit-superforms/adapters";
import { superValidate, message } from "sveltekit-superforms/server";

export const load = (async ({ locals: { db } }) => {
  const users = await getAllUsers(db);

  const updateForm = await superValidate<UpdateUserFormSchema, FlashMessage>(zod(updateUserFormSchema));
  const deleteForm = await superValidate<DeleteUserFormSchema, FlashMessage>(zod(deleteUserFormSchema));

  return { users, updateForm, deleteForm };
}) satisfies PageServerLoad;

export const actions: Actions = {
  deleteUser: async ({ request, cookies, locals: { db } }) => {
    const flashMessage = { status: FLASH_MESSAGE_STATUS.SUCCESS, text: "User successfully deleted!" };

    const form = await superValidate<DeleteUserFormSchema, FlashMessage>(request, zod(deleteUserFormSchema));
    if (!form.valid) {
      flashMessage.status = FLASH_MESSAGE_STATUS.ERROR;
      flashMessage.text = "Invalid form";
      logger.error(flashMessage.text);

      return message(form, flashMessage);
    }

    const { userId } = form.data;

    const deletedUser = await deleteUserById(db, userId);
    if (!deletedUser) {
      logger.debug("Something went wrong");
      flashMessage.status = FLASH_MESSAGE_STATUS.ERROR;
      flashMessage.text = "Something went wrong!";

      setFlash(flashMessage, cookies);
      return;
    }

    setFlash(flashMessage, cookies);
  },

  updateUser: async ({ request, cookies, locals: { db } }) => {
    const flashMessage = { status: FLASH_MESSAGE_STATUS.SUCCESS, text: "User successfully updated!" };

    const form = await superValidate<UpdateUserFormSchema, FlashMessage>(request, zod(updateUserFormSchema));
    if (!form.valid) {
      flashMessage.status = FLASH_MESSAGE_STATUS.ERROR;
      flashMessage.text = "Invalid form";
      logger.error(flashMessage.text);

      return message(form, flashMessage);
    }

    const { userId, name, email, username, isVerified, isAdmin } = form.data;

    const updatedUser = await updateUserById(db, userId, { name, email, username, isVerified, isAdmin });
    if (!updatedUser) {
      logger.debug("Something went wrong");
      flashMessage.status = FLASH_MESSAGE_STATUS.ERROR;
      flashMessage.text = "Something went wrong!";

      setFlash(flashMessage, cookies);
      return;
    }

    setFlash(flashMessage, cookies);
  }
};
