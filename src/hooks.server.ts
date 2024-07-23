import { sequence } from "@sveltejs/kit/hooks";
import { authentication } from "./hooks/authentication.handler";
import { authorization } from "./hooks/authorization.handler";
import { database } from "./hooks/database.handler";

export { handleError } from "./hooks/error.handler";

export const handle = sequence(database, authentication, authorization);
