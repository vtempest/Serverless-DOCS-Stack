import { z } from "zod";
import { PASSWORD_MIN_LEN, PASSWORD_MAX_LEN } from "$configs/fields-length";


/**
 * This regex checks if the password is between PASSWORD_MIN_LEN and PASSWORD_MAX_LEN characters.
 * Moreover, it must contain at least
 *  - (?=.*[a-z]) 1 lowercase alphabetical character
 *  - (?=.*[A-Z]) 1 uppercase alphabetical character
 *  - (?=.*[0-9]) 1 numeric character
 *  - (?=.*[!@#$%^&*"'()+,\-./:;<=>?[\]^_`{|}~]) 1 special character
 */
const passwordRegex = new RegExp(
  `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,\\-./:;<=>?[\\]^_\`{|}~])[A-Za-z0-9!@#$%^&*"'()+,\\-./:;<=>?[\\]^_\`{|}~]{${PASSWORD_MIN_LEN},${PASSWORD_MAX_LEN}}$`
);

const passwordField = z
  .string({ required_error: "Password is required" })
  .regex(passwordRegex, { message: "Password is invalid." })
  .min(PASSWORD_MIN_LEN, { message:  "Password minimum length is "+ PASSWORD_MIN_LEN })
  .max(PASSWORD_MAX_LEN, { message: "Password max length is "+ PASSWORD_MAX_LEN });

export { passwordField };
