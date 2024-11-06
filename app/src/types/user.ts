enum privacyStates {
  EVERYONE = "everyone",
  CONTACTS = "contacts",
  NOBODY = "nobody",
}

enum activeStates {
  ENABLED = "enabled",
  DISABLED = "disabled",
}

type privacyStatesStrings = keyof typeof privacyStates;
type activeStatesStrings = keyof typeof activeStates;

interface privacySettingsInterface {
  storiesSeenPrivacy: privacyStates;
  lastSeenPrivacy: privacyStates;
  profilePhotoPrivacy: privacyStates;
}

interface activitySettingsInterface {
  readReceiptsPrivacy: activeStates;
}

interface permissionsSettingsInterface {
  addToGroupPrivacy: permissionStates;
  addToChannelPrivacy: permissionStates;
}

interface userInfoInterface {
  username: string;
  screenName: string;
  email: string;
  photo?: string;
  status: string;
  bio: string;
}

interface updatePrivacyInterface {
  key: keyof privacySettingsInterface;
  value: privacyStatesStrings;
}

interface updateInfoInterface {
  key: keyof userInfoInterface;
  value: string;
}

interface updateActivityInterface {
  key: keyof activitySettingsInterface;
  value: activeStatesStrings;
}
interface otherUserInfoInterface {
  username: string;
  phoneNumber: string;
  screenFirstName: string;
  screenLastName: string;
  email: string;
  photo: string | undefined;
  status: string;
  bio: string;
}
export { activeStates, privacyStates };

interface updatePermissionInterface {
  key: keyof permissionsSettingsInterface;
  value: permissionStatesStrings;
}

export { activeStates, privacyStates, permissionStates };
export type {
  activitySettingsInterface,
  privacySettingsInterface,
  updateActivityInterface,
  updateInfoInterface,
  updatePrivacyInterface,
  userInfoInterface,
  otherUserInfoInterface,
  permissionsSettingsInterface,
  updatePermissionInterface,
};
