import { z } from "zod";
import { tokenField } from "$validations/core";

const tokenSchema = z.object({ token: tokenField });

export { tokenSchema };
