import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { oauthAccounts } from ".";

export type DbOauthAccount = InferSelectModel<typeof oauthAccounts>;
export type DbInsertOauthAccount = InferInsertModel<typeof oauthAccounts>;
export type DbUpdateOauthAccount = Partial<DbOauthAccount>;
