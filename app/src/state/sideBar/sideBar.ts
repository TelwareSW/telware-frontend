import { createSlice } from "@reduxjs/toolkit";
import {
  chats,
  contacts,
  editProfile,
  privacySettings,
  settings,
} from "../../data/sideBar";
import { sideBarPages } from "../../data/sideBar";

interface SideBarView {
  title: string;
  content: React.ReactNode;
  backView?: number;
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
    case sideBarPages.EDIT_PROFILE:
      return editProfile;

    default:
      throw new Error("Unknown Type");
  }
}

const sideBarSlice = createSlice({
  name: "sideBarData",
  initialState,
  reducers: {
    updateSideBarView: (state, action) => {
      const newData = getSideBarPage(action.payload);
      state.title = newData.title;
      state.content = newData.content;
      state.backView = newData.backView;
    },
  },
});

export const { updateSideBarView } = sideBarSlice.actions;
export default sideBarSlice.reducer;
export type { SideBarView };
