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
} from "../../data/sideBar";
import { pagesStrings } from "types/sideBar";

interface SideBarView {
  page: pagesStrings;
  title: string;
  backView?: sideBarPages;
  props?: object;
}

interface SideBarState {
  leftSideBar: SideBarView;
  rightSideBar: SideBarView;
}

const initialState: SideBarState = {
  leftSideBar: chats,
  rightSideBar: groupInfo,
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
    default:
      throw new Error("Unknown Type");
  }
}

interface actionType {
  redirect: sideBarPages;
  data: { type: "left" | "right"; [key: string]: string };
}

const sideBarSlice = createSlice({
  name: "sideBarData",
  initialState,
  reducers: {
    updateSideBarView: (state, action: PayloadAction<actionType>) => {
      const { redirect, data } = action.payload;

      const whichSide = data.type;
      const newData = getSideBarPage(redirect);

      const updatedSideBar = {
        page: newData.page,
        title: newData.title,
        backView: newData.backView,
        props: { ...newData.props, view: data.view },
      };

      if (whichSide === "left") {
        state.leftSideBar = updatedSideBar;
      } else {
        state.rightSideBar = updatedSideBar;
      }
    },
  },
});

export const { updateSideBarView } = sideBarSlice.actions;
export default sideBarSlice.reducer;
export type { SideBarView, actionType };
