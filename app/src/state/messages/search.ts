import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
  searchResults: {
    messageId: string;
    highlightIndex: number;
  }[];
  currentResultIndex: number;
}

const initialState: SearchState = {
  searchTerm: "",
  searchResults: [],
  currentResultIndex: -1
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (
      state,
      action: PayloadAction<{ messageId: string; highlightIndex: number }[]>
    ) => {
      state.searchResults = action.payload;
      state.currentResultIndex = state.searchResults.length > 0 ? 0 : -1;
    },
    moveToNextResult: (state) => {
      if (state.searchResults.length > 0) {
        state.currentResultIndex =
          (state.currentResultIndex + 1) % state.searchResults.length;
      }
    },
    moveToPreviousResult: (state) => {
      if (state.searchResults.length > 0) {
        state.currentResultIndex =
          (state.currentResultIndex - 1 + state.searchResults.length) %
          state.searchResults.length;
      }
    },
    clearSearch: (state) => {
      state.searchTerm = "";
      state.searchResults = [];
      state.currentResultIndex = -1;
    }
  }
});

export const {
  setSearchTerm,
  setSearchResults,
  moveToNextResult,
  moveToPreviousResult,
  clearSearch
} = searchSlice.actions;
export default searchSlice.reducer;
