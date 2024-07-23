import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { users } from ".";

export type DbUser = InferSelectModel<typeof users>;
export type DbInsertUser = InferInsertModel<typeof users>;
export type DbUpdateUser = Partial<DbUser>;
