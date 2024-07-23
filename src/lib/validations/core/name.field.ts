import { z } from "zod";
import { NAME_MAX_LEN, NAME_MIN_LEN } from "$configs/fields-length";


const nameField = z
  .string({ required_error: "Name is required"})
  .trim()
  .min(NAME_MIN_LEN, { message: "Name must be at least "+NAME_MIN_LEN+" characters" })
  .max(NAME_MAX_LEN, { message: "Name must be at least "+NAME_MAX_LEN+" characters"});

export { nameField };
