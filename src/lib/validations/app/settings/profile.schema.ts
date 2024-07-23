import { z } from "zod";
import type { Infer } from "sveltekit-superforms";
import { usernameField } from "$validations/core";

const settingsProfileFormSchema = z.object({ username: usernameField });

type SettingsProfileFormSchema = Infer<typeof settingsProfileFormSchema>;

export { settingsProfileFormSchema, type SettingsProfileFormSchema };
