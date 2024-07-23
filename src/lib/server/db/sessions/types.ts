import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { sessions } from ".";

export type DbSession = InferSelectModel<typeof sessions>;
export type DbInsertSession = InferInsertModel<typeof sessions>;
export type DbUpdateSession = Partial<DbSession>;
