import { z } from "zod";
import type { Infer } from "sveltekit-superforms";
import { tokenField, emailField } from "$validations/core";

/**
 * First step
 * We need to verify the new email submitted by user
 */
const changeEmailFormSchemaFirstStep = z.object({ email: emailField });
type ChangeEmailFormSchemaFirstStep = Infer<typeof changeEmailFormSchemaFirstStep>;

/**
 * Second step
 * We need to verify the token submitted by user
 */
const changeEmailFormSchemaSecondStep = z.object({ token: tokenField });
type ChangeEmailFormSchemaSecondStep = Infer<typeof changeEmailFormSchemaSecondStep>;

export { changeEmailFormSchemaFirstStep, type ChangeEmailFormSchemaFirstStep, changeEmailFormSchemaSecondStep, type ChangeEmailFormSchemaSecondStep };
