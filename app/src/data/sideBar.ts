import { SideBarRowProps } from "../components/sideBarRow";
import { SideBarState } from "../state/sideBar/sideBar";
import { userState } from "../state/user/user";

enum sideBarPages {
  SETTINGS,
  PRIVACY_SETTINGS,
}

enum privacySettingsID {
  STORIES_SEEN_PRIVACY,
  LAST_SEEN_PRIVACY,
  PROFILE_PHOTO_PRIVACY,
  ADD_TO_GROUP_PRIVACY,
  ADD_TO_CHANNEL_PRIVACY,
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

const privacySettingsMap: Record<privacySettingsID, keyof userState> = {
  [privacySettingsID.STORIES_SEEN_PRIVACY]: "storiesSeenPrivacy",
  [privacySettingsID.LAST_SEEN_PRIVACY]: "lastSeenPrivacy",
  [privacySettingsID.PROFILE_PHOTO_PRIVACY]: "profilePhotoPrivacy",
  [privacySettingsID.ADD_TO_GROUP_PRIVACY]: "addToGroupPrivacy",
  [privacySettingsID.ADD_TO_CHANNEL_PRIVACY]: "addToChannelPrivacy",
  [privacySettingsID.READ_RECEIPTS_PRIVACY]: "readReceiptsPrivacy",
};

const privacySettings: SideBarState = {
  header: "Privacy",
  backView: sideBarPages.SETTINGS,
  rows: [
    {
      icon: "BlockIcon",
      title: "Blocked Users",
      count: 2,
    },
    {
      title: "Who can see my stories?",
      status: privacySettingsID.STORIES_SEEN_PRIVACY,
    },
    {
      title: "Who can see my last seen?",
      status: privacySettingsID.LAST_SEEN_PRIVACY,
    },
    {
      title: "Who can see my profile photo?",
      status: privacySettingsID.PROFILE_PHOTO_PRIVACY,
    },
    {
      title: "Who can add me to group chats?",
      status: privacySettingsID.ADD_TO_GROUP_PRIVACY,
    },
    {
      title: "Who can add me to channels?",
      status: privacySettingsID.ADD_TO_CHANNEL_PRIVACY,
    },
    {
      title: "Read receipts",
      status: privacySettingsID.READ_RECEIPTS_PRIVACY,
    },
  ] as SideBarRowProps[],
};

const settings: SideBarState = {
  header: "Settings",
  rows: [
    {
      icon: "SettingsOutlinedIcon",
      title: "General Settings",
    },
    {
      icon: "NotificationsOutlinedIcon",
      title: "Notifications",
    },
    {
      icon: "HttpsOutlinedIcon",
      title: "Privacy and Security",
      redirect: sideBarPages.PRIVACY_SETTINGS,
    },
    {
      icon: "DevicesOutlinedIcon",
      title: "Devices",
    },
  ] as SideBarRowProps[],
};

export {
  settings,
  privacySettings,
  sideBarPages,
  privacySettingsID,
  activeStates,
  privacyStates,
  privacySettingsMap,
};
