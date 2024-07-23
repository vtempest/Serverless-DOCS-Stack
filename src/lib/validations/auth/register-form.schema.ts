import { z } from "zod";
import type { Infer } from "sveltekit-superforms";
import {
  nameField,
  emailField,
  passwordField,
  passwordConfirmField,
  passwordConfirmMustBeEqualToPassword,
} from "$validations/core";

const registerFormSchema = z
  .object({ name: nameField, email: emailField, password: passwordField, passwordConfirm: passwordConfirmField })
  .superRefine(passwordConfirmMustBeEqualToPassword);

type RegisterFormSchema = Infer<typeof registerFormSchema>;

export { registerFormSchema, type RegisterFormSchema };
