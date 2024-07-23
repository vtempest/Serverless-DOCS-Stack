import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "../users/schema";
import { SESSION_ID_LEN } from "../../../configs/fields-length";

export const sessions = sqliteTable("sessions", {
  id: text("id", { length: SESSION_ID_LEN }).notNull().primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
});
