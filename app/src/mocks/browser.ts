import { setupWorker } from "msw/browser";
import { loginMock } from "./userauth/login";
import { signupMock } from "./userauth/signup";
export const worker = setupWorker(...loginMock, ...signupMock);
