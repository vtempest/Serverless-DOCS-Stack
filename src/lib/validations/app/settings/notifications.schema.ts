import { z } from "zod";
import type { Infer } from "sveltekit-superforms";
import { nameField } from "$validations/core";

const settingsNotificationsFormSchema = z.object({ name: nameField });

type SettingsNotificationsFormSchema = Infer<typeof settingsNotificationsFormSchema>;

export { settingsNotificationsFormSchema, type SettingsNotificationsFormSchema };
