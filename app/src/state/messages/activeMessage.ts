import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActiveMessageState = {
  id: string | null;
  content: string | null;
  state: "edit" | "reply" | null;
};

const initialState: ActiveMessageState = {
  id: null,
  content: null,
  state: null,
};

const activeMessageSlice = createSlice({
  name: "editMessage",
  initialState,
  reducers: {
    setActiveMessage: (state, action: PayloadAction<ActiveMessageState>) => {
      state.id = action.payload.id;
      state.content = action.payload.content;
      state.state = action.payload.state;
    },

    clearActiveMessage: (state) => {
      state.id = null;
      state.content = null;
      state.state = null;
    },
  },
});

export const { setActiveMessage, clearActiveMessage } =
  activeMessageSlice.actions;

export default activeMessageSlice.reducer;
