import { SideBarRowProps } from "../components/SideBarRow";
import { SideBarView } from "../state/sideBar/sideBar";
import ChatsSideBar from "../components/ChatsSideBar";
import SettingsSideBar from "../components/SettingsSideBarBody";
import ContactsSideBar from "../components/ContactsSideBar";
import { userState } from "../state/user/user";
import ProfilePicture from "../components/ProfilePicture";

enum sideBarPages {
  CHATS,
  SETTINGS,
  CONTACTS,
  PRIVACY_SETTINGS,
  EDIT_PROFILE,
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

const settingsRows: SideBarRowProps[] = [
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

const privacySettingsRows: SideBarRowProps[] = [
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
] as SideBarRowProps[];

const chats: SideBarView = {
  title: "Chats",
  content: <ChatsSideBar />,
};
const contacts: SideBarView = {
  title: "Contacts",
  backView: sideBarPages.CHATS,
  content: <ContactsSideBar />,
};
const privacySettings: SideBarView = {
  title: "Privacy",
  backView: sideBarPages.SETTINGS,
  content: <SettingsSideBar rows={privacySettingsRows} />,
};
const settings: SideBarView = {
  title: "Settings",
  backView: sideBarPages.CHATS,
  content: (
    <SettingsSideBar rows={settingsRows}>
      <ProfilePicture />
    </SettingsSideBar>
  ),
};
const editProfile: SideBarView = {
  title: "Edit Profile",
  backView: sideBarPages.SETTINGS,
  content: <div> edit profile</div>,
};
export {
  chats,
  contacts,
  settings,
  editProfile,
  sideBarPages,
  activeStates,
  privacyStates,
  privacySettings,
  privacySettingsID,
  privacySettingsMap,
};
