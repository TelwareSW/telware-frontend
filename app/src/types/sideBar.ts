enum sideBarPages {
  SETTINGS,
  PRIVACY_SETTINGS,
  CHATS,
  CONTACTS,
  SETTINGS_UPDATE,
}

type pagesStrings = keyof typeof sideBarPages;

enum privacySettingsID {
  STORIES_SEEN_PRIVACY,
  LAST_SEEN_PRIVACY,
  PROFILE_PHOTO_PRIVACY,
  ADD_TO_GROUP_PRIVACY,
  ADD_TO_CHANNEL_PRIVACY,
}

enum activitySettingsID {
  READ_RECEIPTS_PRIVACY,
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

enum StatusType {
  PRIVACY = "privacy",
  ACTIVITY = "activity",
}

export {
  sideBarPages,
  privacySettingsID,
  activeStates,
  privacyStates,
  activitySettingsID,
  StatusType,
};

export type { pagesStrings };
