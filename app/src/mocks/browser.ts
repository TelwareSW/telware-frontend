import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { sendResetPassword } from "./resetpassword";

export const worker = setupWorker(...handlers, ...sendResetPassword);
