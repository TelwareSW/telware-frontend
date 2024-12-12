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
} from "../../data/sideBar";
import { pagesStrings } from "types/sideBar";

interface SideBarView {
  page: pagesStrings;
  title: string;
  backView?: sideBarPages;
  props?: object;
}
const initialState: SideBarView = chats;

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
    default:
      throw new Error("Unknown Type");
  }
}

interface actionType {
  redirect: sideBarPages;
  data?: { [key: string]: string };
}

const sideBarSlice = createSlice({
  name: "sideBarData",
  initialState,
  reducers: {
    updateSideBarView: (state, action: PayloadAction<actionType>) => {
      const { redirect, data } = action.payload;

      // redirect can take value 0, so don't try "if(redirect)"
      if (redirect === undefined) return;

      // state assigned one by one to avoid state de-serialization
      const newData = getSideBarPage(redirect);
      state.backView = newData.backView;
      state.page = newData.page;

      if (redirect === sideBarPages.SETTINGS_UPDATE) {
        state.props = { data: data };
        state.title = data?.header || newData.title;
      } else if (
        redirect === sideBarPages.BLOCKED_USERS ||
        redirect === sideBarPages.ADD_MEMBERS ||
        redirect === sideBarPages.NEW_GROUP
      ) {
        state.props = { ...newData.props, data: data };
        state.title = newData.title;
      } else {
        state.title = newData.title;
        state.props = { ...newData.props };
      }
    },
  },
});

export const { updateSideBarView } = sideBarSlice.actions;
export default sideBarSlice.reducer;
export type { SideBarView, actionType };
