import { TOKEN_LEN } from "$configs/fields-length";
import { z } from "zod";


// TODO add regex to check for lowercases, uppercases and numbers
const tokenField = z
  .string({ required_error: "Token is required." })
  .trim()
  .length(TOKEN_LEN, { message: "Token must be "+TOKEN_LEN+" characters"});

export { tokenField };
