import { USER_ID_LEN } from "$configs/fields-length";
import { z } from "zod";


// TODO add regex to check lowercase and numbers
const userIdField = z
  .string({ required_error: "UserId is required" })
  .trim()
  .length(USER_ID_LEN, { message:  "User id must be "+USER_ID_LEN+" characters" });

export { userIdField };
