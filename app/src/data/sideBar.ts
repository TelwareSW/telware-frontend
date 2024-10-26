import { SideBarRowProps } from "../components/sideBar/settings/SideBarRow";
import { SideBarView } from "../state/sideBar/sideBar";
import {
  privacySettingsID,
  activitySettingsID,
  sideBarPages,
} from "../types/sideBar";
import {
  activitySettingsInterface,
  privacySettingsInterface,
} from "../types/user";

const privacySettingsMap: Record<
  privacySettingsID,
  keyof privacySettingsInterface
> = {
  [privacySettingsID.STORIES_SEEN_PRIVACY]: "storiesSeenPrivacy",
  [privacySettingsID.LAST_SEEN_PRIVACY]: "lastSeenPrivacy",
  [privacySettingsID.PROFILE_PHOTO_PRIVACY]: "profilePhotoPrivacy",
  [privacySettingsID.ADD_TO_GROUP_PRIVACY]: "addToGroupPrivacy",
  [privacySettingsID.ADD_TO_CHANNEL_PRIVACY]: "addToChannelPrivacy",
};

const activitySettingsMap: Record<
  activitySettingsID,
  keyof activitySettingsInterface
> = {
  [activitySettingsID.READ_RECEIPTS_PRIVACY]: "readReceiptsPrivacy",
};

const statusMap = {
  privacy: privacySettingsMap,
  activity: activitySettingsMap,
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
  },
  {
    title: "Who can see my last seen?",
    privacyStatus: privacySettingsID.LAST_SEEN_PRIVACY,
  },
  {
    title: "Who can see my profile photo?",
    privacyStatus: privacySettingsID.PROFILE_PHOTO_PRIVACY,
  },
  {
    title: "Who can add me to group chats?",
    privacyStatus: privacySettingsID.ADD_TO_GROUP_PRIVACY,
  },
  {
    title: "Who can add me to channels?",
    privacyStatus: privacySettingsID.ADD_TO_CHANNEL_PRIVACY,
  },
  {
    title: "Read receipts",
    activityStatus: activitySettingsID.READ_RECEIPTS_PRIVACY,
  },
] as SideBarRowProps[];

const chats: SideBarView = {
  title: "Chats",
};
const contacts: SideBarView = {
  title: "Contacts",
  backView: sideBarPages.CHATS,
};
const privacySettings: SideBarView = {
  title: "Privacy",
  backView: sideBarPages.SETTINGS,
  props: { rows: privacySettingsRows },
};

const settings: SideBarView = {
  title: "Settings",
  backView: sideBarPages.CHATS,
  props: { rows: settingsRows },
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
};
