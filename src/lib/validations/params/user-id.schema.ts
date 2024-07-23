import { z } from "zod";
import { userIdField } from "$validations/core";

const userIdSchema = z.object({ userId: userIdField });

export { userIdSchema };
