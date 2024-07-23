import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { tokens } from ".";

export type DbToken = InferSelectModel<typeof tokens>;
export type DbInsertToken = InferInsertModel<typeof tokens>;
export type DbUpdateToken = Partial<DbToken>;

export enum TOKEN_TYPE {
  EMAIL_CHANGE = "email_change",
  EMAIL_VERIFICATION = "email_verification",
  PASSWORD_RESET = "password_reset"
}
