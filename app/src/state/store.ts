import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/theme";
import SideBarReducer from "./sideBar/sideBar";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    sideBarData: SideBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
