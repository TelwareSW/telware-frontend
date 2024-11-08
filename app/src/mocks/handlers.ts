import { signupMock } from "./userauth/signup";
import { sendEmailConfirmationMock } from "./userauth/verfiyEmail";
import { forgetPassword, resetPassword } from "./userauth/resetpassword";
import { verifyEmailMock } from "./userauth/verfiyEmail";
import { loginMock } from "./userauth/login";
import { logoutMock } from "./userauth/logout";
import { privacySettingsMock } from "./privacy-settings/privacySettings";
import { OauthMock } from "./oauth/oauth";
import { profileSettingsMock } from "./profile-settings/profile-settings";
import { chats } from "./chats/chat";
import { profilePictureMock } from "./profile-settings/profile-picture";
import { storiesMock } from "./stories/stories";

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
  ...chats,
  ...profilePictureMock,
  ...storiesMock,
];
