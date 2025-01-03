import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  chats,
  settings,
  contacts,
  devices,
  privacySettings,
  settingsUpdate,
  profileUpdate,
  sideBarPages,
  blockList,
  addMembers,
  newGroup,
  newChannel,
  groupInfo,
  editGroupInfo,
  groupType,
  addMoreMembers,
  admins,
  addAdmins,
  members,
  permissions,
  channelInfo,
  editChannelInfo
} from "../../data/sideBar";
import { pagesStrings } from "types/sideBar";

interface SideBarView {
  page: pagesStrings;
  title: string;
  backView?: sideBarPages;
  props?: { [key: string]: any };
}

interface SideBarState {
  leftSideBar: SideBarView;
  rightSideBar: SideBarView;
}

const initialState: SideBarState = {
  leftSideBar: chats,
  rightSideBar: groupInfo
};

function getSideBarPage(type: number): SideBarView {
  switch (type) {
    case sideBarPages.CHATS:
      return chats;
    case sideBarPages.CONTACTS:
      return contacts;
    case sideBarPages.SETTINGS:
      return settings;
    case sideBarPages.PRIVACY_SETTINGS:
      return privacySettings;
    case sideBarPages.SETTINGS_UPDATE:
      return settingsUpdate;
    case sideBarPages.PROFILE_UPDATE:
      return profileUpdate;
    case sideBarPages.BLOCKED_USERS:
      return blockList;
    case sideBarPages.DEVICES:
      return devices;
    case sideBarPages.ADD_MEMBERS:
      return addMembers;
    case sideBarPages.NEW_GROUP:
      return newGroup;
    case sideBarPages.NEW_CHANNEL:
      return newChannel;
    case sideBarPages.GROUP_INFO:
      return groupInfo;
    case sideBarPages.EDIT_GROUP_INFO:
      return editGroupInfo;
    case sideBarPages.GROUP_TYPE:
      return groupType;
    case sideBarPages.ADD_MORE_MEMBERS:
      return addMoreMembers;
    case sideBarPages.ADMINS:
      return admins;
    case sideBarPages.ADD_ADMINS:
      return addAdmins;
    case sideBarPages.MEMBERS:
      return members;
    case sideBarPages.PERMISSIONS:
      return permissions;
    case sideBarPages.CHANNEL_INFO:
      return channelInfo;
    case sideBarPages.EDIT_CHANNEL_INFO:
      return editChannelInfo;
    default:
      throw new Error("Unknown Type");
  }
}

interface actionType {
  redirect: sideBarPages;
  data: { type: "left" | "right"; [key: string]: any };
}

const sideBarSlice = createSlice({
  name: "sideBarData",
  initialState,
  reducers: {
    resetLeftSideBar: (state) => {
      state.leftSideBar = chats;
    },
    resetRightSideBar: (state) => {
      state.rightSideBar = groupInfo;
    },
    updateSideBarView: (state, action: PayloadAction<actionType>) => {
      const { redirect, data } = action.payload;

      const whichSide = data.type;
      const newData = getSideBarPage(redirect);

      const updatedSideBar = {
        page: newData.page,
        title: newData.title,
        backView: data?.backView ? data?.backView : newData?.backView,
        props: { ...newData.props }
      };

      if (redirect === sideBarPages.SETTINGS_UPDATE) {
        updatedSideBar.props = { data: data };
        updatedSideBar.title = data.header;
      }
      if (redirect === sideBarPages.ADD_ADMINS) {
        updatedSideBar.props = {
          ...updatedSideBar.props,
          prevBackView: data.prevBackView
        };
      } else if (redirect === sideBarPages.ADD_MEMBERS) {
        updatedSideBar.props = {
          ...updatedSideBar.props,
          view: data.view
        };
      } else if (redirect === sideBarPages.SETTINGS_UPDATE) {
        updatedSideBar.props = {
          ...updatedSideBar.props,
          props: data
        };
      }

      if (whichSide === "left") {
        state.leftSideBar = updatedSideBar;
      } else {
        state.rightSideBar = updatedSideBar;
      }
    }
  }
});

export const { updateSideBarView, resetRightSideBar, resetLeftSideBar } =
  sideBarSlice.actions;
export default sideBarSlice.reducer;
export type { SideBarView, actionType };
