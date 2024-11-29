import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/theme";
import sideBarReducer from "./side-bar/sideBar";
import userReducer from "./user/user";
import messagesReducer from "./messages/messages";
import searchReducer from "./messages/search";
import activeMessageReducer from "./messages/activeMessage";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    sideBarData: sideBarReducer,
    user: userReducer,
    messages: messagesReducer,
    search: searchReducer,
    activeMessage: activeMessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
