import { z } from "zod";
import type { Infer } from "sveltekit-superforms";
import { nameField } from "$validations/core";

// TODO implement this schema
const updateUserFormSchema = z.object({ name: nameField });

type UpdateUserFormSchema = Infer<typeof updateUserFormSchema>;

export { updateUserFormSchema, type UpdateUserFormSchema };
