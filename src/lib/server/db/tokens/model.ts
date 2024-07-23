import { eq, and } from "drizzle-orm";
import { tokens } from "../schema";
import type { DbInsertToken, DbToken, TOKEN_TYPE } from "./types";
import type { Database } from "../types";

/*
 * CREATE
 **/
export async function createToken(db: Database, newToken: DbInsertToken) {
  const res = await db.insert(tokens).values(newToken).onConflictDoNothing().returning();

  if (res.length === 0) return;

  return res[0];
}

/*
 * READ
 **/
export async function getToken(db: Database, token: string): Promise<DbToken | undefined> {
  if (!token) return;

  return await db.query.tokens.findFirst({ where: eq(tokens.token, token) });
}

export async function getTokenByUserId(db: Database, userId: string, type: TOKEN_TYPE): Promise<DbToken | undefined> {
  if (!userId || !type) return;

  return await db.query.tokens.findFirst({ where: and(eq(tokens.userId, userId), eq(tokens.type, type)) });
}

/*
 * UPDATE
 **/

/*
 * DELETE
 **/
export async function deleteAllTokensByUserId(db: Database, userId: string, type: TOKEN_TYPE): Promise<DbToken[] | undefined> {
  if (!userId || !type) return;

  const res = await db
    .delete(tokens)
    .where(and(eq(tokens.userId, userId), eq(tokens.type, type)))
    .returning();

  if (res.length === 0) return;

  return res;
}

export async function deleteToken(db: Database, token: string, type: TOKEN_TYPE): Promise<DbToken | undefined> {
  if (!token || !type) return;

  const res = await db
    .delete(tokens)
    .where(and(eq(tokens.token, token), eq(tokens.type, type)))
    .returning();

  if (res.length === 0) return;

  return res[0];
}
