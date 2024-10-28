import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
  DARK,
  LIGHT,
}

interface themeState {
  value: Theme;
}
const getSystemTheme = (): Theme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? Theme.DARK
    : Theme.LIGHT;
};

const initialState: themeState = {
  value:
    Number(localStorage.getItem("theme") as unknown as Theme) || Theme.LIGHT,
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
