import { setupWorker } from "msw/browser";
import { loginMock } from "./userauth/login";
import { signupMock } from "./userauth/signup";
import { sendEmailConfirmationMock } from "./userauth/verfiyEmail";
import { verifyEmailMock } from "./userauth/verfiyEmail";
import { forgetPassword, resetPassword } from "./userauth/resetpassword";
export const worker = setupWorker(
  ...loginMock,
  ...signupMock,
  ...sendEmailConfirmationMock,
  ...verifyEmailMock,
  ...forgetPassword,
  ...resetPassword
);
