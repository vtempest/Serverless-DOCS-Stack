import { z } from "zod";
import type { Infer } from "sveltekit-superforms";
import { tokenField } from "$validations/core";

const verifyEmailFormSchema = z.object({ token: tokenField });

type VerifyEmailFormSchema = Infer<typeof verifyEmailFormSchema>;

export { verifyEmailFormSchema, type VerifyEmailFormSchema };
