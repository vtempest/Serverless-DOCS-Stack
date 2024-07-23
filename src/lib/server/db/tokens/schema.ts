import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "../schema";
import { TOKEN_EXPIRATION_TIME, TOKEN_LEN } from "../../../configs/fields-length";
import { TOKEN_TYPE } from "./types";
import { TimeSpan, generateId } from "lucia";
import { createDate } from "oslo";

export const tokens = sqliteTable("tokens", {
  token: text("token", { length: TOKEN_LEN })
    .primaryKey()
    .$default(() => generateId(TOKEN_LEN)),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" })
    .notNull()
    .$default(() => createDate(new TimeSpan(TOKEN_EXPIRATION_TIME, "m"))),
  type: text("type", { enum: [TOKEN_TYPE.EMAIL_CHANGE, TOKEN_TYPE.EMAIL_VERIFICATION, TOKEN_TYPE.PASSWORD_RESET] }),
  email: text("email").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
});
