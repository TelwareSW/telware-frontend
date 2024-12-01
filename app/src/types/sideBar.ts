enum sideBarPages {
  SETTINGS,
  PRIVACY_SETTINGS,
  CHATS,
  CONTACTS,
  SETTINGS_UPDATE,
  PROFILE_UPDATE,
  BLOCKED_USERS,
  DEVICES,
}

type pagesStrings = keyof typeof sideBarPages;

enum privacySettingsID {
  STORIES_SEEN_PRIVACY,
  LAST_SEEN_PRIVACY,
  PROFILE_PHOTO_PRIVACY,
  BLOCK_PRIVACY,
}

enum activitySettingsID {
  READ_RECEIPTS_PRIVACY,
}

enum permissionSettingsID {
  ADD_TO_GROUP_PRIVACY,
  ADD_TO_CHANNEL_PRIVACY,
}

enum privacyStates {
  EVERYONE = "everyone",
  CONTACTS = "contacts",
  NOBODY = "nobody",
}

enum activeStates {
  ENABLED = "enabled",
  DISABLED = "disabled",
}

enum permissionStates {
  EVERYONE = "everyone",
  ADMINS = "admins",
}

enum StatusType {
  PRIVACY = "privacy",
  ACTIVITY = "activity",
  PERMISSION = "permission",
}

type privacyStatesStrings = keyof typeof privacyStates;
type activeStatesStrings = keyof typeof activeStates;
type permissionStatesStrings = keyof typeof permissionStates;

export {
  sideBarPages,
  privacySettingsID,
  activeStates,
  privacyStates,
  activitySettingsID,
  StatusType,
  permissionSettingsID,
  permissionStates,
};

export type {
  pagesStrings,
  activeStatesStrings,
  privacyStatesStrings,
  permissionStatesStrings,
};
