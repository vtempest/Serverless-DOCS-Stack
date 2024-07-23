import { EMAIL_MAX_LEN, EMAIL_MIN_LEN } from "$configs/fields-length";
import { z } from "zod";


const emailField = z
  .string({ required_error: "Email is required" })
  .trim()
  .email({ message: "Email must be a valid email address" })
  .min(EMAIL_MIN_LEN, { message: "Email must be at least "+EMAIL_MIN_LEN+" characters"} )
  .max(EMAIL_MAX_LEN, { message: "Email must not exceed "+EMAIL_MAX_LEN+" characters"  });

export { emailField };
