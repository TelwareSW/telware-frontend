import { createSlice } from "@reduxjs/toolkit";
import { chats, settings, contacts, privacySettings } from "../../data/sideBar";
import { SideBarRowProps } from "../../components/sideBar/settings/sideBarRow";
import { sideBarPages } from "../../data/sideBar";

interface SideBarView {
  title: string;
  backView?: number;
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
      state.backView = newData.backView;
      state.props = newData.props;
    },
  },
});

export const { updateSideBarView } = sideBarSlice.actions;
export default sideBarSlice.reducer;
export type { SideBarView };
