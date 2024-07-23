import { getUserById } from "$lib/server/db/users";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { updateUserFormSchema, type UpdateUserFormSchema } from "$validations/admin/database/users.schema";
import { zod } from "sveltekit-superforms/adapters";


export const load = (async ({ locals, params }) => {
  const user = await getUserById(locals.db, params.userId);

  if (!user) {
    error(404, "User not found");
  }

  const form = await superValidate<UpdateUserFormSchema, FlashMessage>(user, zod(updateUserFormSchema));

  return { form, user };
}) satisfies PageServerLoad;

// export const actions: Actions = {
//   updateUser: async ({ request, cookies, locals: { db } }) => {
//     // TODO switch to zod
//     const data = await request.formData();
//     const userId = data.get("userId") as string;

//     const res = await deleteUserById(db, userId);
//     if (res) {
//       setFlash({ status: "success", text: "Success!" }, cookies);
//       return;
//     }

//     setFlash({ status: "error", text: "Error" }, cookies);
//   }
// };
