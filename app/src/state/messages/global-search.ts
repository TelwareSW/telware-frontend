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
    clearSearch: (state) => {
      state.searchTerm = "";
      state.selectedTab = "Chats";
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedTab, clearSearch } =
  globalSearchSlice.actions;
export default globalSearchSlice.reducer;
