import { createSlice } from "@reduxjs/toolkit";
import { privacySettings, settings } from "../../data/sideBar";
import { SideBarRowProps } from "../../components/privacySettings/sideBarRow";
import { sideBarPages } from "../../data/sideBar";

interface SideBarState {
  header?: string;
  rows: SideBarRowProps[];
  backView?: number;
}

function getSideBarPage(type: number): SideBarState {
  switch (type) {
    case sideBarPages.SETTINGS:
      return settings;
    case sideBarPages.PRIVACY_SETTINGS:
      return privacySettings;

    default:
      throw new Error("Unknown Type");
  }
}

const initialState: SideBarState = { rows: [] };

const sideBarSlice = createSlice({
  name: "sideBarData",
  initialState,
  reducers: {
    updateSideBarView: (state, action) => {
      const newData = getSideBarPage(action.payload);
      state.rows = newData.rows;
      state.header = newData.header;
      state.backView = newData.backView;
    },
  },
});

export const { updateSideBarView } = sideBarSlice.actions;
export default sideBarSlice.reducer;
export type { SideBarState };
