import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/theme";
import sideBarReducer from "./sideBar/sideBar";
import userReducer from "./user/user";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    sideBarData: sideBarReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
