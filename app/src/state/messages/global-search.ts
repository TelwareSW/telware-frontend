import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
  selectedTab: string;
}

const initialState: SearchState = {
  searchTerm: "",
  selectedTab: "Chats",
};

const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedTab } = globalSearchSlice.actions;
export default globalSearchSlice.reducer;
