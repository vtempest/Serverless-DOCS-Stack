import type { ParamMatcher } from "@sveltejs/kit";
import { userIdSchema } from "$validations/params";

export const match: ParamMatcher = (param) => {
  const res = userIdSchema.safeParse({ userId: param });

  return res.success;
};
