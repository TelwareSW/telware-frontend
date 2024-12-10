import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: "",
};

const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = globalSearchSlice.actions;
export default globalSearchSlice.reducer;
