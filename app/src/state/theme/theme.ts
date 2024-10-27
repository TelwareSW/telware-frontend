import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
  DARK,
  LIGHT,
}

interface themeState {
  value: Theme;
}

const initialState: themeState = {
  value: (localStorage.getItem("theme")
    ? Number(localStorage.getItem("theme"))
    : getSystemTheme()) as Theme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.value === Theme.DARK ? Theme.LIGHT : Theme.DARK;
      state.value = newTheme;
      localStorage.setItem("theme", newTheme.toString());
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
