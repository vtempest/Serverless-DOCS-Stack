import { z } from "zod";
import type { Infer } from "sveltekit-superforms";
import { nameField } from "$validations/core";

const settingsAccountFormSchema = z.object({ name: nameField });

type SettingsAccountFormSchema = Infer<typeof settingsAccountFormSchema>;

export { settingsAccountFormSchema, type SettingsAccountFormSchema };
