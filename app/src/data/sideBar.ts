import { SideBarRowProps } from "../components/sideBarRow";
import { SideBarState } from "../state/sideBar/sideBar";
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

export { settings, privacySettings, statusMap, activitySettingsID, sideBarPages };
