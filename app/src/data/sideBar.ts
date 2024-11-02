import { SideBarRowProps } from "components/side-bar/settings/side-bar-row/SideBarRow";
import { SideBarView } from "state/side-bar/sideBar";
import {
  privacySettingsID,
  activitySettingsID,
  sideBarPages,
  pagesStrings,
} from "../types/sideBar";
import {
  activitySettingsInterface,
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
  [privacySettingsID.ADD_TO_GROUP_PRIVACY]: {
    id: "addToGroupPrivacy",
    subtitle: "Who can add me to group chats?",
    name: "Group Chats",
  },
  [privacySettingsID.ADD_TO_CHANNEL_PRIVACY]: {
    id: "addToChannelPrivacy",
    subtitle: "Who can add me to channels?",
    name: "Channels",
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

const statusMap = {
  privacy: privacySettingsMap,
  activity: activitySettingsMap,
};

const pagesMap: { [K in pagesStrings]: string } = {
  CHATS: "Chats",
  CONTACTS: "Contacts",
  SETTINGS: "Settings",
  PRIVACY_SETTINGS: "Privacy",
  SETTINGS_UPDATE: "SettingsUpdate",
  PROFILE_UPDATE: "ProfileUpdate",
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
    count: 2,
  },
  {
    title: "Who can see my stories?",
    privacyStatus: privacySettingsID.STORIES_SEEN_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
  },
  {
    title: "Who can see my last seen?",
    privacyStatus: privacySettingsID.LAST_SEEN_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
  },

  {
    title: "Who can see my profile photo?",
    privacyStatus: privacySettingsID.PROFILE_PHOTO_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
  },
  {
    title: "Who can add me to group chats?",
    privacyStatus: privacySettingsID.ADD_TO_GROUP_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
  },
  {
    title: "Who can add me to channels?",
    privacyStatus: privacySettingsID.ADD_TO_CHANNEL_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
  },
  {
    title: "Read receipts",
    activityStatus: activitySettingsID.READ_RECEIPTS_PRIVACY,
    redirect: sideBarPages.SETTINGS_UPDATE,
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
  title: "Edit Profile",
  backView: sideBarPages.SETTINGS,
  page: "PROFILE_UPDATE",
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
};
