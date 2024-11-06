import { signupMock } from "./userauth/signup";
import { sendEmailConfirmationMock } from "./userauth/verfiyEmail";
import { forgetPassword, resetPassword } from "./userauth/resetpassword";
import { verifyEmailMock } from "./userauth/verfiyEmail";
import { loginMock } from "./userauth/login";
import { logoutMock } from "./userauth/logout";
import { privacySettingsMock } from "./privacySettings";
import { OauthMock } from "./oauth/oauth";
import { profileSettingsMock } from "./profile-settings/profile-settings";
import { profilePictureMock } from "./profile-settings/profile-picture";

export default [
  ...loginMock,
  ...OauthMock,
  ...signupMock,
  ...sendEmailConfirmationMock,
  ...verifyEmailMock,
  ...forgetPassword,
  ...resetPassword,
  ...privacySettingsMock,
  ...logoutMock,
  ...profileSettingsMock,
  ...profilePictureMock,
];
