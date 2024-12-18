import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum View {
  USERS,
  GROUPS,
}

interface adminViewState {
  value: View;
}

const initialState: adminViewState = { value: View.USERS };

const adminViewSlice = createSlice({
  name: "adminView",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<adminViewState>) => {
      state.value = action.payload.value;
    },
  },
});

export const { setView } = adminViewSlice.actions;
export default adminViewSlice.reducer;
