import { z } from "zod";

export const isAdminField = z.boolean().default(false);
