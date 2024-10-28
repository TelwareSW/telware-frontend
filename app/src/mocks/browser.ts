import { setupWorker } from "msw/browser";

import { signupMock } from "./userauth/signup";
import { sendEmailConfirmationMock } from "./userauth/verfiyEmail";
import { forgetPassword, resetPassword } from "./userauth/resetpassword";
import { verifyEmailMock } from "./userauth/verfiyEmail";
import { loginMock } from "./userauth/login";
import { logoutMock } from "./userauth/logout";

import { privacySettingsMock } from "./privacySettings";

import { OauthMock } from "./oauth/oauth";

export const worker = setupWorker(
  ...loginMock,
  ...OauthMock,
  ...signupMock,
  ...sendEmailConfirmationMock,
  ...verifyEmailMock,
  ...forgetPassword,
  ...resetPassword,
  ...privacySettingsMock,
  ...logoutMock
);
