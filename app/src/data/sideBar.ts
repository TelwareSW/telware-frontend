import { SideBarRowProps } from "components/side-bar/settings/side-bar-row/SideBarRow";
import { SideBarView } from "state/side-bar/sideBar";
import {
  privacySettingsID,
  activitySettingsID,
  sideBarPages,
  pagesStrings,
  permissionSettingsID,
  StatusType,
} from "../types/sideBar";
import {
  activitySettingsInterface,
  permissionsSettingsInterface,
  privacySettingsInterface,
} from "../types/user";

const privacySettingsMap: Record<
  privacySettingsID,
  { id: keyof privacySettingsInterface; name: string; subtitle: string }
> = {
  [privacySettingsID.STORIES_SEEN_PRIVACY]: {
    id: "storiesSeenPrivacy",
    subtitle: "Who can see my stories?",
    name: "Stories Seen",
  },
  [privacySettingsID.LAST_SEEN_PRIVACY]: {
    id: "lastSeenPrivacy",
    subtitle: "Who can see my last seen time?",
    name: "Last Seen & Online",
  },
  [privacySettingsID.PROFILE_PHOTO_PRIVACY]: {
    id: "profilePhotoPrivacy",
    subtitle: "Who can see my profile photo?",
    name: "Profile Photo",
  },
};

const activitySettingsMap: Record<
  activitySettingsID,
  { id: keyof activitySettingsInterface; name: string; subtitle: string }
> = {
  [activitySettingsID.READ_RECEIPTS_PRIVACY]: {
    id: "readReceiptsPrivacy",
    name: "Read Reciepts Privacy",
    subtitle: "Who can see read-reciepts on my messages?",
  },
};

const permissionSettingsMap: Record<
  permissionSettingsID,
  { id: keyof permissionsSettingsInterface; name: string; subtitle: string }
> = {
  [permissionSettingsID.ADD_TO_GROUP_PRIVACY]: {
    id: "addToGroupPrivacy",
    subtitle: "Who can add me to group chats?",
    name: "Group Chats",
  },
  [permissionSettingsID.ADD_TO_CHANNEL_PRIVACY]: {
    id: "addToChannelPrivacy",
    subtitle: "Who can add me to channels?",
    name: "Channels",
  },
};

const statusMap = {
  privacy: privacySettingsMap,
  activity: activitySettingsMap,
  permission: permissionSettingsMap,
};

const pagesMap: { [K in pagesStrings]: string } = {
  CHATS: "Chats",
  CONTACTS: "Contacts",
  SETTINGS: "Settings",
  PRIVACY_SETTINGS: "Privacy",
  SETTINGS_UPDATE: "SettingsUpdate",
  PROFILE_UPDATE: "ProfileUpdate",
  BLOCKED_USERS: "blockList",
};

const settingsRows = [
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
] as SideBarRowProps[];

const privacySettingsRows = [
  {
    icon: "BlockIcon",
    title: "Blocked Users",
    redirect: sideBarPages.BLOCKED_USERS,
  },
  {
    title: "Who can see my stories?",
    status: privacySettingsID.STORIES_SEEN_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
    type: StatusType.PRIVACY,
  },
  {
    title: "Who can see my last seen?",
    status: privacySettingsID.LAST_SEEN_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
    type: StatusType.PRIVACY,
  },

  {
    title: "Who can see my profile photo?",
    status: privacySettingsID.PROFILE_PHOTO_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
    type: StatusType.PRIVACY,
  },
  {
    title: "Who can add me to group chats?",
    status: permissionSettingsID.ADD_TO_GROUP_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
    type: StatusType.PERMISSION,
  },
  {
    title: "Who can add me to channels?",
    status: permissionSettingsID.ADD_TO_CHANNEL_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
    type: StatusType.PERMISSION,
  },
  {
    title: "Read receipts",
    status: activitySettingsID.READ_RECEIPTS_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
    type: StatusType.ACTIVITY,
  },
] as SideBarRowProps[];

const chats: SideBarView = {
  title: "Chats",
  page: "CHATS",
};
const contacts: SideBarView = {
  title: "Contacts",
  backView: sideBarPages.CHATS,
  page: "CONTACTS",
};
const privacySettings: SideBarView = {
  title: "Privacy Settings",
  backView: sideBarPages.SETTINGS,
  props: { rows: privacySettingsRows },
  page: "PRIVACY_SETTINGS",
};
const settings: SideBarView = {
  title: "Settings",
  backView: sideBarPages.CHATS,
  props: { rows: settingsRows },
  page: "SETTINGS",
};
const settingsUpdate: SideBarView = {
  title: "SettingsUpdate",
  backView: sideBarPages.PRIVACY_SETTINGS,
  page: "SETTINGS_UPDATE",
};
const profileUpdate: SideBarView = {
  title: "ProfileUpdate",
  backView: sideBarPages.SETTINGS,
  page: "PROFILE_UPDATE",
};

const blockList: SideBarView = {
  title: "Blocked Users",
  backView: sideBarPages.PRIVACY_SETTINGS,
  page: "BLOCKED_USERS",
  props: {
    subtitle:
      "Blocked users can't send you messages or add you to groups. They will not see your profile photos, stories, online and last seen status.",
  },
};

export {
  chats,
  contacts,
  settingsRows,
  privacySettingsID,
  activitySettingsID,
  privacySettingsMap,
  privacySettingsRows,
  settings,
  privacySettings,
  statusMap,
  sideBarPages,
  settingsUpdate,
  profileUpdate,
  pagesMap,
  blockList,
};
